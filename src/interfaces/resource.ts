import { ItemResources } from "../servers/worldServer/resources/itemResource";

export interface ResourcePaths {
  item: string;
  defineItem: string;
  defineItemKind: string;
  defineJob: string;  
}

export interface GameResources {
  items: ItemResources
}