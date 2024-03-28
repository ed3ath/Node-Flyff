import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import Redis, { RedisOptions } from "ioredis";
import yaml from "js-yaml";

import { Logger } from "../helpers/logger";
import { ResourcePaths } from "../resources/resourcePaths";
import { WorldPath } from "../interfaces/resource";
import { RgnRespawn7 } from "../libraries/rgn/rgnRespawn7";
import { RgnRegion3 } from "../libraries/rgn/rgnRegion3";
import { RgnElement } from "../libraries/rgn/rgnElement";
import { WldFile } from "../libraries/wldFile";
import { MapRegionProperties } from "../libraries/regionProperties";
import { RgnFile } from "../libraries/rgn/rgnFile";
import { MapRespawnRegionProperties } from "../libraries/regionRespawnProperties";
import { RegionInfoType } from "../common/regionInfoType";
import { MapRevivalRegionProperties } from "../libraries/mapRevivalRegion";
import { MapTriggerRegionProperties } from "../libraries/mapTriggerRegionProperties";
import { DyoFile } from "../libraries/dyo/dyoFile";
import { MapObjectProperties } from "../libraries/mapObjectProperties";
import { DyoNpcElement } from "../libraries/dyo/dyoNpcElement";
import { Rectangle } from "../libraries/rectangle";
import { MapProperties } from "../libraries/mapProperties";
import { tryParseInt } from "../helpers/parsing";

export class MapResources {
  logger: Logger;
  redisClient: Redis;
  worldPaths: WorldPath[] = [];
  maps: MapProperties[] = [];

  constructor(options: RedisOptions) {
    this.logger = new Logger("World Resources");
    this.redisClient = new Redis(options);
  }

  public async loadDefines(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.defineWorld);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(
        `Unable to load world defines. Reason: cannot find '${absolutePath}' file.`
      );
    }

    const data = fs.readFileSync(absolutePath, "utf8");

    const lines = data.split("\n");
    _.forEach(lines, async (line) => {
      if (_.trim(line).startsWith("#define")) {
        const parts = _.trim(line).split(/\s+/);
        const id = tryParseInt(parts[2]);
        const name = parts[1];

        if (!_.isNaN(id) && name !== "") {
          await this.redisClient.hset("worldDefines", name, id);
        }
      }
    });
  }

  public async loadWorldPaths(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.worldPath);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(
        `Unable to load worlds. Reason: cannot find '${absolutePath}' file.`
      );
    }

    const text = fs.readFileSync(absolutePath, "utf-8");
    this.worldPaths = yaml.load(text) as WorldPath[];
  }

  public async loadWorldData(path: string) {
    const worldFile = new WldFile(path);
    return worldFile.worldData;
  }

  public async loadRegions(
    worldName: string,
    revivalMapId: number
  ): Promise<MapRegionProperties[]> {
    const absolutePath = path.resolve(ResourcePaths.world, worldName);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load regions. Reason: cannot find '${absolutePath}' folder.`
      );
      return [];
    }
    const worldPath = path.join(absolutePath, `${worldName}.rgn`);
    if (!fs.existsSync(worldPath)) {
      this.logger.warn(
        `Unable to load regions. Reason: cannot find ${worldPath}`
      );
      return [];
    }
    const regions: MapRegionProperties[] = [];
    const rgnFile = new RgnFile(worldPath);
    const respawnerRgn: MapRespawnRegionProperties[] = rgnFile
      .getElements<RgnRespawn7>()
      .map(
        (region) =>
          new MapRespawnRegionProperties(
            region.left,
            region.top,
            region.width,
            region.left,
            region.time,
            region.position.y,
            region.type,
            region.model,
            region.count
          )
      );

    regions.push(...respawnerRgn);

    const mapRegions: (
      | MapRevivalRegionProperties
      | MapTriggerRegionProperties
      | null
    )[] = rgnFile.getElements<RgnRegion3>().map((region) => {
      if (region.index === RegionInfoType.Revival) {
        return new MapRevivalRegionProperties(
          region.left,
          region.top,
          region.width,
          region.length,
          revivalMapId,
          region.key,
          region.chaoKey,
          region.targetKey,
          region.position
        );
      }
      if (region.index === RegionInfoType.Trigger) {
        return new MapTriggerRegionProperties(
          region.left,
          region.top,
          region.width,
          region.length,
          region.teleportWorldId,
          region.teleportPosition
        );
      }
      return null;
    });
    const filteredMapRegions = mapRegions.filter(
      (i) => !!i
    ) as MapRegionProperties[];

    if (filteredMapRegions.length) regions.push(...filteredMapRegions);

    return regions;
  }

  public async loadWorldObjects(
    worldName: string
  ): Promise<MapObjectProperties[]> {
    const absolutePath = path.resolve(ResourcePaths.world, worldName);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load regions. Reason: cannot find '${absolutePath}' folder.`
      );
      return [];
    }
    const worldPath = path.join(absolutePath, `${worldName}.dyo`);
    if (!fs.existsSync(worldPath)) {
      this.logger.warn(
        `Unable to load regions. Reason: cannot find ${worldPath}`
      );
      return [];
    }

    const elements = new DyoFile(
      path.join(ResourcePaths.world, worldName, `${worldName}.dyo`)
    );
    return elements
      .getElements<DyoNpcElement>()
      .filter((i) => !!i)
      .map(
        (element) =>
          new MapObjectProperties(
            element.index,
            element.position,
            element.angle,
            element.characterKey
          )
      );
  }

  public async loadWorldProp(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.world);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load world. Reason: cannot find '${absolutePath}' folder.`
      );
    }

    await Promise.all(
      this.worldPaths.map(async (worldPath) => {
        if (fs.existsSync(path.join(ResourcePaths.world, worldPath.name))) {
          const id = await this.redisClient.hget("worldDefines", worldPath.id);

          if (id) {
            const worldData = await this.loadWorldData(
              path.join(
                ResourcePaths.world,
                worldPath.name,
                `${worldPath.name}.wld`
              )
            );
            const regions = await this.loadRegions(
              worldPath.name,
              worldData.revivalMapId
            );
            const objects = await this.loadWorldObjects(worldPath.name);
            const bounds = new Rectangle(
              0,
              0,
              worldData.width * worldData.mpu * MapProperties.regionSize,
              worldData.length * worldData.mpu * MapProperties.regionSize
            );

            const map = new MapProperties(
              tryParseInt(id),
              worldPath.name,
              worldData.width,
              worldData.length,
              [],
              worldData.revivalMapId,
              worldData.mpu,
              bounds,
              regions,
              objects
            );

            this.maps.push(map);
          }
        }
      })
    );
    this.logger.main(`${this.maps.length} maps loaded.`);
  }
}
