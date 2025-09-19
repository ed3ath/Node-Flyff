import { DefineJob, JobType } from '../../game/definitions/defineJob';

export class JobDefinitionProperties {
  public parent: DefineJob | null;
  public type: JobType;

  constructor(parent: DefineJob | null, type: JobType) {
    this.parent = parent;
    this.type = type;
  }
}