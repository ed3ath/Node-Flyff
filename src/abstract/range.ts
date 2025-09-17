export class RangeHelper<TValue extends number | string | Date> {
  public readonly minimum: TValue;

  public readonly maximum: TValue;
  constructor(minimum: TValue, maximum: TValue) {
    this.minimum = minimum;
    this.maximum = maximum;
  }

  public isInRange(value: TValue): boolean {
    return value > this.minimum && value < this.maximum;
  }
}
