import { UpdateParamPointSnapshot } from "../../protocol/snapshots/updateParamPoint";
import { DefineAttributes } from "../definitions/defineAttributes";
import type { Player } from "../../entities/player";

export class Gold {
  private _amount: number = 0;
  private _player: Player;

  constructor(player: Player) {
    this._player = player;
  }

  /**
   * Gets the gold amount.
   */
  get amount(): number {
    return this._amount;
  }

  /**
   * Initialize the gold component.
   * @param initialGoldAmount Initial gold amount.
   */
  initialize(initialGoldAmount: number): void {
    this._amount = initialGoldAmount;
  }

  /**
   * Decrease the gold amount.
   * @param amount Amount of gold to remove.
   * @returns True if the gold amount has been decreased; false otherwise.
   */
  decrease(amount: number): boolean {
    this._amount = Math.max(this._amount - amount, 0);
    this.sendUpdatedGold();
    return true;
  }

  /**
   * Increases the gold amount.
   * @param amount Amount of gold to add.
   * @returns True if the gold amount has been increased; false otherwise.
   */
  increase(amount: number): boolean {
    // We cast player gold to number because otherwise it would use Int32 arithmetic and would overflow
    const gold = this._amount + amount;

    if (gold > Number.MAX_SAFE_INTEGER || gold < 0) { // Check gold overflow
      // TODO: Send defined text TID_GAME_TOOMANYMONEY_USE_PERIN
      // this.sendDefinedText(DefineText.TID_GAME_TOOMANYMONEY_USE_PERIN);
      return false;
    } else {
      this._amount = gold;
      this.sendUpdatedGold();
      // TODO: Send defined text with gold amounts
      // this.sendDefinedText(DefineText.TID_GAME_REAPMONEY, amount.toString(), this._amount.toString());
    }

    return true;
  }

  private sendUpdatedGold(): void {
    // Send gold update snapshot to player (like C# implementation)
    const goldUpdateSnapshot = new UpdateParamPointSnapshot(this._player, DefineAttributes.DST_GOLD, this._amount);
    this._player.send(goldUpdateSnapshot);
  }
}