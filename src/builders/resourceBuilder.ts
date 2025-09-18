import { RedisOptions } from "ioredis";
import _ from "lodash";

import { Logger } from "../helpers/logger";
import { BuilderType } from "../types/builderType";
import { ItemResources } from "../resources/itemResource";
import { GameResources } from "../interfaces/resource";
import { MonsterResources } from "../resources/monsterResource";
import { NpcResources } from "../resources/npcResource";
import { JobResources } from "../resources/jobResource";
import { ExpTableResources } from "../resources/expTableResource";
import { DeathPenaltyResources } from "../resources/deathPenaltyResource";
import { MapResources } from "../resources/mapResources";
import { SkillResources } from "../resources/skillResources";
import { QuestResources } from "../resources/questResources";
import { QuestResourcesYaml } from "../resources/questResourcesYaml";

interface ResourceLoadResult {
  success: boolean;
  resourceType: string;
  error?: Error;
  elapsed?: number;
}

export class ResourceBuilder {
  private logger: Logger;
  private loadErrors: ResourceLoadResult[] = [];
  load = true;
  options: RedisOptions;
  itemResources: ItemResources;
  monsterResources: MonsterResources;
  npcResources: NpcResources;
  jobResources: JobResources;
  expTableResources: ExpTableResources;
  deathPenaltyResource: DeathPenaltyResources;
  mapResource: MapResources;
  skillResource: SkillResources;
  questResources: QuestResourcesYaml;

  constructor() {
    this.logger = new Logger(BuilderType.RESOURCE_BUILDER);
  }

  setRedisOptions(options: RedisOptions) {
    this.options = options;
  }

  setLoad(load: boolean) {
    this.load = load;
  }

  public validateCriticalResources(): boolean {
    const criticalResources = ['Items', 'Monsters/Movers', 'Jobs', 'Skills'];
    const failedCritical = this.loadErrors.filter(result =>
      !result.success && criticalResources.some(critical =>
        result.resourceType.includes(critical) || critical.includes(result.resourceType)
      )
    );

    if (failedCritical.length > 0) {
      this.logger.error("CRITICAL ERROR: Essential game resources failed to load!");
      failedCritical.forEach(failure => {
        this.logger.error(`- ${failure.resourceType}: ${failure.error?.message}`);
      });
      return false;
    }

    return true;
  }

  public getLoadingStats(): { total: number; successful: number; failed: number; errors: ResourceLoadResult[] } {
    const successful = this.loadErrors.filter(result => result.success);
    const failed = this.loadErrors.filter(result => !result.success);

    return {
      total: this.loadErrors.length,
      successful: successful.length,
      failed: failed.length,
      errors: failed
    };
  }

  async build(): Promise<GameResources> {
    const buildStartTime = Date.now();
    this.loadErrors = [];

    try {
      if (!this.options) {
        throw new Error("Redis options not configured. Call setRedisOptions() before building.");
      }

      this.logger.info("Initializing game resources...");

      // Initialize all resource instances with error handling
      try {
        this.itemResources = new ItemResources(this.options);
        this.monsterResources = new MonsterResources(this.options);
        this.npcResources = new NpcResources(this.options);
        this.jobResources = new JobResources(this.options);
        this.expTableResources = new ExpTableResources(this.options);
        this.deathPenaltyResource = new DeathPenaltyResources(this.options);
        this.mapResource = new MapResources(this.options);
        this.skillResource = new SkillResources(this.options);

        // QuestResources needs defines from monster resources, so initialize after defines are loaded
        // Use YAML quest loader for better performance and maintainability
        this.questResources = new QuestResourcesYaml(new Map());
      } catch (error) {
        this.logger.error("Failed to initialize resource instances:", error);
        throw new Error(`Resource initialization failed: ${error instanceof Error ? error.message : String(error)}`);
      }

      if (this.load) {
        this.logger.info("Loading game resources...");
        // Load items with error handling
        await this.loadResourceSafely("Items", async () => {
          this.logger.info("Loading items...");
          await this.itemResources.loadDefines();
          await this.itemResources.loadItemsPropStrings();
          await this.itemResources.loadItemsProp();
        });

        // Load monsters with error handling and fallback
        await this.loadResourceSafely("Monsters/Movers", async () => {
          this.logger.info("Loading monsters/movers...");
          try {
            await this.monsterResources.load();
          } catch (error) {
            this.logger.warn("Failed to load with new method, falling back to Redis-based loading:", error);
            await this.monsterResources.loadDefines();
            await this.monsterResources.loadMonstersPropStrings();
            // Note: loadMonstersProp() method was removed as it's replaced by load()
            this.logger.warn("Redis-based fallback is no longer available. Using load() method only.");
            throw error; // Re-throw to indicate failure
          }
        });

        // Load NPCs with error handling
        await this.loadResourceSafely("NPCs", async () => {
          this.logger.info("Loading NPCs...");
          await this.npcResources.load();
        });

        // Load jobs with error handling
        await this.loadResourceSafely("Jobs", async () => {
          this.logger.info("Loading jobs...");
          await this.jobResources.loadDefines();
          await this.jobResources.loadJobsProp();
        });

        // Load experience tables with error handling
        await this.loadResourceSafely("Experience Tables", async () => {
          this.logger.info("Loading experience tables...");
          await this.expTableResources.loadExpCharacter();
          await this.expTableResources.loadExpDropLuck();
        });

        // Load death penalties with error handling
        await this.loadResourceSafely("Death Penalties", async () => {
          this.logger.info("Loading death penalties...");
          await this.deathPenaltyResource.loadDeathPenalty();
        });

        // Load maps with error handling
        await this.loadResourceSafely("Maps", async () => {
          this.logger.info("Loading maps and worlds...");
          await this.mapResource.loadDefines();
          await this.mapResource.loadWorldPaths();
          await this.mapResource.load();
        });

        // Load skills with error handling
        await this.loadResourceSafely("Skills", async () => {
          this.logger.info("Loading skills...");
          await this.skillResource.loadDefines();
          await this.skillResource.loadSkillsPropStrings();
          await this.skillResource.loadSkillsProp();
        });

        // Load quests with error handling (non-critical)
        await this.loadResourceSafely("Quests", async () => {
          this.logger.info("Loading quest defines...");
          await this.questResources.loadDefines();
          this.logger.info("Loading quests...");
          this.questResources.load();
        }, false); // Non-critical resource

        // Log summary of loaded resources
        await this.logResourceSummary(buildStartTime);

        // Validate critical resources
        if (!this.validateCriticalResources()) {
          throw new Error("Critical resources failed to load. Server cannot start safely.");
        }
      }
    } catch (error) {
      this.logger.error("Critical error during resource building:", error);
      this.logErrorSummary();
      throw error;
    }

    // Return resources even if some failed to load (graceful degradation)
    return {
      itemResources: this.itemResources,
      monsterResources: this.monsterResources,
      npcResources: this.npcResources,
      jobResources: this.jobResources,
      expTableResources: this.expTableResources,
      deathPenaltyResource: this.deathPenaltyResource,
      mapResource: this.mapResource,
      questResources: this.questResources,
    };
  }

  private async loadResourceSafely(
    resourceType: string,
    loadFunction: () => Promise<void> | void,
    critical: boolean = true
  ): Promise<void> {
    const startTime = Date.now();

    try {
      await loadFunction();

      const elapsed = Date.now() - startTime;
      this.loadErrors.push({
        success: true,
        resourceType,
        elapsed
      });

    } catch (error) {
      const elapsed = Date.now() - startTime;
      const loadError = error instanceof Error ? error : new Error(String(error));

      this.loadErrors.push({
        success: false,
        resourceType,
        error: loadError,
        elapsed
      });

      if (critical) {
        this.logger.error(`CRITICAL: Failed to load ${resourceType}:`, loadError.message);
        throw new Error(`Critical resource loading failed: ${resourceType} - ${loadError.message}`);
      } else {
        this.logger.warn(`NON-CRITICAL: Failed to load ${resourceType}:`, loadError.message);
        this.logger.warn(`Server will continue without ${resourceType} functionality.`);
      }
    }
  }

  private logErrorSummary(): void {
    const failures = this.loadErrors.filter(result => !result.success);

    if (failures.length > 0) {
      this.logger.error("\\n=== RESOURCE LOADING ERRORS ===");

      failures.forEach(failure => {
        this.logger.error(`${failure.resourceType}: ${failure.error?.message || 'Unknown error'}`);
      });

      this.logger.error("=" + "=".repeat(31) + "=");
    }
  }

  private async logResourceSummary(buildStartTime: number): Promise<void> {
    const totalElapsed = Date.now() - buildStartTime;
    const successfulLoads = this.loadErrors.filter(result => result.success);
    const failedLoads = this.loadErrors.filter(result => !result.success);

    this.logger.success("==== RESOURCE LOADING SUMMARY ====");

    // Get counts from each resource type
    const resourceCounts = await this.getResourceCounts();

    // Log individual resource counts with status indicators
    Object.entries(resourceCounts).forEach(([resourceType, count]) => {
      const loadResult = this.loadErrors.find(result =>
        result.resourceType === resourceType ||
        resourceType.includes(result.resourceType.split('/')[0])
      );

      let statusIndicator = "";
      let countStr = count === -1 ? "✓" : count.toString();

      if (loadResult) {
        if (loadResult.success) {
          statusIndicator = "✓";
        } else {
          statusIndicator = "✗";
          countStr = "FAILED";
        }
      }

      const logMethod = loadResult?.success !== false ? this.logger.success : this.logger.error;
      logMethod.call(this.logger, `${resourceType.padEnd(20)} ${countStr.padStart(6)} ${statusIndicator}`);
    });

    // Calculate total (excluding unknown counts)
    const knownCounts = Object.values(resourceCounts).filter(count => count >= 0);
    const totalResources = knownCounts.reduce((sum, count) => sum + count, 0);
    const hasUnknownCounts = Object.values(resourceCounts).some(count => count === -1);

    this.logger.success("=".repeat(35));
    const totalStr = hasUnknownCounts ? `${totalResources}+` : totalResources.toString();
    this.logger.success(`${"TOTAL RESOURCES".padEnd(20)} ${totalStr.padStart(6)} loaded`);

    // Add error summary to main summary
    if (failedLoads.length > 0) {
      this.logger.error(`${"FAILED RESOURCES".padEnd(20)} ${failedLoads.length.toString().padStart(6)} failed`);
    }

    this.logger.success(`${"BUILD TIME".padEnd(20)} ${totalElapsed.toString().padStart(4)}ms`);
    this.logger.success("=" + "=".repeat(33) + "=");

    // Log detailed error information if there were failures
    if (failedLoads.length > 0) {
      this.logErrorSummary();
    }
  }

  private async getResourceCounts(): Promise<Record<string, number>> {
    const counts: Record<string, number> = {};

    try {
      // MonsterResources (in-memory) - use direct method
      if (this.monsterResources) {
        try {
          counts["Monsters/Movers"] = this.monsterResources.getLoadedCount();
        } catch {
          counts["Monsters/Movers"] = 0;
        }
      }

      // QuestResources (in-memory) - use direct method
      if (this.questResources) {
        try {
          counts["Quests"] = this.questResources.getLoadedCount();
        } catch {
          counts["Quests"] = 0;
        }
      }

      // MapResources (in-memory) - use direct method
      if (this.mapResource) {
        try {
          counts["Maps"] = this.mapResource.getLoadedCount();
        } catch {
          counts["Maps"] = 0;
        }
      }

      // Try to get Redis-based resource counts
      try {
        if (this.itemResources) {
          counts["Items"] = await this.getRedisCount("item:*");
        }
        if (this.npcResources) {
          counts["NPCs"] = await this.getRedisCount("npc:*");
        }
        if (this.jobResources) {
          counts["Jobs"] = await this.getRedisCount("job:*");
        }
        if (this.skillResource) {
          counts["Skills"] = await this.getRedisCount("skill:*");
        }
      } catch (error) {
        // Fallback to -1 if Redis count fails
        counts["Items"] = this.itemResources ? -1 : 0;
        counts["NPCs"] = this.npcResources ? -1 : 0;
        counts["Jobs"] = this.jobResources ? -1 : 0;
        counts["Skills"] = this.skillResource ? -1 : 0;
      }

      counts["Exp Tables"] = this.expTableResources ? 2 : 0; // Character exp + Drop luck
      counts["Death Penalties"] = this.deathPenaltyResource ? 3 : 0; // Revival, exp decrease, level down

    } catch (error) {
      this.logger.warn("Error getting resource counts:", error);
    }

    return counts;
  }

  private async getRedisCount(pattern: string): Promise<number> {
    return new Promise((resolve) => {
      this.itemResources.redisClient.keys(pattern, (err, keys) => {
        if (err || !keys) {
          resolve(-1); // Error or no connection
        } else {
          resolve(keys.length);
        }
      });
    });
  }
}
