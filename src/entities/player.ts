import { MapLayer } from "../abstract/mapLayer";
import { Vector3 } from "../abstract/vector3";
import { WorldObject } from "../abstract/worldObject";
import { AuthorityType } from "../common/authorityType";
import { DefineJob } from "../common/defineJob";
import { DefineSpecialEffects } from "../common/defineSpecialEffects";
import { DefineText } from "../common/defineText";
import { GenderType } from "../common/genderType";
import { MapItemType } from "../common/mapItemType";
import { ModeType } from "../common/modeType";
import { ObjectMessageType } from "../common/objectMessageType";
import { Skill } from "../common/skills";
import { MoverProperties, JobProperties } from "../interfaces/resource";
import { UserConnection } from "../libraries/tcpServer";
import { CreateSfxObjectSnapshot } from "../protocol/snapshots/createSfxObject";
import { Mover } from "./mover";

export class Player extends Mover {
    constructor(
        public readonly connection: UserConnection,
        properties: MoverProperties
    ) {
        super(properties);
        // this.inventory = new Inventory(this);
        // this.gold = new Gold(this);
        // this.experience = new Experience(this);
        // this.skills = new SkillTree(this);
        // this.questDiary = new QuestDiary(this);
        // this.taskbar = new Taskbar();
        // this.mailbox = new MailboxContainer(this);
    }

    id: number;
    loggedInAt: Date;
    slot: number;
    authority: AuthorityType;
    job: JobProperties;
    deathLevel: number;
    mode: ModeType[];
    // appearance: HumanVisualAppearance;
    // inventory: Inventory;
    // bank: BankSlot;
    // mailbox: MailboxContainer;
    // availablePoints: number;
    // skillPoints: number;
    // bankPin: number;
    // gold: Gold;
    // experience: Experience;
    // skills: SkillTree;
    // questDiary: QuestDiary;
    // currentShopName: string;
    // taskbar: Taskbar;

    update(): void {
        if (this.isDead || !this.isSpawned) {
            return;
        }

        if (!this.isFighting) {
            this.health.idleHeal();
        }

        this.lookAround();
        this.updateMoves();
    }

    lookAround(): void {
        if (!this.isSpawned || !this.isVisible) {
            return;
        }

        const currentVisibleEntities = MapLayer.getVisibleObjects(this);
        const appearingEntities = currentVisibleEntities.filter(entity => !this.visibleObjects.includes(entity));
        const disappearingEntities = this.visibleObjects.filter(entity => !currentVisibleEntities.includes(entity));

        if (appearingEntities.length > 0 || disappearingEntities.length > 0) {
            const snapshot = new FFSnapshot();

            for (const appearingObject of appearingEntities) {
                snapshot.merge(new AddObjectSnapshot(appearingObject, AddObjectSnapshot.PlayerAddObjMethodType.ExcludeItems));

                if (appearingObject instanceof Mover && appearingObject.isMoving) {
                    snapshot.merge(new DestPositionSnapshot(appearingObject));
                }

                this.addVisibleEntity(appearingObject);
            }

            for (const disappearingObject of disappearingEntities) {
                snapshot.merge(new DeleteObjectSnapshot(disappearingObject));
                this.removeVisibleEntity(disappearingObject);
            }

            this.send(snapshot);
        }
    }

    getEquippedItems(): Item[] {
        return this.inventory.getRange(Inventory.InventorySize, Inventory.InventoryEquipParts).map(slot => slot.item);
    }

    updateStatistics(strength: number, stamina: number, dexterity: number, intelligence: number): void {
        const total = strength + stamina + dexterity + intelligence;

        if (this.availablePoints <= 0 || total > this.availablePoints) {
            throw new Error(`${this.name} doesn't have enough statistic points.`);
        }

        if (strength > this.availablePoints || stamina > this.availablePoints ||
            dexterity > this.availablePoints || intelligence > this.availablePoints || total <= 0 ||
            total > ushort.MaxValue) {
            throw new Error("Statistics point bad calculation. (Hack attempt)");
        }

        this.statistics.strength += strength;
        this.statistics.stamina += stamina;
        this.statistics.dexterity += dexterity;
        this.statistics.intelligence += intelligence;
        this.availablePoints -= total;

        this.health.regenerateAll();
        this.defense.update();

        const setStateSnapshot = new SetStatisticsStateSnapshot(this);
        this.send(setStateSnapshot);
    }

    resetStatistics(): void {
        const defaultCharacter = this.appearance.gender === GenderType.Male ?
            GameOptions.Current.DefaultCharacter.Man :
            GameOptions.Current.DefaultCharacter.Woman;

        this.statistics.strength = defaultCharacter.strength;
        this.statistics.stamina = defaultCharacter.stamina;
        this.statistics.dexterity = defaultCharacter.dexterity;
        this.statistics.intelligence = defaultCharacter.intelligence;
        this.availablePoints = (this.level - 1) * 2;

        this.health.regenerateAll();
        this.defense.update();

        const setStateSnapshot = new SetStatisticsStateSnapshot(this);
        this.send(setStateSnapshot);
    }

    addSkillPoints(skillPointsToAdd: number, sendToPlayer = true): void {
        this.skillPoints += skillPointsToAdd;

        if (sendToPlayer) {
            const snapshot = new SetExperienceSnapshot(this);
            this.send(snapshot);
        }
    }

    resetSkills(): void {
        for (const skill of this.skills) {
            this.skillPoints += skill.level * SkillTree.SkillPointUsage[skill.properties.jobType];
            skill.level = 0;
        }
    }

    resetAvailableSkillPoints(): void {
        this.skillPoints = 0;
    }

    changeJob(job: DefineJob.Job): void {
        if (this.job.id === job) {
            return;
        }

        const jobProperties = GameResources.Current.Jobs.get(job);
        if (!jobProperties) {
            throw new Error(`Failed to find job '${job}'.`);
        }

        const jobSkills = GameResources.Current.Skills.getJobSkills(job);
        if (jobSkills.length > 0) {
            for (const skill of jobSkills) {
                this.skills.setSkill(new Skill(skill, this, 0));
            }
        }

        this.job = jobProperties;

        const snapshots = new FFSnapshot([
            new SetJobSkill(this),
            new CreateSfxObjectSnapshot(this, DefineSpecialEffects.XI_GEN_LEVEL_UP01)
        ]);

        this.sendToVisible(snapshots, true);
    }

    speak(message: string): void {
        const snapshot = new ChatSnapshot(this, message);
        this.sendToVisible(snapshot, true);
    }

    pickupItem(mapItem: MapItemObject, sendPickupMotion = true): void {
        if (mapItem.hasOwner && mapItem.owner !== this) {
            this.sendDefinedText(DefineText.TID_GAME_PRIORITYITEMPER, `"${mapItem.item.name}"`);
            return;
        }

        let itemPickedUp = false;

        if (mapItem.isGold) {
            itemPickedUp = this.gold.increase(mapItem.item.quantity);
        } else {
            itemPickedUp = this.inventory.createItem(mapItem.item) > 0;
            this.sendDefinedText(DefineText.TID_GAME_REAPITEM, `"${mapItem.item.name}"`);
        }

        if (itemPickedUp) {
            if (mapItem.itemType === MapItemType.QuestItem) {
                mapItem.despawn();
            } else {
                MapLayer.removeItem(mapItem);
            }
        }

        if (sendPickupMotion) {
            const motionSnapshot = new MotionSnapshot(this, ObjectMessageType.OBJMSG_PICKUP);
            this.sendToVisible(motionSnapshot, true);
        }
    }

    teleport(mapId: number, position: Vector3, sendToPlayer = true): void {
        const setPlayerPosition = (newPosition: Vector3): void => {
            this.unfollow();
            this.stopMoving();
            this.position.copy(newPosition);
        };

        if (this.map.id === mapId) {
            if (!this.map.isInBounds(position)) {
                throw new Error(`Attempt to teleport '${this.name}' to an invalid position: ${position} in map: '${this.map.name}'.`);
            }

            setPlayerPosition(position);

            const snapshots = new FFSnapshot([
                new SetPositionSnapshot(this),
                new WorldReadInfoSnapshot(this)
            ]);
            this.sendToVisible(snapshots, sendToPlayer);
        } else {
            const destinationMap = MapManager.Current.get(mapId);
            if (!destinationMap) {
                throw new Error(`Cannot teleport to map with id: '${mapId}'. Map not found.`);
            }

            if (!destinationMap.isInBounds(position)) {
                throw new Error(`Attempt to teleport '${this.name}' to an invalid position: ${position} in map: '${destinationMap.name}'.`);
            }

            this.isSpawned = false;
            MapLayer.removePlayer(this);

            setPlayerPosition(position);

            this.map = destinationMap;
            this.mapLayer = destinationMap.getDefaultLayer();
            this.mapLayer.addPlayer(this);

            if (sendToPlayer) {
                const snapshots = new FFSnapshot([
                    new ReplaceSnapshot(this),
                    new WorldReadInfoSnapshot(this),
                    new AddObjectSnapshot(this)
                ]);

                this.send(snapshots);
            }

            this.isSpawned = true;
        }
    }

    onTargetKilled(target: Mover): void {
        if (target instanceof Player) {
            // TODO: PK
        } else if (target instanceof Monster) {
            this.experience.increase(target.properties.experience * GameOptions.Current.Rates.Experience);
            this.questDiary.onMonsterKilled(target);
        }
    }

    onKilled(killer: Mover): void {
        super.onKilled(killer);
    }

    dispose(): void {
        for (const visibleObject of this.visibleObjects) {
            if (!(visibleObject instanceof Player)) {
                visibleObject.visibleObjects.remove(this);
            }
        }

        MapLayer.removePlayer(this);
    }

    protected onArrived(): void {
        if (this.isFollowing && this.followTarget instanceof MapItemObject) {
            this.pickupItem(this.followTarget);
            this.unfollow();
        }
    }

    cancelSkillUsage(): void {
        const snapshot = new ClearUseSkillSnapshot(this);
        this.sendToVisible(snapshot, true);
    }

    sendSnoopMessage(message: string): void {
        const snapshot = new SnoopSnapshot(message);
        this.send(snapshot);
    }

    private addVisibleEntity(entity: WorldObject): void {
        if (!this.visibleObjects.includes(entity)) {
            this.visibleObjects.push(entity);
        }

        if (!(entity instanceof Player) && !entity.visibleObjects.includes(this)) {
            entity.visibleObjects.push(this);
        }
    }

    private removeVisibleEntity(entity: WorldObject): void {
        if (this.visibleObjects.includes(entity)) {
            this.visibleObjects.remove(entity);
        }

        if (entity.visibleObjects.includes(this)) {
            entity.visibleObjects.remove(this);
        }
    }
}
