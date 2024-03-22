import fs from "fs-extra";
import { join } from "path";
import _ from "lodash";

import { HandlerConstructor } from "../libraries/packetHandler";
import { PacketType } from "../common/packetType";
import { Logger } from "../helpers/logger";
import { BuilderType } from "../common/builderType";

export class HandlerBuilder {
  private logger: Logger;
  private basePath: string;
  private handlers: Map<PacketType, HandlerConstructor> = new Map();

  constructor() {
    this.logger = new Logger(BuilderType.HANDLER_BUILDER);
  }

  setBasePath(basePath: string): void {
    if (!fs.existsSync(basePath)) {
      this.logger.error(`Cannot find base path ${basePath}.`);
      return;
    }
    this.basePath = basePath;
  }

  async loadHandlers(): Promise<void> {
    if (!fs.existsSync(this.basePath)) {
      this.logger.error(`Cannot find base path ${this.basePath}.`);
      return;
    }

    const handlersFolder = join(this.basePath, "handlers");
    if (!fs.existsSync(handlersFolder)) return;

    const files = fs.readdirSync(handlersFolder);
    if (!files.length) return;

    await Promise.all(
      _.map(files, async (file: string) => {
        const handlerModule = await import(join(handlersFolder, file));
        if (handlerModule && handlerModule.default) {
          const HandlerClass = handlerModule.default as HandlerConstructor;
          const decoratedKey = Reflect.getMetadata("packetType", HandlerClass);
          if (decoratedKey) {
            this.handlers.set(decoratedKey, HandlerClass);
          }
        }
      })
    );
  }

  build(): Map<PacketType, HandlerConstructor> {    
    this.logger.success("Loaded", this.handlers.size, "handlers");
    return this.handlers;
  }
}
