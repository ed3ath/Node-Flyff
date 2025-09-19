import { DefineJob, JobType } from '../../game/definitions/defineJob';

export class JobProperties {
  public id: DefineJob;
  public attackSpeed: number;
  public maxHpFactor: number;
  public maxMpFactor: number;
  public maxFpFactor: number;
  public defenseFactor: number;
  public hpRecoveryFactor: number;
  public mpRecoveryFactor: number;
  public fpRecoveryFactor: number;
  public meleeSword: number;
  public meleeAxe: number;
  public meleeStaff: number;
  public meleeStick: number;
  public meleeKnuckle: number;
  public magicWand: number;
  public blocking: number;
  public meleeYoyo: number;
  public critical: number;
  public type: JobType;
  public parent: JobProperties | null;

  constructor(
    id: DefineJob,
    attackSpeed: number,
    maxHpFactor: number,
    maxMpFactor: number,
    maxFpFactor: number,
    defenseFactor: number,
    hpRecoveryFactor: number,
    mpRecoveryFactor: number,
    fpRecoveryFactor: number,
    meleeSword: number,
    meleeAxe: number,
    meleeStaff: number,
    meleeStick: number,
    meleeKnuckle: number,
    magicWand: number,
    blocking: number,
    meleeYoyo: number,
    critical: number,
    type: JobType,
    parent: JobProperties | null
  ) {
    this.id = id;
    this.attackSpeed = attackSpeed;
    this.maxHpFactor = maxHpFactor;
    this.maxMpFactor = maxMpFactor;
    this.maxFpFactor = maxFpFactor;
    this.defenseFactor = defenseFactor;
    this.hpRecoveryFactor = hpRecoveryFactor;
    this.mpRecoveryFactor = mpRecoveryFactor;
    this.fpRecoveryFactor = fpRecoveryFactor;
    this.meleeSword = meleeSword;
    this.meleeAxe = meleeAxe;
    this.meleeStaff = meleeStaff;
    this.meleeStick = meleeStick;
    this.meleeKnuckle = meleeKnuckle;
    this.magicWand = magicWand;
    this.blocking = blocking;
    this.meleeYoyo = meleeYoyo;
    this.critical = critical;
    this.type = type;
    this.parent = parent;
  }

  public isAnteriorJob(job: DefineJob): boolean {
    let jobData: JobProperties | null = this;

    while (jobData !== null) {
      if (jobData.id === job) {
        return true;
      }

      jobData = jobData.parent;
    }

    return false;
  }
}