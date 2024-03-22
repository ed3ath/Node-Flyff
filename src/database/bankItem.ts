import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Bank from "./inventory";
import Item from "./item";

@Entity()
export default class BankItem extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @ManyToOne(() => Bank, (bank) => bank.items)
  bank: Bank;

  @Column({ default: 0 })
  slot: number;

  @OneToOne((type) => Item)
  @JoinColumn()
  item: Item;

  @Column({ default: 1 })
  quantity: number;
}
