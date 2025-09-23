import { Rectangle } from "../../abstract/rectangle";

/// <summary>
/// Represents the properties of a map region.
/// </summary>
export class MapRegionProperties extends Rectangle {
    /// <summary>
    /// Creates a new MapRegionProperties instance.
    /// </summary>
    /// <param name="x">Top left corner X coordinate.</param>
    /// <param name="z">Top left corner Z coordinate.</param>
    /// <param name="width">Region width.</param>
    /// <param name="length">Region length.</param>
    public constructor(x: number, z: number, width: number, length: number) {
        super(x, z, width, length);
    }
}
