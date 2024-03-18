// import { FFUserConnection } from './FFUserConnection';
// import { Mover } from './Mover';
// import { FlyffPacket } from './FlyffPacket';
// import { HumanVisualAppearance } from './HumanVisualAppearance';
// import { Inventory } from './Inventory';
// import { BankSlot } from './BankSlot';
// import { MailboxContainer } from './MailboxContainer';
// import { Gold } from './Gold';
// import { Experience } from './Experience';
// import { SkillTree } from './SkillTree';
// import { QuestDiary } from './QuestDiary';
// import { Taskbar } from './Taskbar';
// import { DefineJob } from './DefineJob';
// import { DefineText } from './DefineText';
// import { ChatSnapshot } from './ChatSnapshot';
// import { MotionSnapshot } from './MotionSnapshot';
// import { SetPositionSnapshot } from './SetPositionSnapshot';
// import { WorldReadInfoSnapshot } from './WorldReadInfoSnapshot';
// import { ReplaceSnapshot } from './ReplaceSnapshot';
// import { AddObjectSnapshot } from './AddObjectSnapshot';
// import { ClearUseSkillSnapshot } from './ClearUseSkillSnapshot';
// import { SnoopSnapshot } from './SnoopSnapshot';

class Player extends Mover {
    private readonly _connection: FFUserConnection;

    public Id: number;
    public LoggedInAt: Date;
    public Slot: number;
    // public Authority: AuthorityType;
    // public Job: JobProperties;
    // public DeathLevel: number;
    // public Mode: ModeType;
    // public Appearance: HumanVisualAppearance;
    // public Inventory: Inventory;
    // public Bank: BankSlot;
    // public Mailbox: MailboxContainer;
    // public AvailablePoints: number;
    // public SkillPoints: number;
    // public BankPin: number;
    // public Gold: Gold;
    // public Experience: Experience;
    // public Skills: SkillTree;
    // public QuestDiary: QuestDiary;
    // public CurrentShopName: string;
    // public Taskbar: Taskbar;

    constructor(connection: FFUserConnection, properties: MoverProperties) {
        super(properties);
        this._connection = connection;
        // this.Inventory = new Inventory(this);
        // this.Gold = new Gold(this);
        // this.Bank = new BankSlot(this);
        // this.Experience = new Experience(this);
        // this.Skills = new SkillTree(this);
        // this.QuestDiary = new QuestDiary(this);
        // this.Taskbar = new Taskbar();
        // this.Mailbox = new MailboxContainer(this);
    }

    // public update(): void {
    //     if (this.isDead || !this.isSpawned) {
    //         return;
    //     }

    //     if (!this.isFighting) {
    //         this.health.idleHeal();
    //     }

    //     this.lookAround();
    //     this.updateMoves();
    // }

    // public lookAround(): void {
    //     if (!this.isSpawned || !this.isVisible) {
    //         return;
    //     }

    //     const currentVisibleEntities: WorldObject[] = MapLayer.getVisibleObjects(this);
    //     const appearingEntities: WorldObject[] = currentVisibleEntities.filter(entity => !this.visibleObjects.includes(entity));
    //     const disappearingEntities: WorldObject[] = this.visibleObjects.filter(entity => !currentVisibleEntities.includes(entity));

    //     if (appearingEntities.length > 0 || disappearingEntities.length > 0) {
    //         const snapshot = new FFSnapshot();

    //         appearingEntities.forEach(appearingObject => {
    //             snapshot.merge(new AddObjectSnapshot(appearingObject, AddObjectSnapshot.PlayerAddObjMethodType.ExcludeItems));

    //             if (appearingObject instanceof Mover && appearingObject.isMoving) {
    //                 snapshot.merge(new DestPositionSnapshot(appearingObject));
    //             }

    //             this.addVisibleEntity(appearingObject);
    //         });

    //         disappearingEntities.forEach(disappearingObject => {
    //             snapshot.merge(new DeleteObjectSnapshot(disappearingObject));
    //             this.removeVisibleEntity(disappearingObject);
    //         });

    //         this.send(snapshot);
    //     }
    // }

    // public getEquipedItems(): Item[] {
    //     return this.Inventory.getRange(this.Inventory.InventorySize, this.Inventory.InventoryEquipParts).map(x => x.Item);
    // }

    // public updateStatistics(strength: number, stamina: number, dexterity: number, intelligence: number): void {
    //     const total: number = strength + stamina + dexterity + intelligence;

    //     if (this.AvailablePoints <= 0 || total > this.AvailablePoints) {
    //         throw new Error(`${this.Name} doesn't have enough statistic points.`);
    //     }

    //     if (strength > this.AvailablePoints || stamina > this.AvailablePoints ||
    //         dexterity > this.AvailablePoints || intelligence > this.AvailablePoints || total <= 0 ||
    //         total > ushort.MaxValue) {
    //         throw new Error('Statistics point bad calculation. (Hack attempt)');
    //     }

    //     this.Statistics.Strength += strength;
    //     this.Statistics.Stamina += stamina;
    //     this.Statistics.Dexterity += dexterity;
    //     this.Statistics.Intelligence += intelligence;
    //     this.AvailablePoints -= total;

    //     this.Health.regenerateAll();
    //     this.Defense.update();

    //     const setStateSnapshot = new SetStatisticsStateSnapshot(this);
    //     this.send(setStateSnapshot);
    // }

    // public resetStatistics(): void {
    //     const defaultCharacter = this.Appearance.Gender == GenderType.Male ?
    //         GameOptions.Current.DefaultCharacter.Man :
    //         GameOptions.Current.DefaultCharacter.Woman;

    //     this.Statistics.Strength = defaultCharacter.Strength;
    //     this.Statistics.Stamina = defaultCharacter.Stamina;
    //     this.Statistics.Dexterity = defaultCharacter.Dexterity;
    //     this.Statistics.Intelligence = defaultCharacter.Intelligence;
    //     this.AvailablePoints = (this.Level - 1) * 2;

    //     this.Health.regenerateAll();
    //     this.Defense.update();

    //     const setStateSnapshot = new SetStatisticsStateSnapshot(this);
    //     this.send(setStateSnapshot);
    // }

    // public addSkillPoints(skillPointsToAdd: number, sendToPlayer: boolean = true): void {
    //     this.SkillPoints += skillPointsToAdd;

    //     if (sendToPlayer) {
    //         const snapshot = new SetExperienceSnapshot(this);
    //         this.send(snapshot);
    //     }
    // }

    // public resetSkills(): void {
    //     this.Skills.forEach(skill => {
    //         this.SkillPoints += skill.Level * SkillTree.SkillPointUsage[skill.Properties.JobType];
    //         skill.Level = 0;
    //     });
    // }

    // public resetAvailableSkillPoints(): void {
    //     this.SkillPoints = 0;
    // }

    // public changeJob(job: DefineJob.Job): void {
    //     if (this.Job.Id == job) {
    //         return;
    //     }

    //     const jobProperties = GameResources.Current.Jobs.get(job) || throw new Error(`Failed to find job '${job}'.`);
    //     const jobSkills = GameResources.Current.Skills.getJobSkills(job);

    //     if (jobSkills.length > 0) {
    //         jobSkills.forEach(skill => {
    //             this.Skills.setSkill(new Skill(skill, this, 0));
    //         });
    //     }

    //     this.Job = jobProperties;

    //     const snapshots = new FFSnapshot([
    //         new SetJobSkill(this),
    //         new CreateSfxObjectSnapshot(this, DefineSpecialEffects.XI_GEN_LEVEL_UP01)
    //     ]);

    //     this.sendToVisible(snapshots, true);
    // }

    // public speak(message: string): void {
    //     const snapshot = new ChatSnapshot(this, message);
    //     this.sendToVisible(snapshot, true);
    // }
}

export { Player };
