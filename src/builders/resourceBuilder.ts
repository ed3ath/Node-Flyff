import { RedisOptions } from "ioredis";
import _ from "lodash";

import { Logger } from "../helpers/logger";
import { BuilderType } from "../common/builderType";
import { ItemResources } from "../servers/worldServer/resources/itemResource";
import { GameResources, ResourcePaths } from "../interfaces/resource";

export class ResourceBuilder {
  private logger: Logger;
  resourcePaths: ResourcePaths;
  itemResources: ItemResources;
  options: RedisOptions;

  constructor() {
    this.logger = new Logger(BuilderType.REDIS_BUILDER);
  }

  setRedisOptions(options: RedisOptions) {
    this.options = options;
  }

  setResourcePath(resourcePaths: ResourcePaths): void {
    this.resourcePaths = resourcePaths;
  }

  build(): GameResources {
    if (this.options) {
      this.itemResources = new ItemResources(this.options, this.resourcePaths);

      if (
        this.resourcePaths?.defineItem &&
        this.resourcePaths?.itemsProp &&
        this.resourcePaths?.itemsText
      ) {
        this.itemResources.loadDefines();
        this.itemResources.loadItemsPropStrings();
        this.itemResources.loadItemsProp();
      }
    }

    return {
      itemResources: this.itemResources,
    };
  }
}
