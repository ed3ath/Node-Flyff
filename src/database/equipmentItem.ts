import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Item from "./item";
import Character from "./character";

@Entity()
export default class EquipmentItem
  extends BaseEntity
{
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @ManyToOne(() => Character, (character) => character.equipments)
  character: Character;

  @Column({ default: 0 })
  slot: number;

  @OneToOne((type) => Item)
  @JoinColumn()
  item: Item;

  @Column({ default: 1 })
  quantity: number;
}
