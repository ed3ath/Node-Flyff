import { PacketType } from "../../../protocol/packetType";
import { ObjectState } from "../../../types/objectState";
import { StateFlags } from "../../../types/stateFlags";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { SetPacketType } from "../../../decorators/packetHandler";
import { Vector3 } from "../../../abstract/vector3";
import { WorldPacketHandler } from "../worldPacketHandler";

@SetPacketType(PacketType.PLAYERMOVED)
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

    // Read packet data matching C# MoverMovedPacket structure
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
    this.state = packet.readUInt32LE();
    this.stateFlag = packet.readInt32LE();
    this.motion = packet.readInt32LE();
    this.motionEx = packet.readInt32LE();
    this.loop = packet.readInt32LE();
    this.motionOption = packet.readInt32LE();
    this.tickCount = packet.readUInt64();
  }

  async execute(): Promise<void> {
    if (!this.player) {
      this.logger.warn(
        "PLAYERMOVED packet received but player is not available"
      );
      return;
    }

    // Check if player is dead (like C# implementation)
    if (this.player.isDead) {
      this.logger.error("Player is dead - cannot process PLAYERMOVED packet");
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

      // Create and send MoverMovedSnapshot to visible players
      // This would need to be implemented based on your snapshot system
      // For now, we'll log the movement

      this.logger.info(
        `Player ${this.player.name} moved: position (${newPosition.x}, ${newPosition.y}, ${newPosition.z}), angle ${this.angle}, state ${this.state}, flags ${this.stateFlag}`
      );

      // TODO: Implement MoverMovedSnapshot and Player.SendToVisible
      // using var snapshot = new MoverMovedSnapshot(Player,
      //     packet.BeginPosition, packet.DestinationPosition, Player.RotationAngle,
      //     (int)Player.ObjectState, (int)Player.ObjectStateFlags,
      //     (int)packet.Motion, packet.MotionEx, packet.Loop, (int)packet.MotionOption, packet.TickCount);
      // Player.SendToVisible(snapshot);

    } catch (error) {
      this.logger.error(
        `Failed to process PLAYERMOVED for player ${this.player?.name}: ${error}`
      );
    }
  }
}