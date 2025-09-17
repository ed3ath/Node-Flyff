import _ from "lodash";

import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import Account from "../../../database/account";
import Character from "../../../database/character";

@SetPacketType(PacketType.SEL_PLAYER)
export default class Handler extends PacketHandler {
  characterId: number;

  constructor(packet: FlyffPacket) {
    super();
    this.characterId = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    this.logger.info(`SEL_PLAYER received for characterId: ${this.characterId}`);

    // For now, we'll generate a simple authKey
    // In a real implementation, this should be cryptographically secure and stored
    const authKey = Math.floor(Math.random() * 0x7FFFFFFF) + 1; // Ensure non-zero

    this.logger.info(`Generated authKey: ${authKey} for character: ${this.characterId}`);

    // Send PLAYER_ID packet with the authKey
    const packet = new FlyffPacket(PacketType.PLAYER_ID);
    packet.writeInt32LE(authKey);
    this.send(packet);

    this.logger.success(`Sent PLAYER_ID with authKey: ${authKey}`);
  }
}