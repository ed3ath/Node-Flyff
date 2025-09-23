import { PenaltyProperties } from './penaltyProperties';

export class DeathPenaltyProperties {
  public revivalPenalty: PenaltyProperties[];
  public decExpPenalty: PenaltyProperties[];
  public levelDownPenalty: PenaltyProperties[];

  constructor(
    revivalPenalty: PenaltyProperties[],
    decExpPenalty: PenaltyProperties[],
    levelDownPenalty: PenaltyProperties[]
  ) {
    this.revivalPenalty = revivalPenalty;
    this.decExpPenalty = decExpPenalty;
    this.levelDownPenalty = levelDownPenalty;
  }
}