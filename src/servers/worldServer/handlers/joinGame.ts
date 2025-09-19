import _ from "lodash";

import { PacketType } from "../../../protocol/packetType";
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

  async execute(): Promise<void> {
    this.logger.info(`JOIN received from user: ${this.username}`);
    this.logger.info(`  Channel ID: ${this.channelId}`);
    this.logger.info(`  Character ID: ${this.characterId}`);
    this.logger.info(`  Character Name: ${this.characterName}`);
    this.logger.info(`  Auth Key: ${this.authKey}`);
    this.logger.info(`  Party ID: ${this.partyId}`);
    this.logger.info(`  Guild ID: ${this.guildId}`);
    this.logger.info(`  Slot: ${this.slot}`);

    // First validate authKey - this should match what was provided by cluster server
    // For development/testing, we'll log but not reject zero authKeys
    // if (!this.authKey || this.authKey === 0) {
    //   this.logger.warn(
    //     `JOIN_GAME received with invalid or missing authKey (${this.authKey}) for user '${this.username}' - proceeding for testing`
    //   );
    //   // In production, you should uncomment the line below:
    //   // return this.userConnection.disconnect();
    // }

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
          // TODO: Load proper ItemProperties from game resources
          // For now, create ItemProperties using constructor with defaults
          const itemProperties = new ItemProperties(
            1, // version
            equipment.item.itemId,
            "Item_" + equipment.item.itemId,
            "Item_" + equipment.item.itemId,
            "Item_" + equipment.item.itemId, // nameKey
            999, // packMax
            0, // itemKind1
            0, // itemKind2
            0, // itemKind3
            0, // itemJob
            0, // itemSex
            0, // cost
            0, // limitLevel
            0, // parts
            0, // abilityMin
            0, // abilityMax
            0, // element
            0, // level
            0, // rare
            0, // attackSpeed
            "", // destParam1
            "", // destParam2
            "", // destParam3
            0, // adjParamVal1
            0, // adjParamVal2
            0, // adjParamVal3
            0, // circleTime
            false, // isUseable
            0, // sfxObject (number)
            0, // sfxObject2 (number)
            0, // sfxObject3 (number)
            0, // sfxObject4 (number)
            0, // sfxObject5 (number)
            false, // isPermanant
            0, // coolTime
            0, // weaponTypeId
            0, // itemAtkOrder1
            0, // itemAtkOrder2
            0, // itemAtkOrder3
            0, // itemAtkOrder4
            0, // skillReadyType
            0, // weaponKind
            0, // attackSkillMin
            0, // attackSkillMax
            new Map() // params
          );

          const item = new Item(itemProperties);

          // Set the additional properties
          item.Quantity = equipment.quantity || 1;
          item.Refine = equipment.item.refinement || 0;
          item.Element = equipment.item.element || ElementType.None;
          item.ElementRefine = equipment.item.elementRefinement || 0;
          item.SerialNumber = equipment.item.serialNumber || 0;
          item.CreatorId = undefined;

          // Set item directly in inventory map
          (player.inventory as any).items.set(equipment.slot, item);
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

      // Create PACKETTYPE_JOIN response packet - this is what the client expects first
      const joinResponsePacket = new FlyffPacket(PacketType.JOIN);

      // Serialize basic player data like C++ PACKETTYPE_JOIN response
      joinResponsePacket.writeInt32LE(this.authKey || 0); // Echo back the auth key
      joinResponsePacket.writeInt32LE(character.account.id); // Account info
      joinResponsePacket.writeInt32LE(this.channelId || character.mapId); // World/Channel ID
      joinResponsePacket.writeInt32LE(character.id); // Character ID

      // CRITICAL: Include player's objectId so client knows which object is the player
      joinResponsePacket.writeInt32LE(player.objectId); // Player's world object ID

      // Serialize complete player data (like C++ pMover->Serialize(ar))
      joinResponsePacket.writeString(character.name);
      joinResponsePacket.writeInt32LE(character.level);
      joinResponsePacket.writeInt32LE(character.jobId);
      joinResponsePacket.writeSingleLE(character.positionX);
      joinResponsePacket.writeSingleLE(character.positionY);
      joinResponsePacket.writeSingleLE(character.positionZ);

      this.logger.info(`Sending PACKETTYPE_JOIN response packet to client for character: ${character.name}`);

      // Send the PACKETTYPE_JOIN response first
      this.send(joinResponsePacket);

      // Then send the world snapshot (like C++ OnSnapshot in OnJoin)
      this.logger.info(`Creating individual snapshots for ${character.name}:`);

      const environmentSnapshot = new EnvironmentAllSnapshot(player, false, false);
      this.logger.info(`✓ Created EnvironmentAllSnapshot`);

      const worldReadInfoSnapshot = new WorldReadInfoSnapshot(player);
      this.logger.info(`✓ Created WorldReadInfoSnapshot`);

      const addObjectSnapshot = new AddObjectSnapshot(player);
      this.logger.info(`✓ Created AddObjectSnapshot`);

      const taskbarSnapshot = new TaskbarSnapshot(player);
      this.logger.info(`✓ Created TaskbarSnapshot`);

      const queryPlayerDataSnapshot = new QueryPlayerDataSnapshot(player);
      this.logger.info(`✓ Created QueryPlayerDataSnapshot`);

      const addFriendGameJoinSnapshot = new AddFriendGameJoinSnapshot(player);
      this.logger.info(`✓ Created AddFriendGameJoinSnapshot`);

      // Create the combined snapshot to match C++ server structure exactly
      const joinCompleteSnapshot = new FlyffSnapshot();

      // Write C++ snapshot header: dpidUser + dwHdr + objid + cb
      // Note: dpidUser corresponds to user session/connection ID
      const dpidUser = (this.userConnection as any).sessionId || player.objectId;
      joinCompleteSnapshot.writeInt32LE(dpidUser); // dpidUser (DPID)
      joinCompleteSnapshot.writeInt32LE(PacketType.JOIN); // dwHdr (packet type)
      joinCompleteSnapshot.writeInt32LE(player.objectId); // objid (player object ID)

      const snapshotCount = 6;
      joinCompleteSnapshot.writeInt16LE(snapshotCount); // cb (count)

      // Write each snapshot following C++ format: objid + snapshot_type + data
      const snapshots = [
        environmentSnapshot,
        worldReadInfoSnapshot,
        addObjectSnapshot,
        taskbarSnapshot,
        queryPlayerDataSnapshot,
        addFriendGameJoinSnapshot,
      ];

      for (const snapshot of snapshots) {
        // Each snapshot already contains: objectId + snapshotType + data
        const snapshotContent = snapshot.getContent();
        joinCompleteSnapshot.writeBytes(snapshotContent);
      }

      this.logger.info(`Sending world snapshot to client for character: ${character.name} with ${joinCompleteSnapshot.buffer.length} bytes`);

      // Send the world snapshot after the JOIN response
      player.send(joinCompleteSnapshot);

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
