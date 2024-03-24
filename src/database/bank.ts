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
import BankItem from "./bankItem";

@Entity()
export default class Bank extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @OneToOne((type) => Character)
  @JoinColumn()
  character: Character;

  @Column({ default: 0 })
  pin: number;

  @Column({ default: 0 })
  gold: number;

  @OneToMany(() => BankItem, (bankItem) => bankItem.bank)
  items: BankItem[];
}
