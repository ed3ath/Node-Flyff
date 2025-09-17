import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import InventoryEntity from "./inventory";
import ItemEntity from "./item";

@Entity("InventoryItem")
export default class InventoryItemEntity
  extends BaseEntity
{
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @ManyToOne(() => InventoryEntity, (inventory) => inventory.items)
  inventory: InventoryEntity;

  @Column({ default: 0 })
  slot: number;

  @OneToOne((type) => ItemEntity)
  @JoinColumn()
  item: ItemEntity;

  @Column({ default: 1 })
  quantity: number;
}
