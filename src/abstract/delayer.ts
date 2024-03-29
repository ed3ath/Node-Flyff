import { v4 as uuidv4 } from "uuid"; // Import uuidv4 for generating unique IDs

export class Delayer {
  private _delayedActions: Map<string, DelayedAction> = new Map();

  /** Delay an action using a time stamp as delay. */
  public delayAction(delayTime: number, action: () => void): string {
    const delayedActionId = uuidv4();
    const delayedAction = new DelayedAction(action, delayTime);

    this._delayedActions.set(delayedActionId, delayedAction);
    delayedAction.start();

    return delayedActionId;
  }

  /** Delay an action using seconds as time unit. */
  public delayActionSeconds(delaySeconds: number, action: () => void): string {
    return this.delayAction(delaySeconds * 1000, action);
  }

  /** Delay an action using milliseconds as time unit. */
  public delayActionMilliseconds(
    delayMilliseconds: number,
    action: () => void
  ): string {
    return this.delayAction(delayMilliseconds, action);
  }

  /** Cancels an action. */
  public cancelAction(delayedActionId: string): void {
    const delayedAction = this._delayedActions.get(delayedActionId);
    if (delayedAction) {
      delayedAction.cancel();
      this._delayedActions.delete(delayedActionId);
    }
  }

  /** Cancel all actions. */
  public cancelAllActions(): void {
    for (const [delayedActionId, delayedAction] of this._delayedActions) {
      delayedAction.cancel();
      this._delayedActions.delete(delayedActionId);
    }
  }
}

class DelayedAction {
  private _timerId: ReturnType<typeof setTimeout>;

  constructor(
    private _actionToExecute: () => void,
    private _delayTime: number
  ) {}

  public start(): void {
    this._timerId = setTimeout(() => {
      this._actionToExecute();
    }, this._delayTime);
  }

  /** Cancels the delayed action. */
  public cancel(): void {
    clearTimeout(this._timerId);
  }
}
