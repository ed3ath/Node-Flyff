// QuestItemProperties.ts

// You can define these enums similar to your C# enums
export enum GenderType {
  Male = "Male",
  Female = "Female",
  Both = "Both",
}

export enum ElementType {
  None = "None",
  Fire = "Fire",
  Water = "Water",
  Earth = "Earth",
  Wind = "Wind",
  Electric = "Electric",
}

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
  public readonly element: ElementType;

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
    refine: number;
    element: ElementType;
    elementRefine: number;
    remove: boolean;
  }) {
    this.id = props.id;
    this.quantity = props.quantity;
    this.sex = props.sex;
    this.refine = props.refine;
    this.element = props.element;
    this.elementRefine = props.elementRefine;
    this.remove = props.remove;
  }
}
