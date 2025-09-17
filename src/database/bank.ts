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
import BankItemEntity from "./bankItem";

@Entity("Bank")
export default class BankEntity extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @OneToOne((type) => CharacterEntity)
  @JoinColumn()
  character: CharacterEntity;

  @Column({ default: 0 })
  pin: number;

  @Column({ default: 0 })
  gold: number;

  @OneToMany(() => BankItemEntity, (bankItem) => bankItem.bank)
  items: BankItemEntity[];
}
