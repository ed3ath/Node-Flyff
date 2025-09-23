import { PacketType } from "../../../protocol/packetType";
import { ObjectState } from "../../../types/objectState";
import { StateFlags } from "../../../types/stateFlags";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { SetPacketType } from "../../../decorators/packetHandler";
import { Vector3 } from "../../../abstract/vector3";
import { WorldPacketHandler } from "../worldPacketHandler";

@SetPacketType(PacketType.PLAYERBEHAVIOR)
export default class Handler extends WorldPacketHandler {
  beginPosition: Vector3;
  destinationPosition: Vector3;
  angle: number;
  state: number;
  stateFlag: number;
  motion: number;
  motionEx: number;
  loop: number;
  motionOption: number;
  tickCount: number;

  constructor(packet: FlyffPacket) {
    super();

    // Read packet data matching C# PlayerMovedPacket structure
    this.beginPosition = new Vector3(
      packet.readSingle(),
      packet.readSingle(),
      packet.readSingle()
    );
    this.destinationPosition = new Vector3(
      packet.readSingle(),
      packet.readSingle(),
      packet.readSingle()
    );
    this.angle = packet.readSingle();
    this.state = packet.readUInt32();
    this.stateFlag = packet.readInt32();
    this.motion = packet.readInt32();
    this.motionEx = packet.readInt32();
    this.loop = packet.readInt32();
    this.motionOption = packet.readInt32();
    this.tickCount = packet.readUInt64();
  }

  async execute(): Promise<void> {
    if (!this.player) {
      this.logger.warn(
        "PLAYERBEHAVIOR packet received but player is not available"
      );
      return;
    }

    // Check if player is dead (like C# implementation)
    if (this.player.isDead) {
      this.logger.error("Player is dead - cannot process PLAYERBEHAVIOR packet");
      return;
    }

    try {
      // TODO: this handler isn't really correct.
      // We need to review this in order to correct movements.

      // Unfollow and clear target (like C# implementation)
      if (this.player.unfollow) {
        this.player.unfollow();
      }

      // Clear destination position (like C# implementation)
      if (this.player.destinationPosition && this.player.destinationPosition.reset) {
        this.player.destinationPosition.reset();
      }

      // Update player position (like C# implementation)
      // Player.Position.Copy(packet.BeginPosition + packet.DestinationPosition)
      const newPosition = this.beginPosition.clone();
      newPosition.add(this.destinationPosition);
      this.player.position.copy(newPosition);

      // Update rotation angle
      this.player.rotationAngle = this.angle;

      // Update object state and flags
      this.player.objectState = this.state as ObjectState;
      this.player.objectStateFlags = this.stateFlag as StateFlags;

      // Create and send MoverBehaviorSnapshot to visible players
      // This would need to be implemented based on your snapshot system
      // For now, we'll log the behavior change

      this.logger.info(
        `Player ${this.player.name} behavior update: position (${newPosition.x}, ${newPosition.y}, ${newPosition.z}), angle ${this.angle}, state ${this.state}, flags ${this.stateFlag}`
      );

      // TODO: Implement MoverBehaviorSnapshot and Player.SendToVisible
      // using var snapshot = new MoverBehaviorSnapshot(Player,
      //     packet.BeginPosition, packet.DestinationPosition, Player.RotationAngle,
      //     (int)Player.ObjectState, (int)Player.ObjectStateFlags,
      //     packet.Motion, packet.MotionEx, packet.Loop, packet.MotionOption, packet.TickCount);
      // Player.SendToVisible(snapshot);

    } catch (error) {
      this.logger.error(
        `Failed to process PLAYERBEHAVIOR for player ${this.player?.name}: ${error}`
      );
    }
  }
}