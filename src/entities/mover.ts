import { WorldObject } from "../abstract/worldObject";

class Mover extends WorldObject {
    // private _speedFactor: number = 1;
    // private _destinationPosition: Vector3 = new Vector3();
    // private _level: number = 0;
    // private _isFighting: boolean = false;
    // private _health: Health;
    // private _attributes: Attributes;
    // private _statistics: Statistics;
    // private _followTarget: WorldObject | null = null;
    // private _followDistance: number = 0;
    // private _target: Mover | null = null;
    // private _defense: Defense;
    // private _delayer: Delayer = new Delayer();
    // private _projectiles: ProjectileList = new ProjectileList();
    // private _buffs: Buffs;

    // constructor(properties: MoverProperties) {
    //     super();
    //     this._health = new Health(this);
    //     this._attributes = new Attributes(this);
    //     this._statistics = new Statistics(this);
    //     this._defense = new Defense(this);
    //     this._buffs = new Buffs(this);
    // }

    // get speed(): number {
    //     return (this.properties.speed + (this.attributes.get(DefineAttributes.DST_SPEED) / 100)) * this._speedFactor;
    // }

    // get destinationPosition(): Vector3 {
    //     return this._destinationPosition;
    // }

    // set destinationPosition(position: Vector3) {
    //     this._destinationPosition = position;
    // }

    // get level(): number {
    //     return this._level;
    // }

    // set level(level: number) {
    //     this._level = level;
    // }

    // get isDead(): boolean {
    //     return this._health.hp <= 0;
    // }

    // get isMoving(): boolean {
    //     return (this.objectState & ObjectState.OBJSTA_MOVE_ALL) !== 0 && !this._destinationPosition.isZero();
    // }

    // get isFighting(): boolean {
    //     return this._isFighting;
    // }

    // set isFighting(value: boolean) {
    //     this._isFighting = value;
    // }

    // get health(): Health {
    //     return this._health;
    // }

    // get attributes(): Attributes {
    //     return this._attributes;
    // }

    // get statistics(): Statistics {
    //     return this._statistics;
    // }

    // get followTarget(): WorldObject | null {
    //     return this._followTarget;
    // }

    // set followTarget(target: WorldObject | null) {
    //     this._followTarget = target;
    // }

    // get isFollowing(): boolean {
    //     return this._followTarget !== null;
    // }

    // get followDistance(): number {
    //     return this._followDistance;
    // }

    // set followDistance(distance: number) {
    //     this._followDistance = distance;
    // }

    // get target(): Mover | null {
    //     return this._target;
    // }

    // set target(target: Mover | null) {
    //     this._target = target;
    // }

    // get defense(): Defense {
    //     return this._defense;
    // }

    // get delayer(): Delayer {
    //     return this._delayer;
    // }

    // get projectiles(): ProjectileList {
    //     return this._projectiles;
    // }

    // get buffs(): Buffs {
    //     return this._buffs;
    // }

    // move(x: number, y: number, z: number): void {
    //     this.objectState |= ObjectState.OBJSTA_FMOVE;
    //     this.objectState &= ~ObjectState.OBJSTA_STAND;
    //     this._destinationPosition = new Vector3(x, y, z);
    //     this.rotationAngle = Vector3.angleBetween(this.position, this._destinationPosition);
    //     // Send packet logic goes here
    // }

    // stopMoving(): void {
    //     this.objectState &= ~ObjectState.OBJSTA_FMOVE;
    //     this.objectState |= ObjectState.OBJSTA_STAND;
    //     this._destinationPosition.reset();
    //     this.onArrived();
    //     // Send stop turn and stand motion messages
    // }

    // follow(target: WorldObject, distance: number = 1): void {
    //     this._followTarget = target;
    //     this._followDistance = distance;
    //     this._destinationPosition.copy(target.position);
    //     this.objectState &= ~ObjectState.OBJSTA_STAND;
    //     this.objectState |= ObjectState.OBJSTA_FMOVE;
    //     // Send follow snapshot
    // }

    // unfollow(): void {
    //     this._followTarget = null;
    //     this._followDistance = 0;
    // }

    // onArrived(): void {
    //     // Handle arrival logic
    // }

    // onSufferDamages(attacker: Mover, damages: number, attackFlags: AttackFlags): void {
    //     // Handle damage logic
    // }

    // onKilled(killer: Mover): void {
    //     // Handle kill logic
    // }

    // onTargetKilled(target: Mover): void {
    //     // Handle target killed logic
    // }

    // Other methods...
}
