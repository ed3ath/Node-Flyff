import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export default class Accounts extends BaseEntity {
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
}