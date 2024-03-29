import {
  Entity,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import CharacterEntity from "./character";
import InventoryItemEntity from "./inventoryItem";

@Entity("Inventory")
export default class InventoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;

  @OneToOne((type) => CharacterEntity)
  @JoinColumn()
  character: CharacterEntity;

  @Column({ default: 0 })
  gold: number;

  @OneToMany(() => InventoryItemEntity, (inventoryItem) => inventoryItem.inventory)
  items: InventoryItemEntity[];
}
