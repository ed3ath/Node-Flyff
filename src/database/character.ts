import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { GenderType } from "../common/genderType";
import EquipmentItemEntity from "./equipmentItem";
import AccountEntity from "./account";

@Entity("Character")
export default class CharacterEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountEntity, (account) => account.characters)
  account: AccountEntity;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  gender: GenderType;

  @Column({ nullable: false })
  level: number;

  @Column({ nullable: false })
  slot: number;

  @Column({ nullable: false, default: 0 })
  bankPin: number;

  @Column({ nullable: false })
  mapId: number;

  @Column({ nullable: false })
  positionX: number;

  @Column({ nullable: false })
  positionY: number;

  @Column({ nullable: false })
  positionZ: number;

  @Column({ nullable: false })
  skinSetId: number;

  @Column({ nullable: false })
  hairId: number;

  @Column({ nullable: false })
  hairColor: number;

  @Column({ nullable: false })
  faceId: number;

  @Column({ nullable: false })
  jobId: number;

  @Column({ nullable: false })
  strength: number;

  @Column({ nullable: false })
  stamina: number;

  @Column({ nullable: false })
  intelligence: number;

  @Column({ nullable: false })
  dexterity: number;

  @Column({ nullable: false, default: 0 })
  gold: number;

  @Column({ nullable: false, default: 0 })
  statPoints: number;

  @Column({ nullable: false, default: 0 })
  skillPoints: number;

  @Column({ nullable: false, default: 0 })
  experience: number;

  // @Column({ nullable: false, default: 0 })
  // jobLevel: number;

  // @Column({ nullable: false, default: 0 })
  // jobExperience: number;

  // @Column({ nullable: false, default: 100 })
  // hitPoints: number;

  // @Column({ nullable: false, default: 50 })
  // manaPoints: number;

  // @Column({ nullable: false, default: 100 })
  // fatiguePoints: number;

  @OneToMany(() => EquipmentItemEntity, (equipmentItem) => equipmentItem.character)
  equipments: EquipmentItemEntity[];

  @Column({ default: false })
  deleted: boolean;
}
