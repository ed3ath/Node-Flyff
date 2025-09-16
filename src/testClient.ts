import { createConnection, Socket } from 'net';
import { FlyffPacket } from './libraries/flyffPacket';
import { PacketType } from './common/packetType';
import { encryptByteArray, buildEncryptionKeyFromString } from './libraries/crypto';

enum ClientState {
  LOGIN,
  CLUSTER,
  WORLD
}

class TestClient {
  private socket: Socket | null = null;
  private sessionId: number = 0;
  private state: ClientState = ClientState.LOGIN;
  private authKey: number = 0;
  private characterId: number = 1; // assume character id 1
  private username: string = 'testuser';
  private password: string = 'testpass';

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
    const packet = new FlyffPacket(data);
    console.log(packet)

    console.log(`Received packet: ${PacketType[packet.PacketType]} (${packet.PacketType.toString(16)})`);

    if (packet.PacketType === PacketType.WELCOME) {
      this.sessionId = packet.readUInt32LE();
      console.log(`Session ID: ${this.sessionId}`);
    } else if (packet.PacketType === PacketType.SERVER_LIST && this.state === ClientState.LOGIN) {
      console.log('Received server list');
      // Parse server list, but for simplicity, proceed to cluster
      this.startCluster();
    } else if (packet.PacketType === PacketType.CHARACTER_LIST && this.state === ClientState.CLUSTER) {
      console.log('Received character list');
      // Assume character exists, send select
      this.sendSelectCharacter();
    } else if (packet.PacketType === PacketType.PLAYER_ID && this.state === ClientState.CLUSTER) {
      this.authKey = packet.readInt32LE();
      console.log(`Received auth key: ${this.authKey}`);
      this.startWorld();
    }
  }

  private sendCertify() {
    const packet = new FlyffPacket(PacketType.CERTIFY);
    packet.writeString('20100412'); // version
    packet.writeString(this.username);
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

  private sendSelectCharacter() {
    const packet = new FlyffPacket(PacketType.SEL_PLAYER);
    packet.writeInt32LE(this.characterId);
    this.send(packet);
    console.log('Sent SEL_PLAYER packet');
  }

  private sendJoinGame() {
    const packet = new FlyffPacket(PacketType.JOIN_GAME);
    packet.writeInt32LE(1); // channelId
    packet.writeInt32LE(this.characterId);
    packet.writeInt32LE(this.authKey);
    packet.writeInt32LE(0); // partyId
    packet.writeInt32LE(0); // guildId
    packet.writeInt32LE(0); // guildWarId
    packet.writeInt32LE(0); // idOfMulti
    packet.writeByte(0); // slot
    packet.writeString('TestChar'); // characterName
    packet.writeString(this.username);
    packet.writeString(this.password);
    packet.writeInt32LE(0); // messengerState
    packet.writeInt32LE(0); // messengerCount
    this.send(packet);
    console.log('Sent JOIN_GAME packet');
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