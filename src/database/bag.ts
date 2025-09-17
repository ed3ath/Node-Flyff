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
import BagItemEntity from "./bagItem";

@Entity("Bag")
export default class BagEntity extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @OneToOne((type) => CharacterEntity)
  @JoinColumn()
  character: CharacterEntity;

  @Column({ default: false })
  extra1: boolean;

  @Column({ default: false })
  extra2: boolean;

  @OneToMany(() => BagItemEntity, (bagItem) => bagItem.bag)
  items: BagItemEntity[];
}
