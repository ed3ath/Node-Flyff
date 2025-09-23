import { ElementType } from '../../types/elementType';

export class ShopItemProperties {
  public id: number;
  public refine: number;
  public element: ElementType;
  public elementRefine: number;

  constructor(id: number, refine: number, element: ElementType, elementRefine: number) {
    this.id = id;
    this.refine = refine;
    this.element = element;
    this.elementRefine = elementRefine;
  }
}