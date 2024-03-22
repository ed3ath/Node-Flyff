import fs from "fs-extra";
import path from "path";
import _ from "lodash";

import { Logger } from "../helpers/logger";
import { BuilderType } from "../common/builderType";
import { ItemResources } from "../servers/worldServer/resources/itemResource";
import { GameResources, ResourcePaths } from "../interfaces/resource";

export class ResourceBuilder {
  private logger: Logger;
  resourcePaths: ResourcePaths;
  items: ItemResources;

  constructor() {
    this.logger = new Logger(BuilderType.REDIS_BUILDER);
  }

  setResourcePath(resourcePaths: ResourcePaths): void {
    this.resourcePaths = resourcePaths;
  }

  build(): GameResources {
    if (this.resourcePaths.item) {
      this.items = new ItemResources(this.resourcePaths.defineItem, this.resourcePaths.item);
      this.items.loadDefines();
      this.items.loadItems();

      console.log(this.items.itemsByName.get("IDS_PROPITEM_TXT_003420"))
    }

    return {
      items: this.items,
    };
  }
}
