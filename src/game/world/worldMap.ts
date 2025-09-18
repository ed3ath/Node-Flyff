import { Logger } from "../../helpers/logger";
import { sleep } from "../../helpers/sleep";
import { MapLayer } from "./mapLayer";
import { MapProperties } from "./mapProperties";
import { MapRevivalRegionProperties } from "./mapRevivalRegion";
import { Vector3 } from "../../abstract/vector3";

export class WorldMap {
  private static readonly FrameRate: number = 67;
  private static readonly UpdateRate: number = 1000 / WorldMap.FrameRate;

  private _logger: Logger;
  private _layers: MapLayer[] = [];
  private _defaultMapLayer: MapLayer;
  private _mapLayerIdGenerator: number = 1;
  private _cancelled = false;

  public properties: MapProperties;

  public get id(): number {
    return this.properties.id;
  }

  public get name(): string {
    return this.properties.name;
  }

  public get isCancelled() {
    return this._cancelled;
  }

  public set isCancelled(value: boolean) {
    this._cancelled = value;
  }

  public constructor(properties: MapProperties) {
    this._logger = new Logger("World Map");
    this.properties = properties;
    this._defaultMapLayer = new MapLayer(this, this._mapLayerIdGenerator++);

    this._layers.push(this._defaultMapLayer);

    setInterval(this.updateAsync.bind(this), 1000);
    setInterval(this.updateSecondsAsync.bind(this), 1000);
  }

  public getDefaultLayer(): MapLayer {
    return this._defaultMapLayer;
  }

  public getLayer(layerId: number): MapLayer | undefined {
    return this._layers.find((x) => x.id === layerId);
  }

  public getHeight(positionX: number, positionZ: number): number {
    // TODO: Implement
    return 0;
  }

  public isInBounds(
    xOrPosition: number | Vector3,
    y?: number,
    z?: number
  ): boolean {
    if (typeof xOrPosition === "number") {
      const x = xOrPosition;
      if (y !== undefined && z !== undefined) {
        return this.properties.bounds.contains(x, y, z);
      }
      throw new Error("Incomplete coordinates provided.");
    } else {
      const position = xOrPosition;
      return this.isInBounds(position.x, position.y, position.z);
    }
  }

  public getNearestRevivalRegion(
    position: Vector3,
    isChaoMode: boolean
  ): MapRevivalRegionProperties | undefined {
    const definedRevivalRegion = this.properties.regions
      .filter((x) => x instanceof MapRevivalRegionProperties)
      .find(
        (x: MapRevivalRegionProperties) =>
          x.mapId === this.id &&
          x.contains(position) &&
          x.isChaoRegion === isChaoMode &&
          x.targetRevivalKey
      ) as MapRevivalRegionProperties | undefined;

    if (definedRevivalRegion) {
      return this.getRevivalRegion(definedRevivalRegion.key, isChaoMode);
    }

    return this.properties.regions
      .filter((x) => x instanceof MapRevivalRegionProperties)
      .filter(
        (x: MapRevivalRegionProperties) =>
          x.isChaoRegion === isChaoMode && !x.targetRevivalKey
      )
      .sort(
        (a: MapRevivalRegionProperties, b: MapRevivalRegionProperties) =>
          position.getDistance3D(a.revivalPosition) -
          position.getDistance3D(b.revivalPosition)
      )
      .shift() as MapRevivalRegionProperties | undefined;
  }

  public getRevivalRegion(
    revivalKey: string,
    isChaoMode: boolean
  ): MapRevivalRegionProperties | undefined {
    return this.properties.regions
      .filter((x) => x instanceof MapRevivalRegionProperties)
      .find(
        (x: MapRevivalRegionProperties) =>
          x.key.toLowerCase() === revivalKey.toLowerCase() &&
          x.isChaoRegion === isChaoMode &&
          !x.targetRevivalKey
      ) as MapRevivalRegionProperties | undefined;
  }

  private async updateAsync(): Promise<void> {
    while (!this.isCancelled) {
      try {
        const nextUpdate = new Date(Date.now() + WorldMap.UpdateRate);

        this._layers.forEach((layer) => {
          layer.update();
        });

        const currentTime = new Date();

        if (nextUpdate > currentTime) {
          await sleep(nextUpdate.getTime() - currentTime.getTime());
        }
      } catch (e) {
        this._logger.error(e, `An error occured on map '${this.name}'.`);
      }
    }
  }

  private async updateSecondsAsync(): Promise<void> {
    while (!this.isCancelled) {
      this._layers.forEach((layer) => {
        layer.updateSeconds();
      });

      await sleep(1000);
    }
  }
}
