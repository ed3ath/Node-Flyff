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
import BagItem from "./bagItem";

@Entity()
export default class Bag extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @OneToOne((type) => Character)
  @JoinColumn()
  character: Character;

  @Column({ default: false })
  extra1: boolean;

  @Column({ default: false })
  extra2: boolean;

  @OneToMany(() => BagItem, (bagItem) => bagItem.bag, {
    cascade: true,
  })
  items: BagItem[];
}
