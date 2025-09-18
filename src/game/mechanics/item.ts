import { FlyffPacket } from "../../libraries/flyffPacket";
import { ElementType } from "../../types/elementType";
import { ItemProperties } from "../../interfaces/resource";

export class Item {
  public static readonly WeaponArmorRefineMax = 10;
  public static readonly JewelryRefineMax = 20;
  public static readonly ElementRefineMax = 10;

  public serialNumber?: number;
  public readonly id: number;
  public readonly name: string;
  public readonly creatorId?: number;
  public _quantity: number;
  public refine: number;
  public element: ElementType;
  public elementRefine: number;
  public properties: ItemProperties;

  constructor(
    id: number,
    name: string,
    quantity: number,
    refine: number,
    element: ElementType,
    elementRefine: number,
    creatorId?: number,
    serialNumber?: number
  ) {
    this.id = id;
    this.name = name;
    this._quantity = quantity;
    this.refine = refine;
    this.element = element;
    this.elementRefine = elementRefine;
    this.creatorId = creatorId;
    this.serialNumber = serialNumber;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = Math.max(0, Math.min(value, this.properties.dwPackMax));
  }

  public serialize(packet: FlyffPacket): void {
    packet.writeInt32(this.id);
    packet.writeInt32(this.serialNumber ?? 0);
    packet.writeString(this.name.substring(0, 31)); // TakeCharacters(31) equivalent
    packet.writeInt16(this.quantity);
    packet.writeByte(0); // Repair number
    packet.writeInt32(0); // Hp
    packet.writeInt32(0); // Repair
    packet.writeByte(0); // flag ?
    packet.writeInt32(this.refine);
    packet.writeInt32(0); // guild id (cloaks?)
    packet.writeByte(this.element);
    packet.writeInt32(this.elementRefine);
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

  public clone(): Item {
    return new Item(
      this.id,
      this.name,
      this.quantity,
      this.refine,
      this.element,
      this.elementRefine,
      this.creatorId,
      this.serialNumber
    );
  }

  public equals(other: Item): boolean {
    return (
      this.id === other.id &&
      this.serialNumber === other.serialNumber &&
      this.refine === other.refine &&
      this.element === other.element &&
      this.elementRefine === other.elementRefine
    );
  }
}
