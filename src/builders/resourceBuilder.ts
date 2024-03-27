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

export class ResourceBuilder {
  private logger: Logger;
  options: RedisOptions;
  itemResources: ItemResources;
  monsterResources: MonsterResources;
  npcResources: NpcResources;
  jobResources: JobResources;
  expTableResources: ExpTableResources;
  deathPenaltyResource: DeathPenaltyResources

  constructor() {
    this.logger = new Logger(BuilderType.REDIS_BUILDER);
  }

  setRedisOptions(options: RedisOptions) {
    this.options = options;
  }

  async build(): Promise<GameResources> {
    if (this.options) {
      this.itemResources = new ItemResources(this.options);
      this.monsterResources = new MonsterResources(this.options);
      this.npcResources = new NpcResources(this.options);
      this.jobResources = new JobResources(this.options);
      this.expTableResources = new ExpTableResources(this.options);
      this.deathPenaltyResource = new DeathPenaltyResources(this.options);

      await this.itemResources.loadDefines();
      await this.itemResources.loadItemsPropStrings();
      await this.itemResources.loadItemsProp();

      await this.monsterResources.loadDefines();
      await this.monsterResources.loadMonstersPropStrings();
      await this.monsterResources.loadMonstersProp();

      await this.npcResources.loadNpcDialogs();
      await this.npcResources.loadNpcShops();
      await this.npcResources.loadNpcPropStrings();
      await this.npcResources.loadNpcSchoolPropStrings();
      await this.npcResources.loadNpcProp();

      await this.jobResources.loadDefines();
      await this.jobResources.loadJobsProp();

      await this.expTableResources.loadExpCharacter();
      await this.expTableResources.loadExpDropLuck();

      await this.deathPenaltyResource.loadDeathPenalty();

      // console.log(await this.jobResources.get("JOB_PSYCHIKEEPER_HERO"));
    }

    return {
      itemResources: this.itemResources,
      monsterResources: this.monsterResources,
    };
  }
}
