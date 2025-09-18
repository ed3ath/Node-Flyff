import { GenderType } from "../../../common/genderType";

export class QuestItemProperties {
  /**
   * Gets or sets the quest item id.
   */
  public readonly id: string;

  /**
   * Gets or sets the quest item quantity.
   */
  public readonly quantity: number;

  /**
   * Gets or sets the quest item sex.
   */
  public readonly sex: GenderType;

  /**
   * Gets or sets the item refine.
   */
  public readonly refine: number;

  /**
   * Gets or sets the item element.
   */
  public readonly element: number;

  /**
   * Gets or sets the item element refine.
   */
  public readonly elementRefine: number;

  /**
   * Gets or sets a value that indicates if this item has to be removed from the inventory
   * once the quest is completed.
   */
  public readonly remove: boolean;

  constructor(props: {
    id: string;
    quantity: number;
    sex: GenderType;
    refine?: number;
    element?: number;
    elementRefine?: number;
    remove: boolean;
  }) {
    this.id = props.id;
    this.quantity = props.quantity;
    this.sex = props.sex;
    this.refine = props.refine ?? 0;
    this.element = props.element ?? 0;
    this.elementRefine = props.elementRefine ?? 0;
    this.remove = props.remove;
  }
}
