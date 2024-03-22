import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ElementType } from "../common/elementType";

@Entity()
export default class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  serialNumber: number;

  @Column({ nullable: false })
  itemId: number;

  @Column({ default: 0 })
  refinement: number;

  @Column({ default: ElementType.None })
  element: ElementType;

  @Column({ default: 0 })
  elementRefinement: number;

  @Column({ default: false })
  deleted: boolean;
}
