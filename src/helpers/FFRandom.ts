class FFRandom {
    private static _syncLock: object = {};
    private static _id: number = 0;

    /**
     * Do a random between integers
     * @param min Minimum value (inclusive)
     * @param max Maximum value (inclusive)
     * @returns Random integer between min and max
     */
    public static random(min: number, max: number): number {
        return Math.floor(min + Math.random() * (max - min + 1));
    }

    /**
     * Gets a random floating number.
     * @returns Random floating number between 0 and 1
     */
    public static floatRandom(): number {
        return Math.random();
    }

    /**
     * Do a random between floats
     * @param f1 Minimum value
     * @param f2 Maximum value
     * @returns Random floating number between f1 and f2
     */
    public static floatRandomBetween(f1: number, f2: number): number {
        return (f2 - f1) * Math.random() + f1;
    }

    /**
     * Do a random between long values
     * @param min Minimum value (inclusive)
     * @param max Maximum value (inclusive)
     * @returns Random long between min and max
     */
    public static longRandom(min: number, max: number): number {
        return Math.floor(min + Math.random() * (max - min + 1));
    }

    /**
     * Generates a unique id.
     * @returns Unique id
     */
    public static generateUniqueId(): number {
        if (!this._syncLock) {
            this._syncLock = {};
        }

        if (!this._id) {
            this._id = 0;
        }

        this._id++;
        return this._id;
    }
}

export { FFRandom };
