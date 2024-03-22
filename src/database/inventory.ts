import {
  Entity,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Character from "./character";
import InventoryItem from "./inventoryItem";

@Entity()
export default class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;

  @OneToOne((type) => Character)
  @JoinColumn()
  character: Character;

  @Column({ default: 0 })
  gold: number;

  @OneToMany(() => InventoryItem, (inventoryItem) => inventoryItem.inventory, {
    cascade: true,
  })
  items: InventoryItem[];
}
