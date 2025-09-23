import { FlyffPacket } from "../../libraries/flyffPacket";
import { ElementType } from "../../types/elementType";
import { ItemProperties } from "../properties/itemProperties";

export class Item {
  public static readonly WeaponArmonRefineMax = 10;
  public static readonly JewleryRefineMax = 20;
  public static readonly ElementRefineMax = 10;

  private _quantity: number;

  /// <summary>
  /// Gets or sets the item serial number.
  /// </summary>
  public SerialNumber: number;

  /// <summary>
  /// Gets the item id.
  /// </summary>
  public get Id(): number {
    return this.Properties.id;
  }

  /// <summary>
  /// Gets the item name.
  /// </summary>
  public get Name(): string {
    return this.Properties.identifierName;
  }

  /// <summary>
  /// Gets the item data.
  /// </summary>
  public Properties: ItemProperties;

  /// <summary>
  /// Gets the item creator id.
  /// </summary>
  public CreatorId?: number;

  /// <summary>
  /// Gets or sets the item quantity.
  /// </summary>
  public get Quantity(): number {
    return this._quantity;
  }

  public set Quantity(value: number) {
    this._quantity = Math.Clamp(value, 0, this.Properties.packMax);
  }

  /// <summary>
  /// Gets or sets the item refine.
  /// </summary>
  public Refine: number;

  /// <summary>
  /// Gets or sets the item element type.
  /// </summary>
  public Element: ElementType;

  /// <summary>
  /// Gets or sets the item element refine.
  /// </summary>
  public ElementRefine: number;

  /// <summary>
  /// Gets the item refines.
  /// </summary>
  public get Refines(): number {
    return this.Refine & this.Element & this.ElementRefine;
  }

  public constructor(itemProperties: ItemProperties) {
    if (!itemProperties) {
      throw new Error("Cannot create an item with no properties.");
    }
    this.Properties = itemProperties;
    this.SerialNumber = 0;
    this.CreatorId = undefined;
    this._quantity = 1;
    this.Refine = 0;
    this.Element = ElementType.None;
    this.ElementRefine = 0;
  }

  /// <summary>
  /// Serialize the current item with a custom storage index.
  /// </summary>
  /// <param name="packet">Current packet stream.</param>
  public Serialize(packet: FlyffPacket): void {
    packet.writeInt32(this.Id);
    packet.writeInt32(this.SerialNumber);
    packet.writeString(this.Name.substring(0, 31)); // TakeCharacters(31) equivalent
    packet.writeInt16(this.Quantity);
    packet.writeByte(0); // Repair number
    packet.writeInt32(0); // Hp
    packet.writeInt32(0); // Repair
    packet.writeByte(0); // flag ?
    packet.writeInt32(this.Refine);
    packet.writeInt32(0); // guild id (cloaks?)
    packet.writeByte(this.Element);
    packet.writeInt32(this.ElementRefine);
    packet.writeInt32(0); // m_nResistSMItemId
    packet.writeInt32(0); // Piercing size
    packet.writeInt32(0); // Ultimate piercing size
    packet.writeInt32(0); // Pet vis
    packet.writeInt32(0); // charged
    packet.writeInt64(0); // m_iRandomOptItemId
    packet.writeInt32(0); // m_dwKeepTime
    packet.writeByte(0); // pet
    packet.writeInt32(0); // m_bTranformVisPet
  }

  public Clone(): Item {
    const cloned = new Item(this.Properties);
    cloned.Quantity = this.Quantity;
    cloned.Element = this.Element;
    cloned.ElementRefine = this.ElementRefine;
    cloned.Refine = this.Refine;
    cloned.SerialNumber = this.SerialNumber;
    cloned.CreatorId = this.CreatorId;
    return cloned;
  }

  public equals(other: Item): boolean {
    return this.Id === other.Id &&
      this.SerialNumber === other.SerialNumber &&
      this.Refine === other.Refine &&
      this.Element === other.Element &&
      this.ElementRefine === other.ElementRefine;
  }

  public getHashCode(): number {
    return HashCode.Combine(this.Id, this.SerialNumber, this.Refine, this.Element, this.ElementRefine);
  }

  public toString(): string {
    return `${this.Name} +${this.Refine} (${this.Element}+${this.ElementRefine}) x${this.Quantity}`;
  }
}

// Helper function for Math.Clamp
declare global {
  interface Math {
    Clamp(value: number, min: number, max: number): number;
  }
}

Math.Clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Helper for HashCode.Combine
class HashCode {
  public static Combine(...values: any[]): number {
    let hash = 17;
    for (const value of values) {
      hash = hash * 31 + (value ? value.toString().split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0) : 0);
    }
    return hash;
  }
}