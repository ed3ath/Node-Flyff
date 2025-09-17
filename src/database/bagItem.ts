import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import BagEntity from "./inventory";
import ItemEntity from "./item";

@Entity("Bag")
export default class BagItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @ManyToOne(() => BagEntity, (bag) => bag.items)
  bag: BagEntity;

  @Column({ default: 0 })
  slot: number;

  @OneToOne((type) => ItemEntity)
  @JoinColumn()
  item: ItemEntity;

  @Column({ default: 1 })
  quantity: number;
}
