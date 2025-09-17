import { Projectile } from "./projectile";

export class ProjectileList {
    private _projectiles: Map<number, Projectile> = new Map();
    private _projectileCounter: number = 1;

    /** Gets the number of active projectiles. */
    public get count(): number {
        return this._projectiles.size;
    }

    /** Adds a new projectile. */
    public add(projectile: Projectile): number {
        const projectileId = this._projectileCounter++;
        this._projectiles.set(projectileId, projectile);
        return projectileId;
    }

    /** Removes the projectile identified by the given value. */
    public remove(projectileId: number): void {
        this._projectiles.delete(projectileId);
    }

    /** Gets the projectile identified by the given id. */
    public get(projectileId: number): Projectile | undefined {
        return this._projectiles.get(projectileId);
    }

    /** Clears the projectiles. */
    public clear(): void {
        this._projectiles.clear();
        this._projectileCounter = 1;
    }
}
