import { createConnection, Socket } from 'net';
import { FlyffPacket } from './libraries/flyffPacket';
import { PacketType } from './common/packetType';
import { ErrorType } from './common/errorType';
import { encryptByteArray, buildEncryptionKeyFromString } from './libraries/crypto';

enum ClientState {
  LOGIN,
  CLUSTER,
  CLUSTER_PIN_VERIFY,
  WORLD
}

class TestClient {
  private socket: Socket | null = null;
  private sessionId: number = 0;
  private state: ClientState = ClientState.LOGIN;
  private authKey: number = 0;
  private characterId: number = 1; // assume character id 1
  private username: string = 'test';
  private password: string = 'test';
  private numpadId: number = 0;
  private bankPin: number = 1234; // Test bank PIN

  constructor() {
    this.startLogin();
  }

  private startLogin() {
    this.state = ClientState.LOGIN;
    this.connect('127.0.0.1', 23000); // login server
  }

  private startCluster() {
    this.state = ClientState.CLUSTER;
    this.disconnect();
    this.connect('127.0.0.1', 28000); // cluster server
  }

  private startWorld() {
    this.state = ClientState.WORLD;
    this.disconnect();
    this.connect('127.0.0.1', 5400); // world server
  }

  private connect(host: string, port: number) {
    this.socket = createConnection({ host, port }, () => {
      console.log(`Connected to ${host}:${port} (${ClientState[this.state]})`);
      if (this.state === ClientState.LOGIN) {
        this.sendCertify();
      } else if (this.state === ClientState.CLUSTER) {
        this.sendGetCharacterList();
      } else if (this.state === ClientState.WORLD) {
        this.sendJoinGame();
      }
    });

    this.socket.on('data', (data) => {
      this.handleData(data);
    });

    this.socket.on('close', () => {
      console.log('Connection closed');
    });

    this.socket.on('error', (err) => {
      console.error('Connection error:', err);
    });
  }

  private handleData(data: Buffer) {
    try {
      // Use different packet parsing based on server type
      const isLoginServer = this.state === ClientState.LOGIN;
      const packet = new FlyffPacket(data, isLoginServer);

      console.log(`Received packet: ${PacketType[packet.PacketType] || 'UNKNOWN'} (0x${packet.PacketType?.toString(16) || 'NaN'})`);

      if (packet.PacketType === PacketType.WELCOME) {
        this.sessionId = packet.readUInt32LE();
        console.log(`Session ID: ${this.sessionId}`);
      } else if (packet.PacketType === PacketType.SERVER_LIST && this.state === ClientState.LOGIN) {
        console.log('Received server list');
        // Parse server list, but for simplicity, proceed to cluster
        this.startCluster();
      } else if (packet.PacketType === PacketType.CHARACTER_LIST && this.state === ClientState.CLUSTER) {
        console.log('Received character list');
        // Send pre-join to trigger PIN verification
        this.sendPreJoin();
      } else if (packet.PacketType === PacketType.LOGIN_PROTECT_NUMPAD && this.state === ClientState.CLUSTER) {
        this.numpadId = packet.readUInt32LE();
        console.log(`Received numpad ID: ${this.numpadId}`);
        // For testing, we'll immediately send the PIN
        this.sendPreJoinWithPin();
      } else if (packet.PacketType === PacketType.LOGIN_PROTECT_CERT && this.state === ClientState.CLUSTER) {
        const success = packet.readInt32LE();
        console.log(`PIN verification result: ${success ? 'SUCCESS' : 'FAILED'}`);
        if (success) {
          console.log('PIN verification successful, selecting character');
          this.sendSelectCharacter();
        }
      } else if (packet.PacketType === PacketType.PRE_JOIN && this.state === ClientState.CLUSTER) {
        console.log('Received PRE_JOIN - ready to transition to world server');
        this.state = ClientState.CLUSTER_PIN_VERIFY;
      } else if (packet.PacketType === PacketType.PLAYER_ID && (this.state === ClientState.CLUSTER || this.state === ClientState.CLUSTER_PIN_VERIFY)) {
        this.authKey = packet.readInt32LE();
        console.log(`Received auth key: ${this.authKey}`);
        this.startWorld();
      } else if (packet.PacketType === PacketType.SNAPSHOT && this.state === ClientState.WORLD) {
        console.log('Received SNAPSHOT packet - join successful!');
        console.log(`Successfully joined world server with character ID ${this.characterId}`);
      } else if (packet.PacketType === PacketType.ERROR) {
        const errorCode = packet.readInt32LE();
        const errorName = Object.keys(ErrorType).find(key => ErrorType[key as keyof typeof ErrorType] === errorCode) || 'UNKNOWN';
        console.error(`Received ERROR packet from server - Error Code: ${errorCode} (${errorName})`);
      } else {
        console.log(`Unhandled packet type: ${PacketType[packet.PacketType] || 'UNKNOWN'} in state ${ClientState[this.state]}`);
      }
    } catch (error) {
      console.error('Error handling packet data:', error);
    }
  }

  private sendCertify() {
    const packet = new FlyffPacket(PacketType.CERTIFY);
    packet.writeStringLE('20100412'); // version
    packet.writeStringLE(this.username);
    // Encrypt password
    const key = buildEncryptionKeyFromString('dldhsvmflvm', 16);
    const encrypted = encryptByteArray(Buffer.from(this.password), key);
    const encryptedBuffer = Buffer.from(encrypted, 'hex');
    // Pad to 16*42 = 672 bytes
    const padded = Buffer.alloc(672);
    padded.set(encryptedBuffer);
    packet.writeBytes(padded);
    this.send(packet);
    console.log('Sent CERTIFY packet');
  }

  private sendGetCharacterList() {
    const packet = new FlyffPacket(PacketType.GET_CHARACTER_LIST);
    packet.writeInt32LE(0); // auth key from server list?
    this.send(packet);
    console.log('Sent GET_CHARACTER_LIST packet');
  }

  private sendPreJoin() {
    const packet = new FlyffPacket(PacketType.PRE_JOIN);
    packet.writeStringLE(this.username);
    packet.writeInt32LE(this.characterId);
    packet.writeStringLE('testchar'); // character name
    packet.writeInt32LE(0); // placeholder for secret number (will be set in sendPreJoinWithPin)
    this.send(packet);
    console.log('Sent PRE_JOIN packet');
  }

  private sendPreJoinWithPin() {
    // Simulate numpad PIN entry using the received numpadId
    // In a real client, this would be user input converted through the numpad
    const secretNum = this.bankPin; // For testing, use direct PIN

    const packet = new FlyffPacket(PacketType.PRE_JOIN);
    packet.writeStringLE(this.username);
    packet.writeInt32LE(this.characterId);
    packet.writeStringLE('testchar'); // character name
    packet.writeInt32LE(secretNum);
    this.send(packet);
    console.log(`Sent PRE_JOIN packet with PIN: ${secretNum}`);
  }

  private sendSelectCharacter() {
    const packet = new FlyffPacket(PacketType.SEL_PLAYER);
    packet.writeInt32LE(this.characterId);
    this.send(packet);
    console.log('Sent SEL_PLAYER packet');
  }

  private sendJoinGame() {
    // Send PACKETTYPE_JOIN first (like C++ client)
    const packet = new FlyffPacket(PacketType.JOIN);
    packet.writeInt32LE(1); // worldId
    // Based on C++ SendJoin, additional character data would be serialized here
    // For testing, we'll send minimal data and let the server use stored session info
    this.send(packet);
    console.log('Sent PACKETTYPE_JOIN packet to world server');
  }

  private send(packet: FlyffPacket) {
    if (this.socket) {
      this.socket.write(FlyffPacket.appendHeader(packet.buffer) as any);
    }
  }

  private disconnect() {
    if (this.socket) {
      this.socket.end();
      this.socket = null;
    }
  }

  public close() {
    this.disconnect();
  }
}

// Usage
const client = new TestClient();

// Keep running for a bit
setTimeout(() => {
  client.close();
}, 20000);