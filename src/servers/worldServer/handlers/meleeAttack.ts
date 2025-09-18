import { FlyffPacket } from "../../../libraries/flyffPacket";
import { SetPacketType } from "../../../decorators/packetHandler";
import { WorldPacketHandler } from "../worldPacketHandler";
import { ObjectMessageType } from "../../../common/objectMessageType";
import { AttackType } from "../../../common/attackType";
import { ItemPartType } from "../../../common/itemPartyType";
import { Mover } from "../../../entities/mover";
import { PacketType } from "../../../common/packetType";

@SetPacketType(PacketType.MELEE_ATTACK)
export default class MeleeAttackHandler extends WorldPacketHandler {
  attackMessage: ObjectMessageType;
  objectId: number;
  unknownParameter: number;
  attackFlags: number;
  weaponAttackSpeed: number;

  constructor(packet: FlyffPacket) {
    super();
    this.attackMessage = packet.readInt32LE();
    this.objectId = packet.readInt32LE();
    this.unknownParameter = packet.readInt32LE();
    this.attackFlags = packet.readInt32LE() & 0xffff;
    this.weaponAttackSpeed = packet.readSingleLE();
  }

  async execute(): Promise<void> {
    if (!this.player) {
      this.logger.warn(
        "MELEE_ATTACK packet received but player is not available"
      );
      return;
    }

    try {
      const target = this.player.getVisibleObject<Mover>(this.objectId);
      if (!target) {
        throw new Error(
          `Cannot find target with id: '${this.objectId}'`
        );
      }

      const weapon = this.player.inventory.getEquippedItem(
        ItemPartType.RightWeapon
      );

      if (
        weapon &&
        weapon.properties.dwAttackSpeed !== this.weaponAttackSpeed
      ) {
        throw new Error(
          `Player '${this.player.name}' has a different weapon speed that the server.`
        );
      }

      let attackType: AttackType;
      switch (this.attackMessage) {
        case ObjectMessageType.OBJMSG_ATK1:
          attackType = AttackType.MeleeAttack1;
          break;
        case ObjectMessageType.OBJMSG_ATK2:
          attackType = AttackType.MeleeAttack2;
          break;
        case ObjectMessageType.OBJMSG_ATK3:
          attackType = AttackType.MeleeAttack3;
          break;
        case ObjectMessageType.OBJMSG_ATK4:
          attackType = AttackType.MeleeAttack4;
          break;
        default:
          throw new Error(
            `The object message type ${this.attackMessage} cannot be used during a melee attack packet`
          );
      }

      this.player.tryMeleeAttack(target, attackType);
    } catch (error) {
      this.logger.error(
        `Failed to process MELEE_ATTACK for player ${this.player.name}: ${error}`
      );
    }
  }
}
