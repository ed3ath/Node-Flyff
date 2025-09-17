import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import ItemEntity from "./item";
import CharacterEntity from "./character";

@Entity("equipment_item")
export default class EquipmentItemEntity
  extends BaseEntity
{
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @Column()
  characterId: number;

  @ManyToOne(() => CharacterEntity, (character) => character.equipments)
  character: CharacterEntity;

  @Column({ default: 0 })
  slot: number;

  @Column()
  itemSerialNumber: number;

  @OneToOne((type) => ItemEntity)
  @JoinColumn({ name: "itemSerialNumber", referencedColumnName: "serialNumber" })
  item: ItemEntity;

  @Column({ default: 1 })
  quantity: number;
}
