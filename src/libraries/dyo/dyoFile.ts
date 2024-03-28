import fs from "fs-extra";
import _ from "lodash";

import { BinaryStream } from "../binaryStream";
import { DyoElement } from "./dyoElement";
import { WorldObjectType } from "../../common/worldObjectType";
import { DyoCommonControlElement } from "./dyoCommonControlElement";
import { DyoNpcElement } from "./dyoNpcElement";

export class DyoFile {
  private readonly _elements: DyoElement[] = [];

  constructor(dyoFilePath: string) {
    const data = fs.readFileSync(dyoFilePath, "binary");
    const buffer = Buffer.from(data, "binary");
    const streamReader = new BinaryStream(buffer);

    while (streamReader.position < streamReader.buffer.length) {
      let rgnElement: DyoElement | null = null;
      const type = streamReader.readUInt32LE();

      switch (type) {
        case WorldObjectType.Control:
          rgnElement = new DyoCommonControlElement();
          break;
        case WorldObjectType.Mover:
          rgnElement = new DyoNpcElement();
          break;
        case WorldObjectType.Object:
        case WorldObjectType.Item:
        case WorldObjectType.Ship:
          rgnElement = new DyoElement();
          break;
      }

      if (!rgnElement) {
        break;
      }

      rgnElement.elementType = type;
      rgnElement.read(streamReader);

      if (!_.isUndefined(rgnElement.angle)) {
        this._elements.push(rgnElement);
      }
    }
  }

  get Elements(): DyoElement[] {
    return this._elements;
  }

  getElements<T extends DyoElement>(): T[] {
    return this._elements.filter((element) => element) as T[];
  }
}
