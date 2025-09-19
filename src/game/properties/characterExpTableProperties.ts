export class CharacterExpTableProperties {
  public readonly level: number;
  public readonly nextLevelExp: number;
  public readonly deathExp: number;
  public readonly betExp: number;
  public readonly nextDeathExp: number;

  constructor(level: number, experience: number, pxp: number, gp: number, limitExperience: number) {
    this.level = level;
    this.nextLevelExp = experience;
    this.deathExp = pxp;
    this.betExp = gp;
    this.nextDeathExp = limitExperience;
  }

  public equals(other: CharacterExpTableProperties): boolean {
    return (
      this.level === other.level &&
      this.nextLevelExp === other.nextLevelExp &&
      this.deathExp === other.deathExp &&
      this.betExp === other.betExp &&
      this.nextDeathExp === other.nextDeathExp
    );
  }

  public overrideEquals(obj: any): boolean {
    return obj instanceof CharacterExpTableProperties && this.equals(obj);
  }

  public getHashCode(): number {
    const str = `${this.level}-${this.nextLevelExp}-${this.deathExp}-${this.betExp}-${this.nextDeathExp}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  }
}