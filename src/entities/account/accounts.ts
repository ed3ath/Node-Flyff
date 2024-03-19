import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export interface IAccount extends Account {
  id: number;
  username: string;
  email: string;
  password: string;
  authority: string;
  verified: boolean;
  banned: boolean;
  deleted: boolean;
  lastActivity: number;
}
@Entity("Account")
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;

  @Column({ nullable: false, unique: true }) // Column definition with constraints
  username: string;

  @Column({ nullable: false }) // Optional column with default value
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: "F" })
  authority: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  banned: boolean;

  @Column({ default: false })
  deleted: boolean;

  @Column({ nullable: true, default: new Date().getTime() })
  lastActivity: number;
}
