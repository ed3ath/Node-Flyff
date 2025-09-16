import { RedisOptions } from "ioredis";
import _ from "lodash";

import { Logger } from "../helpers/logger";
import { BuilderType } from "../common/builderType";
import { ItemResources } from "../resources/itemResource";
import { GameResources } from "../interfaces/resource";
import { MonsterResources } from "../resources/monsterResource";
import { NpcResources } from "../resources/npcResource";
import { JobResources } from "../resources/jobResource";
import { ExpTableResources } from "../resources/expTableResource";
import { DeathPenaltyResources } from "../resources/deathPenaltyResource";
import { MapResources } from "../resources/mapResources";
import { SkillResources } from "../resources/skillResources";

export class ResourceBuilder {
  private logger: Logger;
  load = true;
  options: RedisOptions;
  itemResources: ItemResources;
  monsterResources: MonsterResources;
  npcResources: NpcResources;
  jobResources: JobResources;
  expTableResources: ExpTableResources;
  deathPenaltyResource: DeathPenaltyResources;
  mapResource: MapResources;
  skillResource: SkillResources

  constructor() {
    this.logger = new Logger(BuilderType.RESOURCE_BUILDER);
  }

  setRedisOptions(options: RedisOptions) {
    this.options = options;
  }

  setLoad(load: boolean) {
    this.load = load;
  }

  async build(): Promise<GameResources> {
    if (this.options) {
      this.itemResources = new ItemResources(this.options);
      this.monsterResources = new MonsterResources(this.options);
      this.npcResources = new NpcResources(this.options);
      this.jobResources = new JobResources(this.options);
      this.expTableResources = new ExpTableResources(this.options);
      this.deathPenaltyResource = new DeathPenaltyResources(this.options);
      this.mapResource = new MapResources(this.options);
      this.skillResource = new SkillResources(this.options);

      if (this.load) {
        await this.itemResources.loadDefines();
        await this.itemResources.loadItemsPropStrings();
        await this.itemResources.loadItemsProp();

        await this.monsterResources.loadDefines();
        await this.monsterResources.loadMonstersPropStrings();
        await this.monsterResources.loadMonstersProp();

        await this.npcResources.load();

        await this.jobResources.loadDefines();
        await this.jobResources.loadJobsProp();

        await this.expTableResources.loadExpCharacter();
        await this.expTableResources.loadExpDropLuck();

        await this.deathPenaltyResource.loadDeathPenalty();

        await this.mapResource.loadDefines();
        await this.mapResource.loadWorldPaths();
        await this.mapResource.load();

        await this.skillResource.loadDefines();
        await this.skillResource.loadSkillsPropStrings();
        await this.skillResource.loadSkillsProp();
      }
      // console.log(await this.skillResource.get("SI_VAG_ONE_OVERCUTTER"));
    }

    return {
      itemResources: this.itemResources,
      monsterResources: this.monsterResources,
      npcResources: this.npcResources,
      jobResources: this.jobResources,
      expTableResources: this.expTableResources,
      deathPenaltyResource: this.deathPenaltyResource,
      mapResource: this.mapResource,
    };
  }
}
