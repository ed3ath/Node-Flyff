import { ItemResources } from "../servers/worldServer/resources/itemResource";

export interface ResourcePaths {
  itemsProp: string;
  itemsText: string;
  defineItem: string;
  defineItemKind: string;
  defineJob: string;  
}

export interface GameResources {
  itemResources: ItemResources
}