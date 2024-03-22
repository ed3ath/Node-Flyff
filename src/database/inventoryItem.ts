import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Inventory from "./inventory";
import Item from "./item";

@Entity()
export default class InventoryItem
  extends BaseEntity
{
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @ManyToOne(() => Inventory, (inventory) => inventory.items)
  inventory: Inventory;

  @Column({ default: 0 })
  slot: number;

  @OneToOne((type) => Item)
  @JoinColumn()
  item: Item;

  @Column({ default: 1 })
  quantity: number;
}
