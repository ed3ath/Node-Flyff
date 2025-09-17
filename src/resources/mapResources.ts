import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import Redis, { RedisOptions } from "ioredis";
import yaml from "js-yaml";

import { Logger } from "../helpers/logger";
import { ResourcePaths } from "../resources/resourcePaths";
import { WorldPath } from "../interfaces/resource";
import { RgnRespawn7 } from "../abstract/rgn/rgnRespawn7";
import { RgnRegion3 } from "../abstract/rgn/rgnRegion3";
import { RgnElement } from "../abstract/rgn/rgnElement";
import { WldFile } from "../abstract/wldFile";
import { MapRegionProperties } from "../abstract/regionProperties";
import { RgnFile } from "../abstract/rgn/rgnFile";
import { MapRespawnRegionProperties } from "../abstract/regionRespawnProperties";
import { RegionInfoType } from "../common/regionInfoType";
import { MapRevivalRegionProperties } from "../abstract/mapRevivalRegion";
import { MapTriggerRegionProperties } from "../abstract/mapTriggerRegionProperties";
import { DyoFile } from "../abstract/dyo/dyoFile";
import { MapObjectProperties } from "../abstract/mapObjectProperties";
import { DyoNpcElement } from "../abstract/dyo/dyoNpcElement";
import { Rectangle } from "../abstract/rectangle";
import { MapProperties } from "../abstract/mapProperties";
import { tryParseInt } from "../helpers/parsing";

export class MapResources {
  private logger: Logger;
  private readonly redisClient: Redis;
  private readonly defines: Map<string, number> = new Map();
  private readonly mapsById: Map<number, MapProperties> = new Map();
  private readonly mapsByIdentifier: Map<string, MapProperties> = new Map();
  private worldPaths: Map<string, string> = new Map();

  public get maps(): MapProperties[] {
    return Array.from(this.mapsById.values());
  }

  public getLoadedCount(): number {
    return this.mapsById.size;
  }

  constructor(options: RedisOptions) {
    this.logger = new Logger("Map Resources");
    this.redisClient = new Redis(options);
  }

  public async get(id: number): Promise<MapProperties | null> {
    // Try cache first
    const cached = await new Promise<any>((resolve) => this.redisClient.hgetall(`map:${id}`, (err, data) => resolve(data)));
    if (cached && Object.keys(cached).length > 0) {
      return this.parseMapProperties(cached);
    }

    // Fallback to in-memory
    return this.mapsById.get(id) || null;
  }

  public async getByIdentifier(identifier: string): Promise<MapProperties | null> {
    // Try cache first
    const cached = await new Promise<any>((resolve) => this.redisClient.hgetall(`mapById:${identifier}`, (err, data) => resolve(data)));
    if (cached && Object.keys(cached).length > 0) {
      return this.parseMapProperties(cached);
    }

    // Fallback to in-memory
    return this.mapsByIdentifier.get(identifier) || null;
  }

  public async load(): Promise<void> {
    await this.loadDefines();
    await this.loadWorldPaths();
    // Load all maps if no identifiers provided
    this.loadMaps();
  }

  public loadMaps(mapIdentifiers?: string[]): void {
    const watch = { start: Date.now() };
    console.log(`[DEBUG] loadMaps called with mapIdentifiers:`, mapIdentifiers);

    if (mapIdentifiers && mapIdentifiers.length > 0) {
      console.log(`[DEBUG] Loading ${mapIdentifiers.length} specific maps`);
      const worldNames = this.loadWorldScriptFile();

      for (const mapIdentifier of mapIdentifiers) {
        if (this.mapsByIdentifier.has(mapIdentifier)) {
          this.logger.warn(`Map '${mapIdentifier}' has already been loaded.`);
          continue;
        }

        if (!worldNames.has(mapIdentifier)) {
          this.logger.warn(`Failed to load map '${mapIdentifier}'. Not declared in world script.`);
          continue;
        }

        const worldName = worldNames.get(mapIdentifier)!;

        if (!this.defines.has(mapIdentifier)) {
          this.logger.warn(`Failed to load map '${mapIdentifier}'. ID not defined.`);
          continue;
        }

        const mapId = this.defines.get(mapIdentifier)!;

        const worldInformation = this.loadWorldInformation(worldName);

        const bounds = new Rectangle(0, 0,
          worldInformation.width * worldInformation.mpu * 128,
          worldInformation.length * worldInformation.mpu * 128);

        const map = new MapProperties(
          mapId,
          worldName,
          worldInformation.width,
          worldInformation.length,
          this.loadHeights(worldName, worldInformation.width, worldInformation.length),
          worldInformation.revivalMapId,
          worldInformation.mpu,
          bounds,
          this.loadRegions(worldName, worldInformation.revivalMapId),
          this.loadObjects(worldName)
        );

        this.mapsById.set(mapId, map);
        this.mapsByIdentifier.set(mapIdentifier, map);
      }
    } else {
      // Load all maps when no specific identifiers provided
      console.log(`[DEBUG] Loading all maps (no specific identifiers provided)`);
      const worldNames = this.loadWorldScriptFile();
      console.log(`[DEBUG] Found ${worldNames.size} worlds in world script file`);

      for (const [mapIdentifier, worldName] of worldNames) {
        console.log(`[DEBUG] Processing map: ${mapIdentifier} -> ${worldName}`);

        if (this.mapsByIdentifier.has(mapIdentifier)) {
          console.log(`[DEBUG] Map '${mapIdentifier}' already loaded, skipping`);
          continue;
        }

        if (!this.defines.has(mapIdentifier)) {
          console.log(`[DEBUG] Map '${mapIdentifier}' not defined, skipping`);
          continue;
        }

        const mapId = this.defines.get(mapIdentifier)!;
        console.log(`[DEBUG] Loading map ${mapIdentifier} (ID: ${mapId})`);

        const worldInformation = this.loadWorldInformation(worldName);
        console.log(`[DEBUG] World info for ${worldName}:`, worldInformation);

        const bounds = new Rectangle(0, 0,
          worldInformation.width * worldInformation.mpu * 128,
          worldInformation.length * worldInformation.mpu * 128);

        const map = new MapProperties(
          mapId,
          worldName,
          worldInformation.width,
          worldInformation.length,
          this.loadHeights(worldName, worldInformation.width, worldInformation.length),
          worldInformation.revivalMapId,
          worldInformation.mpu,
          bounds,
          this.loadRegions(worldName, worldInformation.revivalMapId),
          this.loadObjects(worldName)
        );

        this.mapsById.set(mapId, map);
        this.mapsByIdentifier.set(mapIdentifier, map);
        console.log(`[DEBUG] Successfully loaded map ${mapIdentifier}`);
      }
    }

    const elapsed = Date.now() - watch.start;
    console.log(`[DEBUG] loadMaps completed. Total maps loaded: ${this.mapsById.size}`);
    this.logger.info(`${this.mapsById.size} maps loaded in ${elapsed}ms.`);
  }

  private loadWorldScriptFile(): Map<string, string> {
    const absolutePath = path.resolve(ResourcePaths.worldPath);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(`World script not found: ${absolutePath}`);
      return new Map();
    }

    const text = fs.readFileSync(absolutePath, "utf-8");
    const yamlData = yaml.load(text) as any[];

    const worlds = new Map<string, string>();
    for (const world of yamlData) {
      if (world.id && world.name) {
        worlds.set(world.id, world.name);
      }
    }
    return worlds;
  }

  private loadWorldInformation(worldName: string): { width: number, length: number, mpu: number, revivalMapId: number } {
    const wldPath = path.join(ResourcePaths.world, worldName, `${worldName}.wld`);
    if (!fs.existsSync(wldPath)) {
      this.logger.warn(`World file not found: ${wldPath}`);
      return { width: 0, length: 0, mpu: 1, revivalMapId: 0 };
    }

    const worldFile = new WldFile(wldPath);
    return worldFile.worldData || { width: 0, length: 0, mpu: 1, revivalMapId: 0 };
  }

  private loadRegions(worldName: string, revivalMapId: number): MapRegionProperties[] {
    const rgnPath = path.join(ResourcePaths.world, worldName, `${worldName}.rgn`);
    if (!fs.existsSync(rgnPath)) {
      this.logger.warn(`Regions file not found: ${rgnPath}`);
      return [];
    }

    const regions: MapRegionProperties[] = [];
    const rgnFile = new RgnFile(rgnPath);

    // Respawn regions
    const respawners = rgnFile.getElements<RgnRespawn7>().map(region => new MapRespawnRegionProperties(
      region.left,
      region.top,
      region.width,
      region.length,
      region.time,
      region.position.y,
      region.type,
      region.model,
      region.count
    ));
    regions.push(...respawners);

    // Other regions
    const region3s = rgnFile.getElements<RgnRegion3>();
    for (const region of region3s) {
      let mapRegion: MapRegionProperties | null = null;
      if (region.index === RegionInfoType.Revival) {
        mapRegion = new MapRevivalRegionProperties(
          region.left,
          region.top,
          region.width,
          region.length,
          revivalMapId,
          region.key,
          region.chaoKey,
          false, // targetRevivalKey
          region.position
        );
      } else if (region.index === RegionInfoType.Trigger) {
        mapRegion = new MapTriggerRegionProperties(
          region.left,
          region.top,
          region.width,
          region.length,
          region.teleportWorldId,
          region.teleportPosition
        );
      }
      if (mapRegion) regions.push(mapRegion);
    }

    return regions;
  }

  private loadObjects(worldName: string): MapObjectProperties[] {
    const dyoPath = path.join(ResourcePaths.world, worldName, `${worldName}.dyo`);
    if (!fs.existsSync(dyoPath)) {
      this.logger.warn(`Objects file not found: ${dyoPath}`);
      return [];
    }

    const dyoFile = new DyoFile(dyoPath);
    return dyoFile.getElements<DyoNpcElement>()
      .filter(element => element !== null)
      .map(element => new MapObjectProperties(
        element.index,
        element.position.clone(),
        element.angle,
        element.characterKey
      ));
  }

  private loadHeights(worldName: string, width: number, length: number): number[] {
    const heights: number[] = [];
    const landscapeSize = 128;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < length; y++) {
        const lndPath = path.join(ResourcePaths.world, worldName, `${worldName}${x.toString().padStart(2, '0')}-${y.toString().padStart(2, '0')}.lnd`);
        if (fs.existsSync(lndPath)) {
          const buffer = fs.readFileSync(lndPath);
          const dataView = new DataView(buffer.buffer);
          const version = dataView.getInt32(0, true);

          if (version >= 1) {
            const numHeights = (landscapeSize + 1) * (landscapeSize + 1);
            for (let i = 0; i < numHeights; i++) {
              heights.push(dataView.getFloat32(4 + i * 4, true));
            }
          }
        }
      }
    }

    return heights;
  }

  public async loadDefines(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.defineWorld);
    console.log(`[DEBUG] Loading world defines from: ${absolutePath}`);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(`Unable to load world defines: ${absolutePath}`);
      return;
    }

    const data = fs.readFileSync(absolutePath, "utf8");
    const lines = data.split("\n");
    console.log(`[DEBUG] Read ${lines.length} lines from defineWorld.h`);

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("#define")) {
        const parts = trimmed.split(/\s+/);
        if (parts.length >= 3) {
          const name = parts[1];
          const idStr = parts[2].replace(/,$/, '');
          const id = parseInt(idStr, 10);
          if (!isNaN(id)) {
            this.defines.set(name, id);
            console.log(`[DEBUG] Added define: ${name} = ${id}`);
          }
        }
      }
    }

    this.logger.info(`${this.defines.size} world defines loaded.`);
    console.log(`[DEBUG] Total defines loaded: ${this.defines.size}`);
  }

  public async loadWorldPaths(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.worldPath);
    console.log(`[DEBUG] Loading world paths from: ${absolutePath}`);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(`Unable to load world paths: ${absolutePath}`);
      return;
    }

    const text = fs.readFileSync(absolutePath, "utf-8");
    const yamlData = yaml.load(text) as any[];
    console.log(`[DEBUG] Parsed ${yamlData.length} worlds from world.yaml`);

    for (const world of yamlData) {
      if (world.id && world.name) {
        this.worldPaths.set(world.id, world.name);
        console.log(`[DEBUG] Added world path: ${world.id} -> ${world.name}`);
      }
    }

    this.logger.info(`${this.worldPaths.size} world paths loaded.`);
    console.log(`[DEBUG] Total world paths loaded: ${this.worldPaths.size}`);
  }

  private parseMapProperties(data: { [key: string]: string }): MapProperties {
    return {
      id: parseInt(data["id"]),
      name: data["name"],
      width: parseInt(data["width"]),
      length: parseInt(data["length"]),
      mpu: parseInt(data["mpu"]),
      revivalMapId: parseInt(data["revivalMapId"]),
      bounds: JSON.parse(data["bounds"]),
      regions: JSON.parse(data["regions"]),
      objects: JSON.parse(data["objects"]),
      heights: JSON.parse(data["heights"])
    };
  }
}
