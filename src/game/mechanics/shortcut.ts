import { FlyffPacket } from "../../libraries/flyffPacket";
import { ShortcutType } from "../../types/shortcutType";
import { ShortcutObjectType } from "../../types/shortcutObjectType";
import { IPacketSerializer } from "./taskbar";

/// <summary>
/// Represents a shortcut in the taskbar system.
/// </summary>
export class Shortcut implements IPacketSerializer {
  /// <summary>
  /// Gets the shortcut slot in its taskbar container.
  /// </summary>
  public readonly Slot: number;

  /// <summary>
  /// Gets the shortcut type.
  /// </summary>
  public readonly Type: ShortcutType;

  /// <summary>
  /// Gets the shortcut item index in the inventory.
  /// </summary>
  /// <remarks>
  /// Only available when <see cref="Type"/> is a <see cref="ShortcutType.Item"/>.
  /// </remarks>
  public readonly ItemIndex?: number;

  /// <summary>
  /// Gets the shortcut object type.
  /// </summary>
  public readonly ObjectType: ShortcutObjectType;

  /// <summary>
  /// Gets the shortcut object index in the taskbar container.
  /// </summary>
  public readonly ObjectIndex: number;

  /// <summary>
  /// Gets the shortcut user id.
  /// </summary>
  /// <remarks>
  /// This doesn't seem to be used.
  /// </remarks>
  public readonly UserId: number;

  /// <summary>
  /// Gets the shortcut additionnal data.
  /// </summary>
  /// <remarks>
  /// This seems to be used in official files to store additionnal data.
  /// Not used for now.
  /// </remarks>
  public readonly ObjectData: number;

  /// <summary>
  /// Gets the shortcut text.
  /// </summary>
  /// <remarks>
  /// Only available when <see cref="Type"/> is a <see cref="ShortcutType.Chat"/>.
  /// </remarks>
  public readonly Text: string;

  /// <summary>
  /// Creates a new <see cref="Shortcut"/> instance.
  /// </summary>
  /// <param name="slot">Shortcut slot in its taskbar container.</param>
  /// <param name="type">Shortcut type.</param>
  /// <param name="itemIndex">Shortcut target item index in inventory.</param>
  /// <param name="shortcutObjectType">Shortcut object type.</param>
  /// <param name="objIndex">Shortcut index in its taskbar container.</param>
  /// <param name="userId">Shortcut user id. Not used.</param>
  /// <param name="objData">Shortcut additionnal data.</param>
  /// <param name="text">Shortcut text.</param>
  public constructor(
    slot: number,
    type: ShortcutType,
    itemIndex: number | undefined,
    shortcutObjectType: ShortcutObjectType,
    objIndex: number,
    userId: number,
    objData: number,
    text: string
  ) {
    this.Slot = slot;
    this.Type = type;
    this.ItemIndex = itemIndex;
    this.ObjectType = shortcutObjectType;
    this.ObjectIndex = objIndex;
    this.UserId = userId;
    this.ObjectData = objData;
    this.Text = text;
  }

  /// <summary>
  /// Serializes this shortcut into the give packet stream.
  /// </summary>
  /// <param name="packet">Packet stream.</param>
  public serialize(packet: FlyffPacket): void {
    packet.writeInt32(this.Slot);
    packet.writeUInt32(this.Type);
    packet.writeUInt32(this.ItemIndex ?? 0);
    packet.writeUInt32(this.ObjectType);
    packet.writeUInt32(this.ObjectIndex);
    packet.writeUInt32(this.UserId);
    packet.writeUInt32(this.ObjectData);

    if (this.Type === ShortcutType.Chat) {
      packet.writeString(this.Text);
    }
  }
}