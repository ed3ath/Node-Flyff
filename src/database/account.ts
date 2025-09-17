import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";

import { AuthorityType } from "../common/authorityType";
import CharacterEntity from "./character";


@Entity("Account")
export default class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn() // Primary key with auto-increment
  id: number;

  @Column({ nullable: false, unique: true }) // Column definition with constraints
  username: string;

  @Column({ nullable: false }) // Optional column with default value
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: AuthorityType.Player })
  authority: AuthorityType;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: false })
  banned: boolean;

  @Column({ default: false })
  deleted: boolean;

  @Column({ nullable: true, default: 0 })
  lastActivity: number;

  @OneToMany(() => CharacterEntity, (character) => character.account)
  characters: CharacterEntity[];
}
