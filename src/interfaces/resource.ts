import { ItemResources } from "../servers/worldServer/resources/itemResource";

export interface ResourcePaths {
  itemsProp: string;
  itemsText: string;
  defineItem: string;
  defineItemKind: string;
  defineJob: string;
  moversProp: string;
  moversText: string;
  moversEx: string;
}

export interface GameResources {
  itemResources: ItemResources;
}
