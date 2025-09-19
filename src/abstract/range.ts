export class Range<TValue> {
  /// <summary>
  /// Gets the minimum value of the range.
  /// </summary>
  public readonly Minimum: TValue;

  /// <summary>
  /// Gets the maximum value of the range.
  /// </summary>
  public readonly Maximum: TValue;

  /// <summary>
  /// Creates a new Range{TValue} instance with a given range.
  /// </summary>
  /// <param name="minimum">Lower range bound.</param>
  /// <param name="maximum">Higher range bound.</param>
  constructor(minimum: TValue, maximum: TValue) {
    this.Minimum = minimum;
    this.Maximum = maximum;
  }

  /// <summary>
  /// Checks if the given value is inside the range.
  /// </summary>
  /// <param name="value">Current value.</param>
  /// <returns>True if the current value is inside the range; false otherwise.</returns>
  public IsInRange(value: TValue): boolean {
    // For simplicity, we'll assume TValue has comparison capabilities
    // In a full implementation, you'd want to constrain TValue to comparable types
    return (value as any) > (this.Minimum as any) && (value as any) < (this.Maximum as any);
  }
}

// Keep the old RangeHelper for backward compatibility
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
