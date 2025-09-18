export interface RateOptions {
  Gold: number;
  Drop: number;
  Experience: number;
}

export interface MessengerOptions {
  // TODO: Define messenger options based on requirements
}

export interface CustomizationOptions {
  // TODO: Define customization options based on requirements
}

export interface DropOptions {
  OwnershipTime: number;
}

export interface DefaultCharacterStats {
  Strength: number;
  Stamina: number;
  Dexterity: number;
  Intelligence: number;
}

export interface DefaultCharacterSection {
  Man: DefaultCharacterStats;
  Woman: DefaultCharacterStats;
}

export interface GameOptionsConfig {
  DeathPenalityEnabled: boolean;
  Rates: RateOptions;
  Messenger: MessengerOptions;
  Customization: CustomizationOptions;
  Drops: DropOptions;
  DefaultCharacter: DefaultCharacterSection;
}

/**
 * Singleton class for managing game configuration options.
 * Converted from C# Rhisis.Game.GameOptions class.
 */
export class GameOptions {
  private static _instance: GameOptions;
  private _config: GameOptionsConfig;

  private constructor() {
    // Initialize with default values
    this._config = {
      DeathPenalityEnabled: false,
      Rates: {
        Gold: 1,
        Drop: 1,
        Experience: 1
      },
      Messenger: {},
      Customization: {},
      Drops: {
        OwnershipTime: 30
      },
      DefaultCharacter: {
        Man: { Strength: 15, Stamina: 15, Dexterity: 15, Intelligence: 15 },
        Woman: { Strength: 15, Stamina: 15, Dexterity: 15, Intelligence: 15 }
      }
    };
  }

  public static get Instance(): GameOptions {
    if (!GameOptions._instance) {
      GameOptions._instance = new GameOptions();
    }
    return GameOptions._instance;
  }

  public get Current(): GameOptionsConfig {
    return this._config;
  }

  public get DeathPenalityEnabled(): boolean {
    return this._config.DeathPenalityEnabled;
  }

  public set DeathPenalityEnabled(value: boolean) {
    this._config.DeathPenalityEnabled = value;
  }

  public get Rates(): RateOptions {
    return this._config.Rates;
  }

  public set Rates(value: RateOptions) {
    this._config.Rates = value;
  }

  public get Messenger(): MessengerOptions {
    return this._config.Messenger;
  }

  public set Messenger(value: MessengerOptions) {
    this._config.Messenger = value;
  }

  public get Customization(): CustomizationOptions {
    return this._config.Customization;
  }

  public set Customization(value: CustomizationOptions) {
    this._config.Customization = value;
  }

  public get Drops(): DropOptions {
    return this._config.Drops;
  }

  public set Drops(value: DropOptions) {
    this._config.Drops = value;
  }

  public get DefaultCharacter(): DefaultCharacterSection {
    return this._config.DefaultCharacter;
  }

  public set DefaultCharacter(value: DefaultCharacterSection) {
    this._config.DefaultCharacter = value;
  }

  /**
   * Updates the configuration with new values
   */
  public updateConfig(partialConfig: Partial<GameOptionsConfig>): void {
    this._config = { ...this._config, ...partialConfig };
  }

  /**
   * Loads configuration from an external source
   */
  public loadConfig(config: GameOptionsConfig): void {
    this._config = config;
  }

  /**
   * Resets configuration to default values
   */
  public resetToDefaults(): void {
    const newInstance = new GameOptions();
    this._config = newInstance._config;
  }
}

// Export a convenience instance for global access
export const gameOptions = GameOptions.Instance;