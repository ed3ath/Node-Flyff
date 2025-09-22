import { JobType, JobMax } from "../definitions/defineJob";
import { SetExperienceSnapshot } from "../../protocol/snapshots/setExperience";
import { SetLevelSnapshot } from "../../protocol/snapshots/setLevel";
import { SetGrowthLearningPointSnapshot } from "../../protocol/snapshots/setGrowthLearningPoint";
import type { Player } from "../../entities/player";

export class Experience {
  private static readonly _experienceLevelLimits: Map<JobType, number> =
    new Map([
      [JobType.JTYPE_BASE, JobMax.MAX_JOB_LEVEL],
      [JobType.JTYPE_EXPERT, JobMax.MAX_JOB_LEVEL + JobMax.MAX_EXP_LEVEL],
      [JobType.JTYPE_PRO, JobMax.MAX_LEVEL],
      [JobType.JTYPE_MASTER, JobMax.MAX_LEVEL],
      [JobType.JTYPE_HERO, JobMax.MAX_LEGEND_LEVEL],
    ]);

  private _amount: number = 0;
  private _player: Player;

  constructor(player: Player) {
    this._player = player;
  }

  get amount(): number {
    return this._amount;
  }

  initialize(initialExperience: number): void {
    this._amount = initialExperience;
  }

  increase(
    amount: number,
    playerLevel: number,
    playerJobType: JobType,
    hasExpUpStopMode: boolean = false
  ): boolean {
    if (hasExpUpStopMode) {
      return false;
    }

    // TODO: experience to party
    const experience = this.calculateExtraExperience(amount);
    const hasLevelUp = this.giveExperienceToPlayer(
      experience,
      playerLevel,
      playerJobType
    );

    if (hasLevelUp) {
      // TODO: Regenerate health
      // player.health.regenerateAll();
      this.sendLevelUpPackets();
    }

    this.sendExperiencePacket(hasLevelUp);
    // TODO: send packet to friends, messenger, guild, couple, party, etc...

    return true;
  }

  decrease(amount: number, hasExpUpStopMode: boolean = false): boolean {
    if (hasExpUpStopMode) {
      return false;
    }

    throw new Error("Experience decrease not implemented");
  }

  applyDeathPenalty(playerLevel: number, sendToPlayer: boolean = true): void {
    // TODO: Check if death penalty is enabled in game options
    // if (GameOptions.Current.DeathPenalityEnabled) {
    //   const expLossPercent = GameResources.Current.Penalities.GetDecExpPenality(playerLevel);
    //
    //   if (expLossPercent <= 0) {
    //     return;
    //   }
    //
    //   this._amount -= this._amount * (expLossPercent / 100);
    //   // Set player death level
    //
    //   if (this._amount < 0) {
    //     // Check if level down penalty is enabled
    //     // If yes, decrease level and adjust experience
    //     // If no, set experience to 0
    //   }
    //
    //   if (sendToPlayer) {
    //     this.sendExperiencePacket(false);
    //   }
    // }
  }

  reset(): void {
    this._amount = 0;
  }

  /**
   * Give experience to a player and returns a boolean value that indicates if the player has level up.
   * @param experience Experience to give.
   * @param playerLevel Current player level.
   * @param playerJobType Current player job type.
   * @returns True if the player has level up; false otherwise.
   */
  private giveExperienceToPlayer(
    experience: number,
    playerLevel: number,
    playerJobType: JobType
  ): boolean {
    if (this.playerHasReachedMaxLevel(playerLevel, playerJobType)) {
      this._amount = 0;
      return false;
    }

    const nextLevel = playerLevel + 1;
    // TODO: Get next level experience table
    // const nextLevelExpTable = GameResources.Current.ExperienceTable.GetCharacterExp(nextLevel);
    this._amount += experience;

    // TODO: Check if player has enough experience to level up
    // if (this._amount >= nextLevelExpTable.exp) {
    //   const remainingExp = this._amount - nextLevelExpTable.exp;
    //
    //   this.processLevelUp(nextLevelExpTable.gp);
    //
    //   if (remainingExp > 0) {
    //     // Calling the method recursively to give XP after level up
    //     // if there is some remaining exp to give.
    //     this.giveExperienceToPlayer(remainingExp, playerLevel + 1, playerJobType);
    //   }
    //
    //   return true;
    // }

    return false;
  }

  /**
   * Calculates extra experience with scrolls, events, skill bonus, etc...
   * @param baseExperience Current experience.
   * @returns Base experience with extra experience.
   */
  private calculateExtraExperience(baseExperience: number): number {
    // TODO: add exp scrolls logic here
    return baseExperience;
  }

  /**
   * Checks if the player has reached the maximum level for its job.
   * @param playerLevel Current player level.
   * @param playerJobType Current player job type.
   * @returns True if the player has reached the maximum level for its job; false otherwise.
   */
  private playerHasReachedMaxLevel(
    playerLevel: number,
    playerJobType: JobType
  ): boolean {
    const limitLevel = Experience._experienceLevelLimits.get(playerJobType);
    if (!limitLevel) {
      return false;
    }

    return playerLevel >= limitLevel;
  }

  /**
   * Process the level up logic and reward attribution.
   * @param statPoints Statistics points.
   */
  private processLevelUp(statPoints: number): void {
    // TODO: Implement level up logic
    // - Increase player level
    // - Add skill points for level up
    // - Add stat points
    // - Reset experience
  }

  private sendExperiencePacket(sendLearningPoints: boolean): void {
    // Send experience update snapshot to player (like C# implementation)
    const playerSnapshots = new SetExperienceSnapshot(this._player);

    if (sendLearningPoints) {
      // Create combined snapshot with learning points
      const learningPointsSnapshot = new SetGrowthLearningPointSnapshot(this._player);
      // TODO: Implement snapshot merging for multiple snapshots
      this._player.send(learningPointsSnapshot);
    }

    this._player.send(playerSnapshots);
  }

  private sendLevelUpPackets(): void {
    // Send level up snapshot to visible players (like C# implementation)
    const levelSnapshot = new SetLevelSnapshot(this._player, this._player.level);
    this._player.sendToVisible(levelSnapshot);
  }
}
