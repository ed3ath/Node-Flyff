import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import Account from "../account/accounts";

export interface ICharacter extends Character {
  id: number;
  account: string;
  name: string;
}
@Entity()
export default class Character extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  account: string;

  @Column({ nullable: false })
  name: string;
}
