import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import BankEntity from "./inventory";
import ItemEntity from "./item";

@Entity("BankItem")
export default class BankItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;
  
  @ManyToOne(() => BankEntity, (bank) => bank.items)
  bank: BankEntity;

  @Column({ default: 0 })
  slot: number;

  @OneToOne((type) => ItemEntity)
  @JoinColumn()
  item: ItemEntity;

  @Column({ default: 1 })
  quantity: number;
}
