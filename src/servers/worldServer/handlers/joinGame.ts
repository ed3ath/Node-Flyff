import { PacketType } from "../../../protocol/packetType";
import { SnapshotType } from "../../../protocol/snapshotType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import Account from "../../../database/account";
import Character from "../../../database/character";
import { Player } from "../../../entities/player";
import { MoverProperties, JobProperties } from "../../../interfaces/resource";
import { GameResources } from "../../../interfaces/resource";
import { Vector3 } from "../../../abstract/vector3";
import { AuthorityType } from "../../../types/authorityType";
import { GenderType } from "../../../types/genderType";
import { WorldMap } from "../../../game/world/worldMap";
import { Item } from "../../../game/mechanics/item";
import { ItemProperties } from "../../../game/properties/itemProperties";
import { ElementType } from "../../../types/elementType";
import { WorldUser } from "../worldUser";
import { JoinCompletePacket } from "../../../protocol/packets/joinCompletePacket";
import { EnvironmentAllSnapshot } from "../../../protocol/snapshots/environmentAll";
import { WorldReadInfoSnapshot } from "../../../protocol/snapshots/worldReadInfo";
import { AddObjectSnapshot } from "../../../protocol/snapshots/addObject";
import { TaskbarSnapshot } from "../../../protocol/snapshots/taskbar";

@SetPacketType(PacketType.JOIN)
export default class Handler extends PacketHandler {
  worldId: number;
  playerId: number;
  authenticationKey: number;
  partyId: number;
  guildId: number;
  guildWarId: number;
  idOfMulti: number;
  slot: number;
  playerName: string;
  username: string;
  password: string;
  messengerState: number;
  messengerCount: number;

  constructor(packet: FlyffPacket) {
    super();
    this.worldId = packet.readInt32();
    this.playerId = packet.readInt32();
    this.authenticationKey = packet.readInt32();
    this.partyId = packet.readInt32();
    this.guildId = packet.readInt32();
    this.guildWarId = packet.readInt32();
    this.idOfMulti = packet.readInt32(); // what is this?
    this.slot = packet.readByte();
    this.playerName = packet.readString();
    this.username = packet.readString();
    this.password = packet.readString();
    this.messengerState = packet.readInt32();
    this.messengerCount = packet.readInt32();
  }

  async execute(): Promise<void> {
    // Account validation (like C# AccountEntity userAccount = _accountDatabase.Accounts.SingleOrDefault)
    const accounts = this.server?.instance?.getEntity("Account");
    const userAccount = (await accounts?.findOne({
      where: {
        username: this.username,
        password: this.password,
      },
    })) as Account;

    if (!userAccount) {
      this.logger.warn(`Unable to join for user '${this.username}' Reason: bad presented credentials compared to the database.`);
      this.userConnection.disconnect();
      return;
    }

    // Player validation (like C# PlayerEntity player = _gameDatabase.Players.SingleOrDefault)
    const characters = this.server?.instance?.getEntity("Character");
    const player = (await characters?.findOne({
      where: {
        account: { id: userAccount.id },
        id: this.playerId,
        name: this.playerName,
      },
      relations: ["account", "equipments", "equipments.item"],
    })) as Character;

    if (!player) {
      this.logger.warn(`Unable to join for user '${this.username}' Reason: Cannot find player with id: '${this.playerId}' and name: '${this.playerName}'.`);
      this.userConnection.disconnect();
      return;
    }

    if (player.deleted) {
      this.logger.warn(`Unable to join for user '${this.username}' Reason: player '${player.name}' is deleted.`);
      this.userConnection.disconnect();
      return;
    }

    // Model ID calculation (like C# int modelId = player.Gender == 0 ? 11 : 12)
    const modelId = player.gender === 0 ? 11 : 12;

    // Map validation (like C# Map map = MapManager.Current.Get(player.MapId))
    const gameResources = this.server?.instance?.gameResources as GameResources;
    if (!gameResources) {
      this.logger.error(`Game resources not loaded for server instance`);
      this.userConnection.disconnect();
      return;
    }

    const mapResource = gameResources.mapResource;
    if (!mapResource?.maps?.at(player.mapId)) {
      throw new Error(`Failed to find map with id: '${player.mapId}'`);
    }

    const map = new WorldMap(mapResource.maps.at(player.mapId)!, gameResources);
    const layer = map.getDefaultLayer(); // TODO: Implement player.MapLayerId support

    // Get mover properties (like C# GameResources.Current.Movers.Get(modelId))
    const moverProperties: MoverProperties = this.getMoverProperties(modelId, player);

    // Get job properties (like C# GameResources.Current.Jobs.Get(player.JobId))
    const jobProperties = await gameResources.jobResources?.get(player.jobId);
    if (!jobProperties) {
      this.logger.error(`Job properties not found for jobId ${player.jobId}`);
      this.userConnection.disconnect();
      return;
    }

    // Create player entity (like C# User.Player = new Player(User, GameResources.Current.Movers.Get(modelId)))
    const playerData = {
      id: player.id,
      name: player.name,
      level: player.level || 1,
      loggedInAt: new Date(),
      slot: player.slot,
      authority: userAccount.authority as AuthorityType,
      job: jobProperties,
      appearence: {
        gender: player.gender === 0 ? GenderType.Male : GenderType.Female,
        skinSetId: player.skinSetId,
        faceId: player.faceId,
        hairColor: player.hairColor,
        hairId: player.hairId,
      },
      deathLevel: 0,
      mode: 0,
      availablePoints: player.statPoints || 0,
      skillPoints: player.skillPoints || 0,
    };

    const gamePlayer = new Player(this.userConnection, moverProperties, playerData);

    // Set player properties (like C# property assignments)
    (gamePlayer as any).position = new Vector3(player.positionX, player.positionY, player.positionZ);
    gamePlayer.map = map;
    gamePlayer.mapLayer = layer;
    (gamePlayer as any).rotationAngle = player.angle || 0;
    gamePlayer.level = player.level;
    (gamePlayer as any).modelId = modelId;
    (gamePlayer as any).objectState = "OBJSTA_STAND"; // ObjectState.OBJSTA_STAND

    // Set health properties (like C# User.Player.Health.Hp = player.Hp)
    if (gamePlayer.health) {
      gamePlayer.health.hp = player.hitPoints || gamePlayer.health.maxHp;
      gamePlayer.health.mp = player.manaPoints || gamePlayer.health.maxMp;
      gamePlayer.health.fp = player.fatiguePoints || gamePlayer.health.maxFp;
    }

    // Set statistics (like C# User.Player.Statistics.Strength = player.Strength)
    if (gamePlayer.statistics) {
      gamePlayer.statistics.strength = player.strength;
      gamePlayer.statistics.stamina = player.stamina;
      gamePlayer.statistics.dexterity = player.dexterity;
      gamePlayer.statistics.intelligence = player.intelligence;
    }

    // Initialize gold and experience (like C# User.Player.Gold.Initialize(player.Gold))
    if (gamePlayer.gold) {
      (gamePlayer.gold as any).initialize(player.gold);
    }
    if (gamePlayer.experience) {
      (gamePlayer.experience as any).initialize(player.experience);
    }

    // Load inventory from database (like C# Dictionary<int, Item> playerInventoryItems)
    const playerInventoryItems: { [slot: number]: Item } = {};
    // TODO: Implement proper PlayerItems loading from database like C#
    // For now, load equipment from equipments relation
    if (player.equipments) {
      for (const equipment of player.equipments) {
        if (equipment.item && equipment.slot !== undefined) {
          const itemProperties = await gameResources.itemResources?.get(equipment.item.itemId);
          if (itemProperties) {
            const item = new Item(this.createItemPropertiesFromResource(itemProperties));
            item.SerialNumber = equipment.item.serialNumber;
            item.Refine = equipment.item.refinement || 0;
            item.Element = equipment.item.element || ElementType.None;
            item.ElementRefine = equipment.item.elementRefinement || 0;
            item.Quantity = equipment.quantity;

            // Equipment slots start after inventory (42 + slot)
            playerInventoryItems[42 + equipment.slot] = item;
          }
        }
      }
    }

    // Initialize inventory (like C# User.Player.Inventory.Initialize(playerInventoryItems))
    if (Object.keys(playerInventoryItems).length > 0) {
      gamePlayer.inventory.initialize(playerInventoryItems);
    }

    // TODO: Load skills (like C# User.Player.Skills.SetSkills(skills))
    // Skip for now as it's not critical

    // TODO: Initialize quest diary (like C# comment)

    // Update defense (like C# User.Player.Defense.Update())
    if (gamePlayer.defense?.update) {
      gamePlayer.defense.update();
    }

    // TODO: Handle death penalty (like C# comment)

    // Send JOIN packet with snapshots (like C# using (JoinCompletePacket joinPacket = new()))
    const joinPacket = new JoinCompletePacket();
    joinPacket.addSnapshots(
      new EnvironmentAllSnapshot(gamePlayer, false), // isNight = false
      new WorldReadInfoSnapshot(gamePlayer),
      new AddObjectSnapshot(gamePlayer),
      new TaskbarSnapshot(gamePlayer)
    );

    this.userConnection.send(joinPacket);

    // Add player to layer (like C# layer.AddPlayer(User.Player))
    layer.addPlayer(gamePlayer);

    // Set player reference in WorldUser (like C# User.Player = player)
    const worldUser = this.userConnection as WorldUser;
    worldUser.setPlayer(gamePlayer);

    // Set spawned flag (like C# User.Player.IsSpawned = true)
    gamePlayer.isSpawned = true;

    this.logger.info(`Player ${gamePlayer.name} joined world successfully`);
  }

  /**
   * Get mover properties for the given model ID and player
   * Like C# GameResources.Current.Movers.Get(modelId)
   */
  private getMoverProperties(modelId: number, player: Character): MoverProperties {
    return {
      id: player.id,
      dwID: player.id.toString(),
      szName: player.name,
      dwAI: "AI_NONE",
      dwStr: player.strength,
      dwSta: player.stamina,
      dwDex: player.dexterity,
      dwInt: player.intelligence,
      dwHR: 0,
      dwER: 0,
      dwRace: "HUMAN",
      dwBelligerence: "",
      dwGender: player.gender?.toString() || "0",
      dwLevel: player.level,
      dwFlightLevel: 0,
      dwSize: 100,
      dwClass: 0,
      bIfPart: "",
      dwKarma: "",
      dwUseable: "",
      dwActionRadius: 0,
      dwAtkMin: 1,
      dwAtkMax: 1,
      dwAtk1: 0,
      dwAtk2: 0,
      dwAtk3: 0,
      dwHorizontalRate: 0,
      dwVerticalRate: 0,
      dwDiagonalRate: 0,
      dwThrustRate: 0,
      dwChestRate: 0,
      dwHeadRate: 0,
      dwArmRate: 0,
      dwLegRate: 0,
      dwAttackSpeed: 0,
      dwReAttackDelay: 0,
      dwAddHp: 0,
      dwAddMp: 0,
      dwNaturealArmor: 0,
      nAbrasion: 0,
      nHardness: 0,
      dwAdjAtkDelay: 0,
      eElementType: "",
      wElementAtk: 0,
      dwHideLevel: 0,
      fSpeed: 0.1,
      dwShelter: 0,
      bFlying: "",
      dwJumpIng: 0,
      dwAirJump: 0,
      bTaming: "",
      dwResisMagic: 0,
      fResistElecricity: 0,
      fResistFire: 0,
      fResistWind: 0,
      fResistWater: 0,
      fResistEarth: 0,
      dwCash: 0,
      dwSourceMaterial: 0,
      dwMaterialAmount: 0,
      dwCohesion: 0,
      dwHoldingTime: 0,
      dwCorrectionValue: 0,
      dwExpValue: 0,
      nFxpValue: 0,
      nBodyState: 0,
      dwAddAbility: 0,
      bKillable: "",
      dwVirtItem1: "",
      dwVirtType1: "",
      dwVirtItem2: "",
      dwVirtType2: "",
      dwVirtItem3: "",
      dwVirtType3: "",
      dwSndAtk1: 0,
      dwSndAtk2: 0,
      dwSndDie1: 0,
      dwSndDie2: 0,
      dwSndDmg1: 0,
      dwSndDmg2: 0,
      dwSndDmg3: 0,
      dwSndIdle1: 0,
      dwSndIdle2: 0,
      szComment: "",
      dwAreaColor: 0,
      szNpcMark: "",
      dwMadrigalGiftPoint: 0,
    };
  }

  /**
   * Convert resource ItemProperties to game ItemProperties class
   * Like C# new Item(GameResources.Current.Items.Get(itemId))
   */
  private createItemPropertiesFromResource(resourceItem: any): ItemProperties {
    return new ItemProperties({
      id: resourceItem.dwID,
      name: resourceItem.szName,
      identifierName: resourceItem.szName,
      parts: resourceItem.dwParts,
      isStackable: resourceItem.dwStackMax > 1,
      packMax: resourceItem.dwStackMax || 1,
      limitLevel: resourceItem.dwLevelLimit || 0,
      itemSex: resourceItem.dwItemSex || -1,
      itemJob: resourceItem.dwItemJob || -1,
      itemKind2: resourceItem.dwItemKind2 || 0,
      itemKind3: resourceItem.dwItemKind3 || 0,
      isUseable: resourceItem.dwUseable === 1,
      coolTime: resourceItem.dwCoolTime || 0,
      // Add other properties as needed
    });
  }
}
