import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import Bag from "./inventory";
import Item from "./item";

@Entity()
export default class BagItem extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @ManyToOne(() => Bag, (bag) => bag.items)
  bag: Bag;

  @Column({ default: 0 })
  slot: number;

  @OneToOne((type) => Item)
  @JoinColumn()
  item: Item;

  @Column({ default: 1 })
  quantity: number;
}
