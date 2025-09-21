import _ from "lodash";

import { PacketType } from "../../../protocol/packetType";
import { SnapshotType } from "../../../protocol/snapshotType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { FlyffSnapshot } from "../../../libraries/snapshot";
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
import { EnvironmentAllSnapshot } from "../../../protocol/snapshots/environmentAll";
import { WorldReadInfoSnapshot } from "../../../protocol/snapshots/worldReadInfo";
import { AddObjectSnapshot } from "../../../protocol/snapshots/addObject";
import { TaskbarSnapshot } from "../../../protocol/snapshots/taskbar";
import { QueryPlayerDataSnapshot } from "../../../protocol/snapshots/queryPlayerData";
import { AddFriendGameJoinSnapshot } from "../../../protocol/snapshots/addFriendGameJoin";
import { WorldMap } from "../../../game/world/worldMap";
import { Item } from "../../../game/mechanics/item";
import { ItemProperties } from "../../../game/properties/itemProperties";
import { ElementType } from "../../../types/elementType";
import { WorldPacketLogger } from "../../../helpers/worldPacketLogger";
import { ServerPacket } from "../../../libraries/serverPacket";
import { JoinCompletePacket } from "../../../libraries/joinCompletePacket";
import { AddObjectServerSnapshot } from "../../../protocol/snapshots/addObjectServer";
import { WorldUser } from "../worldUser";

@SetPacketType(PacketType.JOIN)
export default class Handler extends PacketHandler {
  channelId: number;
  characterId: number;
  authKey: number;
  partyId: number;
  guildId: number;
  guildWarId: number;
  idOfMulti: number;
  slot: number;
  characterName: string;
  username: string;
  password: string;
  messengerState: number;
  messengerCount: number;

  constructor(packet: FlyffPacket) {
    super();
    this.channelId = packet.readInt32LE();
    this.characterId = packet.readInt32LE();
    this.authKey = packet.readInt32LE();
    this.partyId = packet.readInt32LE();
    this.guildId = packet.readInt32LE();
    this.guildWarId = packet.readInt32LE();
    this.idOfMulti = packet.readInt32LE(); // what is this?
    this.slot = packet.readByte();
    this.characterName = packet.readString();
    this.username = packet.readString();
    this.password = packet.readString();
    this.messengerState = packet.readInt32LE();
    this.messengerCount = packet.readInt32LE();
  }

  /**
   * Convert resource ItemProperties interface to game ItemProperties class
   * Similar to how C# Rhisis converts between resource data and game objects
   */
  private createItemPropertiesFromResource(resourceProps: import("../../../interfaces/resource").ItemProperties): ItemProperties {
    // Convert string/number values to proper types based on resource data
    const itemKind1 = this.parseItemKind1(resourceProps.dwItemKind1);
    const itemKind2 = this.parseItemKind2(resourceProps.dwItemKind2);
    const itemKind3 = this.parseItemKind3(resourceProps.dwItemKind3);
    const itemJob = this.parseJobType(resourceProps.dwItemJob);
    const parts = this.parseItemPartType(resourceProps.dwParts);
    const element = this.parseElementType(resourceProps.eItemType);
    const weaponKind = this.parseWeaponKind(resourceProps.dwWeaponType);

    return new ItemProperties(
      resourceProps.ver6 || 1, // version
      resourceProps.id, // id
      resourceProps.dwID || `ITEM_${resourceProps.id}`, // identifierName
      resourceProps.szName || `Item ${resourceProps.id}`, // name
      resourceProps.szNameId || resourceProps.szName || `Item ${resourceProps.id}`, // nameKey
      resourceProps.dwPackMax || 1, // packMax
      itemKind1, // itemKind1
      itemKind2, // itemKind2
      itemKind3, // itemKind3
      itemJob, // itemJob
      resourceProps.dwItemSex || 0, // itemSex
      resourceProps.dwCost || 0, // cost
      resourceProps.dwLimitLevel1 || 0, // limitLevel
      parts, // parts
      resourceProps.dwAbilityMin || 0, // abilityMin
      resourceProps.dwAbilityMax || 0, // abilityMax
      element, // element
      resourceProps.dwItemLV || 0, // level
      resourceProps.dwItemRare || 0, // rare
      resourceProps.dwAttackSpeed || 0, // attackSpeed
      resourceProps.dwDestParam1 || "", // destParam1
      resourceProps.dwDestParam2 || "", // destParam2
      resourceProps.dwDestParam3 || "", // destParam3
      resourceProps.nAdjParamVal1 || 0, // adjustParam1
      resourceProps.nAdjParamVal2 || 0, // adjustParam2
      resourceProps.nAdjParamVal3 || 0, // adjustParam3
      resourceProps.dwCircleTime || 0, // circleTime
      resourceProps.dwUseable || false, // isUseable
      this.parseSfxNumber(resourceProps.dwSfxObj), // sfxObject
      this.parseSfxNumber(resourceProps.dwSfxObj2), // sfxObject2
      this.parseSfxNumber(resourceProps.dwSfxObj3), // sfxObject3
      this.parseSfxNumber(resourceProps.dwSfxObj4), // sfxObject4
      this.parseSfxNumber(resourceProps.dwSfxObj5), // sfxObject5
      resourceProps.bPermanence || false, // isPermanant
      0, // coolTime (not in resource props)
      resourceProps.dwWeaponType || 0, // weaponTypeId
      resourceProps.dwItemAtkOrder1 || 0, // itemAtkOrder1
      resourceProps.dwItemAtkOrder2 || 0, // itemAtkOrder2
      resourceProps.dwItemAtkOrder3 || 0, // itemAtkOrder3
      resourceProps.dwItemAtkOrder4 || 0, // itemAtkOrder4
      resourceProps.dwSkillReadyType || 0, // skillReadyType
      weaponKind, // weaponKind
      resourceProps.dwAddSkillMin || 0, // attackSkillMin
      resourceProps.dwAddSkillMax || 0, // attackSkillMax
      new Map() // params - TODO: implement parameter parsing if needed
    );
  }

  // Helper methods to parse string values to enum types
  private parseItemKind1(value?: string): number { return 0; } // TODO: implement proper parsing
  private parseItemKind2(value?: string): number { return 0; } // TODO: implement proper parsing
  private parseItemKind3(value?: string): number { return 0; } // TODO: implement proper parsing
  private parseJobType(value?: string): number { return 0; } // TODO: implement proper parsing
  private parseItemPartType(value?: string): number { return 0; } // TODO: implement proper parsing
  private parseElementType(value?: string): ElementType { return ElementType.None; } // TODO: implement proper parsing
  private parseWeaponKind(value?: number): number { return value || 0; }
  private parseSfxNumber(value?: string): number {
    if (!value || value === "" || value === "NULL") return 0;
    const parsed = parseInt(value);
    return isNaN(parsed) ? 0 : parsed;
  }

  async execute(): Promise<void> {
    this.logger.info(`JOIN received from user: ${this.username}`);
    this.logger.info(`  Channel ID: ${this.channelId}`);
    this.logger.info(`  Character ID: ${this.characterId}`);
    this.logger.info(`  Character Name: ${this.characterName}`);
    this.logger.info(`  Auth Key: ${this.authKey}`);
    this.logger.info(`  Party ID: ${this.partyId}`);
    this.logger.info(`  Guild ID: ${this.guildId}`);
    this.logger.info(`  Slot: ${this.slot}`);

    // Note: authKey can be 0 in current implementation, so don't reject on that basis
    this.logger.info(`JOIN_GAME authKey validation: ${this.authKey} (allowing 0 for now)`);

    // TODO: Implement proper authKey validation when cluster-world authentication is fully implemented

    const accounts = this.server?.instance?.getEntity("Account");
    const userAccount = (await accounts?.findOne({
      where: {
        username: this.username,
        password: this.password,
      },
    })) as Account;

    if (!userAccount) {
      this.logger.warn(
        `Unable to join for user '${this.username}' Reason: bad presented credentials compared to the database.`
      );
      return this.userConnection.disconnect();
    }

    this.logger.info(`Account validation successful for user: ${this.username} (Account ID: ${userAccount.id})`);

    // Get player character - find by characterId and account, name is optional validation
    const characters = this.server?.instance?.getEntity("Character");
    let character = (await characters?.findOne({
      where: {
        account: {
          id: userAccount.id,
        },
        id: this.characterId,
      },
      relations: ["account", "equipments", "equipments.item"],
    })) as Character;

    // If character not found by ID, try to find by name as fallback
    if (!character && this.characterName) {
      character = (await characters?.findOne({
        where: {
          account: {
            id: userAccount.id,
          },
          name: this.characterName,
        },
        relations: ["account", "equipments", "equipments.item"],
      })) as Character;

      if (character) {
        this.logger.info(
          `Found character by name '${this.characterName}' instead of ID ${this.characterId}`
        );
        this.characterId = character.id; // Update characterId to match found character
      }
    }

    if (!character) {
      this.logger.warn(
        `Unable to join for user '${this.username}' Reason: Cannot find player with id: '${this.characterId}' and name: '${this.characterName}'.`
      );
      return this.userConnection.disconnect();
    }

    this.logger.info(`Character validation successful: ${character.name} (ID: ${character.id}) for user: ${this.username}`);

    // Validate character name if provided by client (optional check)
    if (
      this.characterName &&
      this.characterName.trim() &&
      character.name !== this.characterName
    ) {
      this.logger.warn(
        `Character name mismatch for user '${this.username}': expected '${character.name}', got '${this.characterName}'`
      );
      // Don't disconnect for name mismatch, just log it - prioritize character ID
    }

    if (character.deleted) {
      this.logger.warn(
        `Unable to join for user '${this.username}' Reason: player '${character.name}' is deleted.`
      );
      return this.userConnection.disconnect();
    }

    // Set user connection info (like C# User.Player = new Player(User, ...))
    this.userConnection.userId = character.account.id;
    this.userConnection.username = character.account.username;

    // Ensure initial position if defaults are zero (like C# default pos)
    if (
      character.positionX === 0 &&
      character.positionY === 0 &&
      character.positionZ === 0
    ) {
      character.positionX = 12345; // Example for WI_WORLD_MADRIGAL
      character.positionY = 6789;
      character.positionZ = 0;
      character.mapId = 1;
      await characters?.update(character.id, {
        positionX: character.positionX,
        positionY: character.positionY,
        positionZ: character.positionZ,
        mapId: character.mapId,
      });
      this.logger.info(`Set initial spawn position for ${character.name}`);
    }

    // Load resources (like C# GameResources.Current)
    const gameResources = this.server?.instance?.gameResources as GameResources;
    if (!gameResources) {
      this.logger.error(`Game resources not loaded for server instance`);
      return this.userConnection.disconnect();
    }

    // Load job properties (like C# GameResources.Current.Jobs.Get(player.JobId))
    let jobProperties: JobProperties | undefined;
    try {
      const jobResult = await gameResources.jobResources?.get(character.jobId);
      jobProperties = jobResult || undefined;
    } catch (error) {
      this.logger.error(
        `Failed to load job properties for jobId ${character.jobId}: ${error}`
      );
      return this.userConnection.disconnect();
    }

    if (!jobProperties) {
      this.logger.error(
        `Job properties not found for jobId ${character.jobId} - character: ${character.name}`
      );
      return this.userConnection.disconnect();
    }

    // Create position vector (like C# new Vector3(player.PosX, player.PosY, player.PosZ))
    const position = new Vector3(
      character.positionX,
      character.positionY,
      character.positionZ
    );

    // Basic MoverProperties (extend as needed, like C# GameResources.Current.Movers.Get(modelId))
    const moverProperties: MoverProperties = {
      id: character.id,
      dwID: character.id.toString(),
      szName: character.name,
      dwAI: "AI_NONE",
      dwStr: character.strength,
      dwSta: character.stamina,
      dwDex: character.dexterity,
      dwInt: character.intelligence,
      dwHR: 0,
      dwER: 0,
      dwRace: "HUMAN",
      dwBelligerence: "",
      dwGender: character.gender?.toString() || "0",
      dwLevel: character.level,
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

    // Create player entity (like C# new Player(User, Mover))
    const playerData = {
      id: character.id,
      name: character.name, // CRITICAL: Add player name
      level: character.level || 1, // CRITICAL: Add player level
      loggedInAt: new Date(),
      slot: character.slot,
      authority: AuthorityType.Player, // Default authority
      job: jobProperties,
      appearance: {
        gender: character.gender === 1 ? GenderType.Female : GenderType.Male,
        hairId: character.hairId || 0,
        hairColor: character.hairColor || 0,
        faceId: character.faceId || 0,
        skinSetId: character.skinSetId || 0,
      },
      deathLevel: 0,
      mode: [],
      availablePoints: character.statPoints || 0,
      skillPoints: character.skillPoints || 0,
    };

    const player = new Player(this.userConnection, moverProperties, playerData);

    // Log player creation details
    WorldPacketLogger.logPlayerCreation(
      {
        characterName: character.name,
        characterId: character.id,
        level: character.level,
        position: { x: character.positionX, y: character.positionY, z: character.positionZ },
        mapId: character.mapId,
        gender: character.gender,
        jobId: character.jobId
      },
      {
        addHp: moverProperties.addHp,
        addMp: moverProperties.addMp,
        playerHp: player.health?.hp,
        playerMp: player.health?.mp,
        playerMaxHp: player.health?.maxHp,
        playerMaxMp: player.health?.maxMp,
        isDead: player.isDead
      }
    );

    // Set player reference in WorldUser (like C# User.Player = player)
    const worldUser = this.userConnection as WorldUser;
    worldUser.setPlayer(player);

    // Set additional properties
    player.name = character.name;
    player.level = character.level;
    player.position.copy(position);
    (player as any).mapId = character.mapId; // Set mapId for WorldReadInfoSnapshot
    player.isSpawned = true;

    // Set stats if available (like C# Statistics.Strength = player.Strength)
    if (player.statistics) {
      player.statistics.strength = character.strength;
      player.statistics.stamina = character.stamina;
      player.statistics.dexterity = character.dexterity;
      player.statistics.intelligence = character.intelligence;
    }
    // Set Health.Hp/Mp/Fp from DB like C# (use defaults since fields are commented out)
    if (player.health) {
      player.health.hp = player.health.maxHp; // character.hitPoints not available
      player.health.mp = player.health.maxMp; // character.manaPoints not available
      player.health.fp = player.health.maxFp; // character.fatiguePoints not available
    }

    // Initialize Gold from DB like C#
    if (character.gold !== undefined && player.gold) {
      // Set initial gold value
      (player.gold as any).amount = character.gold;
    }

    // Initialize Experience from DB like C#
    if (character.experience !== undefined && player.experience) {
      (player.experience as any).currentExp = character.experience;
      (player.experience as any).currentLevel = character.level;
    }

    // Load inventory from equipments relation (like C# Dictionary<int, Item> playerInventoryItems)
    if (character.equipments && character.equipments.length > 0) {
      for (const equipment of character.equipments) {
        if (equipment.item && equipment.slot !== undefined) {
          try {
            // Load proper ItemProperties from game resources (like C# GameResources.Current.Items.Get(itemId))
            const resourceItemProperties = await gameResources.itemResources?.get(equipment.item.itemId);

            if (!resourceItemProperties) {
              this.logger.warn(`Item properties not found for item ID ${equipment.item.itemId} - skipping equipment slot ${equipment.slot}`);
              continue;
            }

            // Convert resource ItemProperties to game ItemProperties class (like C# constructor)
            const itemProperties = this.createItemPropertiesFromResource(resourceItemProperties);
            const item = new Item(itemProperties);

            // Set the additional properties from database (like C# Item constructor)
            item.Quantity = equipment.quantity || 1;
            item.Refine = equipment.item.refinement || 0;
            item.Element = equipment.item.element || ElementType.None;
            item.ElementRefine = equipment.item.elementRefinement || 0;
            item.SerialNumber = equipment.item.serialNumber || 0;
            item.CreatorId = undefined;

            // Set item directly in inventory map (like C# player.Inventory.CreateItem)
            (player.inventory as any).items.set(equipment.slot, item);

            this.logger.info(`Loaded item: ${resourceItemProperties.szName} (ID: ${equipment.item.itemId}) in slot ${equipment.slot}`);
          } catch (error) {
            this.logger.error(`Failed to load item ${equipment.item.itemId} for player ${character.name}: ${error}`);
            // Continue without this item rather than failing the entire login
          }
        }
      }
    }

    // Initialize skills (like C# skills = GameResources.Current.Skills.GetJobSkills)
    // Skip skills loading for now as it's not critical for basic world connection
    this.logger.info(`Skipping skills loading for ${character.name} - not critical for world connection`);

    // Update defense like C# player.Defense.Update()
    if (player.defense && player.defense.update) {
      player.defense.update();
    }

    // Add to world map layer (like C# layer.AddPlayer(User.Player))
    const mapResource = gameResources.mapResource;

    if (mapResource && mapResource.maps && mapResource.maps.at(character.mapId)) {
      const mapProperties = mapResource.maps.at(character.mapId);

      if (mapProperties) {
        try {
          // Get or create WorldMap instance - in a full implementation, this should be
          // managed by a map manager to ensure single instance per map
          const worldMap = new WorldMap(mapProperties);
          const layer = worldMap.getDefaultLayer();

          // Set player's map reference
          player.map = worldMap;
          player.mapLayer = layer;

          // Add player to layer
          layer.addPlayer(player);

          this.logger.info(`Added ${character.name} to map ${character.mapId} layer (Layer ID: ${layer.id})`);
        } catch (error) {
          this.logger.error(`Failed to add player ${character.name} to map layer: ${error}`);
          // Continue without map layer - not critical for basic connection
        }
      } else {
        this.logger.warn(`Map properties not found for map ${character.mapId}`);
      }
    } else {
      this.logger.warn(
        `Map ${character.mapId} not found in map resources - player ${character.name} will spawn without map layer`
      );
    }

    // Send PACKETTYPE_JOIN response first (like C++ OnJoin expects)
    try {
      this.logger.info(`Creating JOIN response packet for character: ${character.name}`);

      // Log current player state before sending packets
      WorldPacketLogger.logJoinGameSteps('BEFORE_JOIN_RESPONSE', {
        characterName: character.name,
        playerHp: player.health?.hp,
        playerMaxHp: player.health?.maxHp,
        isDead: player.isDead,
        level: player.level,
        position: player.position
      });

      // Send JOIN packet with embedded snapshots like C# Rhisis (replaces separate JOIN response)
      this.logger.info(`Creating JOIN packet with embedded snapshots for ${character.name}:`);

      // === COMPREHENSIVE PACKET DATA LOGGING ===
      this.logger.info(`[PACKET DATA] ========== JOIN PACKET DATA BREAKDOWN ==========`);
      this.logger.info(`[PACKET DATA] Player Information:`);
      this.logger.info(`[PACKET DATA]   - Character Name: "${character.name}"`);
      this.logger.info(`[PACKET DATA]   - Character ID: ${character.id}`);
      this.logger.info(`[PACKET DATA]   - Account ID: ${character.account.id}`);
      this.logger.info(`[PACKET DATA]   - Username: "${character.account.username}"`);
      this.logger.info(`[PACKET DATA]   - Player Object ID: ${player.objectId}`);
      this.logger.info(`[PACKET DATA]   - Level: ${character.level}`);
      this.logger.info(`[PACKET DATA]   - Job ID: ${character.jobId}`);
      this.logger.info(`[PACKET DATA]   - Gender: ${character.gender} (0=Male, 1=Female)`);
      this.logger.info(`[PACKET DATA]   - Map ID: ${character.mapId}`);
      this.logger.info(`[PACKET DATA]   - Position: (${character.positionX}, ${character.positionY}, ${character.positionZ})`);
      this.logger.info(`[PACKET DATA]   - Health: ${player.health?.hp}/${player.health?.maxHp} HP`);
      this.logger.info(`[PACKET DATA]   - Mana: ${player.health?.mp}/${player.health?.maxMp} MP`);
      this.logger.info(`[PACKET DATA]   - Stats: STR=${character.strength}, STA=${character.stamina}, DEX=${character.dexterity}, INT=${character.intelligence}`);
      this.logger.info(`[PACKET DATA]   - Gold: ${character.gold || 0}`);
      this.logger.info(`[PACKET DATA]   - Experience: ${character.experience || 0}`);
      this.logger.info(`[PACKET DATA] ================================================`);

      // FIXED: Create JOIN packet directly with ServerPacket to avoid inheritance issues
      const joinPacket = new ServerPacket();
      joinPacket.writeUInt32LE(PacketType.JOIN);
      joinPacket.writeUInt32LE(0); // Not used (C# line 18)

      this.logger.info(`[PACKET DATA] JOIN Packet Header:`);
      this.logger.info(`[PACKET DATA]   - Packet Type: ${PacketType.JOIN} (0x${PacketType.JOIN.toString(16).toUpperCase()})`);
      this.logger.info(`[PACKET DATA]   - Unused Field: 0`);

      // Prepare snapshot data with proper headers (ObjectId + SnapshotType + Data)
      const snapshots: Buffer[] = [];

      // Snapshot 1: EnvironmentAll (Type: 0x0063)
      const envSnapshot = new ServerPacket();
      envSnapshot.writeUInt32LE(player.objectId); // Object ID
      envSnapshot.writeUInt16LE(SnapshotType.ENVIRONMENT_ALL); // ENVIRONMENTALL snapshot type
      const season = 0; // Season (0 = none/normal)
      envSnapshot.writeInt32LE(season);
      snapshots.push(envSnapshot.getBuffer().subarray(5)); // Remove packet header

      this.logger.info(`[PACKET DATA] Snapshot 1 - EnvironmentAll:`);
      this.logger.info(`[PACKET DATA]   - Object ID: ${player.objectId}`);
      this.logger.info(`[PACKET DATA]   - Snapshot Type: ${SnapshotType.ENVIRONMENT_ALL} (0x${SnapshotType.ENVIRONMENT_ALL.toString(16).toUpperCase()})`);
      this.logger.info(`[PACKET DATA]   - Season: ${season} (0=Normal, 1=Spring, 2=Summer, 3=Fall, 4=Winter)`);
      this.logger.info(`[PACKET DATA]   - Data Size: ${envSnapshot.getBuffer().subarray(5).length} bytes`);

      // Snapshot 2: WorldReadInfo (Type: 0x9910)
      const worldInfoSnapshot = new ServerPacket();
      worldInfoSnapshot.writeUInt32LE(player.objectId); // Object ID
      worldInfoSnapshot.writeUInt16LE(SnapshotType.WORLD_READINFO); // WORLD_READINFO snapshot type
      const mapId = character.mapId || 1;
      worldInfoSnapshot.writeInt32LE(mapId); // Map ID
      worldInfoSnapshot.writeSingleLE(character.positionX); // Position X
      worldInfoSnapshot.writeSingleLE(character.positionY); // Position Y
      worldInfoSnapshot.writeSingleLE(character.positionZ); // Position Z
      snapshots.push(worldInfoSnapshot.getBuffer().subarray(5)); // Remove packet header

      this.logger.info(`[PACKET DATA] Snapshot 2 - WorldReadInfo:`);
      this.logger.info(`[PACKET DATA]   - Object ID: ${player.objectId}`);
      this.logger.info(`[PACKET DATA]   - Snapshot Type: ${SnapshotType.WORLD_READINFO} (0x${SnapshotType.WORLD_READINFO.toString(16).toUpperCase()})`);
      this.logger.info(`[PACKET DATA]   - Map ID: ${mapId}`);
      this.logger.info(`[PACKET DATA]   - Position X: ${character.positionX} (float)`);
      this.logger.info(`[PACKET DATA]   - Position Y: ${character.positionY} (float)`);
      this.logger.info(`[PACKET DATA]   - Position Z: ${character.positionZ} (float)`);
      this.logger.info(`[PACKET DATA]   - Data Size: ${worldInfoSnapshot.getBuffer().subarray(5).length} bytes`);

      // Snapshot 3: AddObject (Type: 0x00F0)
      const addObjectSnapshot = new ServerPacket();
      addObjectSnapshot.writeUInt32LE(player.objectId); // Object ID
      addObjectSnapshot.writeUInt16LE(SnapshotType.ADD_OBJ); // ADD_OBJ snapshot type

      // CRITICAL FIX: Add missing ObjectType and ModelIndex that C++ client expects
      const objectType = 5; // OT_MOVER = 5 for players (from C++ defines)
      const modelIndex = player.appearance?.gender === 1 ? 12 : 11; // MI_FEMALE = 12, MI_MALE = 11
      addObjectSnapshot.writeByte(objectType); // (BYTE)pCtrl->GetType()
      addObjectSnapshot.writeUInt32LE(modelIndex); // pCtrl->GetIndex()

      // Add the actual AddObject serialized data
      const addObjectData = new AddObjectServerSnapshot(player).getData();
      addObjectSnapshot.writeBytes(addObjectData);
      snapshots.push(addObjectSnapshot.getBuffer().subarray(5)); // Remove packet header

      this.logger.info(`[PACKET DATA] Snapshot 3 - AddObject:`);
      this.logger.info(`[PACKET DATA]   - Object ID: ${player.objectId}`);
      this.logger.info(`[PACKET DATA]   - Snapshot Type: 0x00F0 (ADD_OBJ)`);
      this.logger.info(`[PACKET DATA]   - Object Type: ${objectType} (OT_MOVER for players)`);
      this.logger.info(`[PACKET DATA]   - Model Index: ${modelIndex} (${player.appearance?.gender === 1 ? 'MI_FEMALE' : 'MI_MALE'})`);
      this.logger.info(`[PACKET DATA]   - Player Gender: ${player.appearance?.gender} (${player.appearance?.gender === 1 ? 'Female' : 'Male'})`);
      this.logger.info(`[PACKET DATA]   - Serialized Data Size: ${addObjectData.length} bytes`);
      this.logger.info(`[PACKET DATA]   - Total AddObject Size: ${addObjectSnapshot.getBuffer().subarray(5).length} bytes`);

      // Snapshot 4: Taskbar (Type: 0x0097) - Add basic taskbar
      const taskbarSnapshot = new ServerPacket();
      taskbarSnapshot.writeUInt32LE(player.objectId); // Object ID
      taskbarSnapshot.writeUInt16LE(SnapshotType.TASKBAR); // TASKBAR snapshot type
      // Basic empty taskbar data (player starts with empty taskbar)
      const taskbarSlots = 20;
      for (let i = 0; i < taskbarSlots; i++) { // 20 taskbar slots
        taskbarSnapshot.writeUInt32LE(0); // Empty slot
        taskbarSnapshot.writeUInt32LE(0); // Empty slot type
      }
      snapshots.push(taskbarSnapshot.getBuffer().subarray(5)); // Remove packet header

      this.logger.info(`[PACKET DATA] Snapshot 4 - Taskbar:`);
      this.logger.info(`[PACKET DATA]   - Object ID: ${player.objectId}`);
      this.logger.info(`[PACKET DATA]   - Snapshot Type: ${SnapshotType.TASKBAR} (0x${SnapshotType.TASKBAR.toString(16).toUpperCase()})`);
      this.logger.info(`[PACKET DATA]   - Taskbar Slots: ${taskbarSlots} (all empty)`);
      this.logger.info(`[PACKET DATA]   - Data per Slot: 8 bytes (4 bytes slot ID + 4 bytes slot type)`);
      this.logger.info(`[PACKET DATA]   - Total Taskbar Data: ${taskbarSlots * 8} bytes`);
      this.logger.info(`[PACKET DATA]   - Data Size: ${taskbarSnapshot.getBuffer().subarray(5).length} bytes`);

      this.logger.info(`✓ Created ${snapshots.length} snapshots: EnvironmentAll, WorldReadInfo, AddObject (Fixed: ObjectType=${objectType}, ModelIndex=${modelIndex}), Taskbar`);

      // Write snapshot count and all snapshot data
      joinPacket.writeUInt16LE(snapshots.length); // Snapshot count (C# line 19)

      this.logger.info(`[PACKET DATA] Snapshot Assembly:`);
      this.logger.info(`[PACKET DATA]   - Total Snapshots: ${snapshots.length}`);

      // Write all snapshot data (C# lines 21-28)
      let totalSnapshotBytes = 0;
      for (let i = 0; i < snapshots.length; i++) {
        const snapshotData = snapshots[i];
        joinPacket.writeBytes(snapshotData);
        totalSnapshotBytes += snapshotData.length;
        this.logger.info(`[PACKET DATA]   - Snapshot ${i + 1} Size: ${snapshotData.length} bytes`);
      }

      this.logger.info(`[PACKET DATA]   - Total Snapshot Data: ${totalSnapshotBytes} bytes`);
      this.logger.info(`✓ Added all ${snapshots.length} snapshots to JOIN packet`);

      // Finalize the JOIN packet
      const finalizedJoinPacket = joinPacket.finalize();

      // === COMPREHENSIVE FINAL PACKET LOGGING ===
      this.logger.info(`[PACKET DATA] ========== FINAL JOIN PACKET SUMMARY ==========`);
      this.logger.info(`[PACKET DATA] Final Packet Information:`);
      this.logger.info(`[PACKET DATA]   - Total Packet Size: ${finalizedJoinPacket.length} bytes`);
      this.logger.info(`[PACKET DATA]   - Packet Header: 0x5E (FlyFF packet header)`);
      this.logger.info(`[PACKET DATA]   - Length Field: ${finalizedJoinPacket.readUInt32LE(1)} bytes (data after length field)`);
      const packetTypeValue = finalizedJoinPacket.readUInt32LE(5);
      this.logger.info(`[PACKET DATA]   - Packet Type: ${packetTypeValue} (PacketType.JOIN = ${PacketType.JOIN})`);
      this.logger.info(`[PACKET DATA]   - Unused Field: ${finalizedJoinPacket.readUInt32LE(9)}`);
      this.logger.info(`[PACKET DATA]   - Snapshot Count: ${finalizedJoinPacket.readUInt16LE(13)}`);
      this.logger.info(`[PACKET DATA]   - Total Snapshot Data: ${totalSnapshotBytes} bytes`);
      this.logger.info(`[PACKET DATA] ================================================`);

      this.logger.info(`Sending FIXED JOIN packet with embedded snapshots to client for character: ${character.name} with ${finalizedJoinPacket.length} bytes`);

      // === RAW PACKET LOGGING FOR C++ CLIENT COMPARISON ===
      this.logger.info(`[RAW PACKET DEBUG] FIXED JOIN packet structure:`);
      this.logger.info(`[RAW PACKET DEBUG] Packet Length: ${finalizedJoinPacket.length} bytes`);
      this.logger.info(`[RAW PACKET DEBUG] Full Hex Dump: ${finalizedJoinPacket.toString('hex').toUpperCase()}`);

      // Break down the packet structure for easier debugging
      this.logger.info(`[RAW PACKET DEBUG] FIXED Packet Structure Breakdown:`);
      this.logger.info(`[RAW PACKET DEBUG] Header (1 byte): 0x${finalizedJoinPacket.subarray(0, 1).toString('hex').toUpperCase()}`);
      this.logger.info(`[RAW PACKET DEBUG] Length Field (4 bytes): 0x${finalizedJoinPacket.subarray(1, 5).toString('hex').toUpperCase()} = ${finalizedJoinPacket.readUInt32LE(1)} bytes`);
      this.logger.info(`[RAW PACKET DEBUG] Packet Type (4 bytes): 0x${finalizedJoinPacket.subarray(5, 9).toString('hex').toUpperCase()} = ${packetTypeValue} (PacketType.JOIN = ${PacketType.JOIN})`);
      this.logger.info(`[RAW PACKET DEBUG] Unused Field (4 bytes): 0x${finalizedJoinPacket.subarray(9, 13).toString('hex').toUpperCase()}`);
      this.logger.info(`[RAW PACKET DEBUG] Snapshot Count (2 bytes): 0x${finalizedJoinPacket.subarray(13, 15).toString('hex').toUpperCase()} = ${finalizedJoinPacket.readUInt16LE(13)}`);
      this.logger.info(`[RAW PACKET DEBUG] Snapshot Data (${totalSnapshotBytes} bytes): 0x${finalizedJoinPacket.subarray(15).toString('hex').toUpperCase()}`);

      // Verify no double header
      this.logger.info(`[RAW PACKET DEBUG] First 20 bytes: ${finalizedJoinPacket.subarray(0, 20).toString('hex').toUpperCase()}`);

      // === SAVE RAW PACKET DATA TO world_packets.log FOR LATER ANALYSIS ===
      WorldPacketLogger.logRawJoinPacket(character.name, finalizedJoinPacket, packetTypeValue, PacketType.JOIN);
      this.logger.info(`[RAW PACKET DEBUG] FIXED packet data logged to world_packets.log for C++ comparison`);

      // Send the FIXED JOIN packet with embedded snapshots
      this.userConnection.sendBuffer(finalizedJoinPacket, PacketType.JOIN);

      this.logger.info(`✓ World snapshot sent successfully to ${character.name}`);

      // Set player as spawned (like C# User.Player.IsSpawned = true)
      player.isSpawned = true;

      this.logger.success(
        `✓ Character ${character.name} (ID: ${character.id}) joined world server successfully! AuthKey: ${this.authKey}, Channel: ${this.channelId}`
      );
      this.logger.success(`✓ Player spawned in world at position (${character.positionX}, ${character.positionY}, ${character.positionZ}) on map ${character.mapId}`);
    } catch (error) {
      this.logger.error(
        `Failed to send JOIN response for ${character.name}: ${error}`
      );
      return this.userConnection.disconnect();
    }
  }
}
