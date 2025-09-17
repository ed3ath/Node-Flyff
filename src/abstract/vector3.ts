import { FFRandom } from "../helpers/FFRandom";
import { Rectangle } from "./rectangle";

export class Vector3 {
    private static readonly EPSILON = 0.01;

    x: number;
    y: number;
    z: number;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get length(): number {
        return Math.sqrt(this.squaredLength);
    }

    get squaredLength(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    getDistance2D(otherPosition: Vector3): number {
        return Math.sqrt(Math.pow(otherPosition.x - this.x, 2) + Math.pow(otherPosition.z - this.z, 2));
    }

    getDistance3D(otherPosition: Vector3): number {
        return Math.sqrt(Math.pow(otherPosition.x - this.x, 2) + Math.pow(otherPosition.y - this.y, 2) + Math.pow(otherPosition.z - this.z, 2));
    }

    isInCircle(otherPosition: Vector3, circleRadius: number): boolean {
        return Math.pow(otherPosition.x - this.x, 2) + Math.pow(otherPosition.z - this.z, 2) < Math.pow(circleRadius, 2);
    }

    isInRange(otherPosition: Vector3, range: number): boolean {
        const distance = this.clone().subtract(otherPosition).setY(0);
        if (distance.squaredLength > range * range) {
            return false;
        }
        return true;
    }

    intersects(rectangle: Rectangle, radius: number): boolean {
        const deltaX = this.x - Math.max(rectangle.x, Math.min(this.x, rectangle.x + rectangle.width));
        const deltaY = this.z - Math.max(rectangle.z, Math.min(this.z, rectangle.z + rectangle.length));
        return deltaX * deltaX + deltaY * deltaY < radius * radius;
    }

    normalize(): Vector3 {
        const sqLength = this.squaredLength;
        if (sqLength <= 0) {
            throw new Error("Cannot normalize a vector of zero length.");
        }
        return this.divide(Math.sqrt(sqLength));
    }

    clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    reset(): void {
        this.x = this.y = this.z = 0;
    }

    copy(otherVector: Vector3): void {
        this.x = otherVector.x;
        this.y = otherVector.y;
        this.z = otherVector.z;
    }

    isZero(): boolean {
        return this.squaredLength <= 0;
    }

    toString(): string {
        return `Vector3: ${this.x}:${this.y}:${this.z}`;
    }

    hashCode(): number {
        return FFRandom.getHashCode(this.x) ^ FFRandom.getHashCode(this.y) ^ FFRandom.getHashCode(this.z);
    }

    equals(other: Vector3 | null): boolean {
        if (!other) return false;
        return Math.abs(this.x - other.x) < Vector3.EPSILON &&
               Math.abs(this.y - other.y) < Vector3.EPSILON &&
               Math.abs(this.z - other.z) < Vector3.EPSILON;
    }

    static dotProduct(a: Vector3, b: Vector3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    static crossProduct(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(
            a.y * b.z - a.z * b.y,
            a.z * b.x - a.x * b.z,
            a.x * b.y - a.y * b.x
        );
    }

    static angleBetween(a: Vector3, b: Vector3): number {
        const dist = b.subtract(a);
        let angle = Math.atan2(dist.x, -dist.z);
        angle = Vector3.toDegree(angle);
        if (angle < 0) {
            angle += 360;
        } else if (angle >= 360) {
            angle -= 360;
        }
        return angle;
    }

    static getRandomPositionInCircle(center: Vector3, radius: number): Vector3 {
        const newVector = center.clone();
        const angle = FFRandom.floatRandomBetween(0, 360) * Math.PI / 180;
        const power = FFRandom.floatRandomBetween(0, radius);
        newVector.x += Math.sin(angle) * power;
        newVector.z += Math.cos(angle) * power;
        return newVector;
    }

    static distance2D(from: Vector3, to: Vector3): number {
        const x = from.x - to.x;
        const z = from.z - to.z;
        return Math.sqrt(x * x + z * z);
    }

    static distance3D(from: Vector3, to: Vector3): number {
        const x = from.x - to.x;
        const y = from.y - to.y;
        const z = from.z - to.z;
        return Math.sqrt(x * x + y * y + z * z);
    }

    static toDegree(radian: number): number {
        return radian * (180 / Math.PI);
    }

    static toRadian(degree: number): number {
        return degree * (Math.PI / 180);
    }

    add(other: Vector3): Vector3 {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }

    subtract(other: Vector3): Vector3 {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }

    multiply(value: number): Vector3 {
        this.x *= value;
        this.y *= value;
        this.z *= value;
        return this;
    }

    divide(value: number): Vector3 {
        this.x /= value;
        this.y /= value;
        this.z /= value;
        return this;
    }

    setX(x: number): Vector3 {
        this.x = x;
        return this;
    }

    setY(y: number): Vector3 {
        this.y = y;
        return this;
    }

    setZ(z: number): Vector3 {
        this.z = z;
        return this;
    }

    static equals(a: Vector3 | null, b: Vector3 | null): boolean {
        if (a === null && b === null) return true;
        if (a === null || b === null) return false;
        return a.equals(b);
    }
}
