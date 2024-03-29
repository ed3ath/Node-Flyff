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

@Entity("EquipmentItem")
export default class EquipmentItemEntity
  extends BaseEntity
{
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @ManyToOne(() => CharacterEntity, (character) => character.equipments)
  character: CharacterEntity;

  @Column({ default: 0 })
  slot: number;

  @OneToOne((type) => ItemEntity)
  @JoinColumn()
  item: ItemEntity;

  @Column({ default: 1 })
  quantity: number;
}
