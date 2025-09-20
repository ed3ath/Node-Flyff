import { PacketType } from "../../../protocol/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";

@SetPacketType(PacketType.JOIN)
export default class Handler extends PacketHandler {
  worldId: number;
  playerId: number;
  authKey: number;
  partyId: number;
  guildId: number;
  warId: number;
  multiId: number;
  slot: number;
  playerName: string;

  constructor(packet: FlyffPacket) {
    super();
    this.worldId = packet.readInt32LE();
    this.playerId = packet.readInt32LE();
    this.authKey = packet.readInt32LE();
    this.partyId = packet.readInt32LE();
    this.guildId = packet.readInt32LE();
    this.warId = packet.readInt32LE();
    this.multiId = packet.readInt32LE();
    this.slot = packet.readInt32LE();
    this.playerName = packet.readStringLE();
  }

  async execute(): Promise<void> {
    this.logger.info(`JOIN request from player ${this.playerName} (ID: ${this.playerId}) for world ${this.worldId}, slot ${this.slot}`);

    // Set user connection details
    this.userConnection.selectedCharacterId = this.playerId;
    this.userConnection.selectedCharacterName = this.playerName;
    this.userConnection.authKey = this.authKey;

    // For now, just log the JOIN and acknowledge it
    // In a complete implementation, this would:
    // 1. Validate the authKey
    // 2. Load character data
    // 3. Transfer client to world server
    // 4. Send appropriate response packets

    this.logger.success(`Client ${this.playerName} successfully joined cluster server. Auth key: ${this.authKey}`);

    // Send PRE_JOIN acknowledgment (this would typically come from login server after cluster join)
    const preJoinPacket = new FlyffPacket(PacketType.PRE_JOIN);
    this.send(preJoinPacket);

    this.logger.info(`Sent PRE_JOIN acknowledgment to ${this.playerName}`);
  }
}