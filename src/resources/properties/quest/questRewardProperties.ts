import { randomInt } from "crypto";
import { DefineJob } from "../../../game/definitions/defineJob";
import { QuestItemProperties } from "./questItemProperties";

export type Range = { min: number; max: number };

export function randInt(min: number, max: number): number {
  if (max < min) [min, max] = [max, min];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randLong(min: number, max: number): number {
  // JS number is IEEE-754; this is fine for game reward ranges
  return randInt(min, max);
}

export class QuestRewardProperties {
  // input representations
  private readonly goldFixed?: number;
  private readonly goldRange?: Range;
  private readonly expFixed?: number;
  private readonly expRange?: Range;

  private readonly rewardJob?: DefineJob;
  private readonly rewardJobFn?: (player: unknown) => DefineJob;

  public readonly items: ReadonlyArray<QuestItemProperties>;
  public readonly restat: boolean;
  public readonly reskill: boolean;
  public readonly skillPoints: number;

  // Compatibility fields matching your C# public API
  public get minGold(): number {
    return this.goldRange ? this.goldRange.min : this.goldFixed ?? 0;
  }
  public get maxGold(): number {
    return this.goldRange ? this.goldRange.max : this.goldFixed ?? 0;
  }
  public get gold(): number {
    if (this.goldFixed != null) return this.goldFixed;
    if (this.goldRange) return randInt(this.goldRange.min, this.goldRange.max);
    return 0;
  }
  public get experience(): number {
    if (this.expFixed != null) return this.expFixed;
    if (this.expRange) return randLong(this.expRange.min, this.expRange.max);
    return 0;
  }

  constructor(args: {
    gold?: number | Range;
    exp?: number | Range;
    items?: QuestItemProperties[];
    restat?: boolean;
    reskill?: boolean;
    skillPoints?: number;
    job?: DefineJob | ((player: unknown) => DefineJob);
  }) {
    // gold
    if (typeof args.gold === "number") this.goldFixed = args.gold;
    else if (args.gold && typeof args.gold === "object")
      this.goldRange = args.gold;

    // exp
    if (typeof args.exp === "number") this.expFixed = args.exp;
    else if (args.exp && typeof args.exp === "object") this.expRange = args.exp;

    // items & flags
    this.items = Object.freeze(args.items ?? []);
    this.restat = args.restat ?? false;
    this.reskill = args.reskill ?? false;
    this.skillPoints = args.skillPoints ?? 0;

    // job reward (fixed or dynamic)
    if (typeof args.job === "function") this.rewardJobFn = args.job;
    else if (args.job) this.rewardJob = args.job;
  }

  public getJob(player: unknown): DefineJob | undefined {
    if (this.rewardJobFn) return this.rewardJobFn(player);
    return this.rewardJob;
  }

  public hasJobReward(): boolean {
    return Boolean(this.rewardJobFn || this.rewardJob);
  }
}
