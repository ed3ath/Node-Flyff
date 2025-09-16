
import _ from "lodash";

import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import Account from "../../../database/account";
import Character from "../../../database/character";
import { Player } from "../../../entities/player";
import { MoverProperties, JobProperties } from "../../../interfaces/resource";
import { GameResources } from "../../../interfaces/resource";
import { Vector3 } from "../../../abstract/vector3";
import { AuthorityType } from "../../../common/authorityType";
import { GenderType } from "../../../common/genderType";

@SetPacketType(PacketType.JOIN_GAME)
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
    // Validate session from Redis (sent from cluster server, equivalent to C# account/player DB check)
    const sessionData = await this.server?.redisClient?.getCharacterSession(this.authKey);

    if (!sessionData) {
      this.logger.warn(
        "Unable to join game for character",
        this.characterName,
        ". Reason: Invalid or expired session."
      );
      return this.userConnection.disconnect();
    }

    // Get character with full relations (like C# _gameDatabase.Players.Include)
    const characters = this.server?.instance?.getEntity("Character");
    const character = (await characters?.findOne({
      where: {
        id: this.characterId,
      },
      relations: [
        "account",
        "equipments",
        "equipments.item",
      ],
    })) as Character;

    if (!character || !character.account) {
      this.logger.warn(
        "Unable to join game for character ID",
        this.characterId,
        ". Reason: Character not found."
      );
      return this.userConnection.disconnect();
    }

    // Verify session matches character (like C# player.Id == packet.PlayerId, player.Name == packet.PlayerName)
    if (character.id !== sessionData.characterId ||
        character.account.username !== sessionData.username) {
      this.logger.warn(
        "Unable to join game for character",
        character.name,
        ". Reason: Session data mismatch."
      );
      return this.userConnection.disconnect();
    }

    if (character.deleted) {
      this.logger.warn(
        "Unable to join game for character",
        character.name,
        ". Reason: Character is deleted."
      );
      return this.userConnection.disconnect();
    }

    // Clean up session (one-time use)
    await this.server?.redisClient?.deleteCharacterSession(this.authKey);

    // Set user connection info (like C# User.Player = new Player(User, ...))
    this.userConnection.userId = character.account.id;
    this.userConnection.username = character.account.username;

    // Ensure initial position if defaults are zero (like C# default pos)
    if (character.positionX === 0 && character.positionY === 0 && character.positionZ === 0) {
      character.positionX = 12345; // Example for WI_WORLD_MADRIGAL
      character.positionY = 6789;
      character.positionZ = 0;
      character.mapId = 1;
      await characters?.update(character.id, { positionX: character.positionX, positionY: character.positionY, positionZ: character.positionZ, mapId: character.mapId });
      this.logger.info(`Set initial spawn position for ${character.name}`);
    }

    // Load resources (like C# GameResources.Current)
    const gameResources = this.server.instance.gameResources as GameResources;
    if (!gameResources) {
      this.logger.error("Game resources not loaded");
      return this.userConnection.disconnect();
    }

    // Load job properties (like C# GameResources.Current.Jobs.Get(player.JobId))
    const jobProperties = await gameResources.jobResources.get(character.jobId);
    if (!jobProperties) {
      this.logger.error(`Job properties not found for jobId ${character.jobId}`);
      return this.userConnection.disconnect();
    }

    // Create position vector (like C# new Vector3(player.PosX, player.PosY, player.PosZ))
    const position = new Vector3(character.positionX, character.positionY, character.positionZ);

    // Basic MoverProperties (extend as needed, like C# GameResources.Current.Movers.Get(modelId))
    const moverProperties: MoverProperties = {
      id: character.id,
      dwID: character.id.toString(),
      szName: character.name,
      dwAI: 'AI_NONE',
      dwStr: character.strength,
      dwSta: character.stamina,
      dwDex: character.dexterity,
      dwInt: character.intelligence,
      dwHR: 0,
      dwER: 0,
      dwRace: 'HUMAN',
      dwBelligerence: '',
      dwGender: character.gender?.toString() || '0',
      dwLevel: character.level,
      dwFlightLevel: 0,
      dwSize: 100,
      dwClass: 0,
      bIfPart: '',
      dwKarma: '',
      dwUseable: '',
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
      eElementType: '',
      wElementAtk: 0,
      dwHideLevel: 0,
      fSpeed: 0.1,
      dwShelter: 0,
      bFlying: '',
      dwJumpIng: 0,
      dwAirJump: 0,
      bTaming: '',
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
      bKillable: '',
      dwVirtItem1: '',
      dwVirtType1: '',
      dwVirtItem2: '',
      dwVirtType2: '',
      dwVirtItem3: '',
      dwVirtType3: '',
      dwSndAtk1: 0,
      dwSndAtk2: 0,
      dwSndDie1: 0,
      dwSndDie2: 0,
      dwSndDmg1: 0,
      dwSndDmg2: 0,
      dwSndDmg3: 0,
      dwSndIdle1: 0,
      dwSndIdle2: 0,
      szComment: '',
      dwAreaColor: 0,
      szNpcMark: '',
      dwMadrigalGiftPoint: 0
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
        skinSetId: character.skinSetId || 0
      },
      deathLevel: 0,
      mode: [],
      availablePoints: character.statPoints || 0,
      skillPoints: character.skillPoints || 0
    };

    const player = new Player(this.userConnection, moverProperties, playerData);

    // Set additional properties
    player.name = character.name;
    player.level = character.level;
    player.position.copy(position);
    player.isSpawned = true;

    // Set stats if available (like C# Statistics.Strength = player.Strength)
    if (player.statistics) {
      player.statistics.strength = character.strength;
      player.statistics.stamina = character.stamina;
      player.statistics.dexterity = character.dexterity;
      player.statistics.intelligence = character.intelligence;
    }
    // Set Health.Hp/Mp/Fp from DB like C#
    if (player.health) {
      player.health.hp = character.hitPoints || player.health.maxHp;
      player.health.mp = character.manaPoints || player.health.maxMp;
      player.health.fp = character.fatiguePoints || player.health.maxFp;
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

    // TODO: Load inventory from equipments relation
    // Add to world map layer (like C# player.MapLayer.AddPlayer(player))
    const mapResource = gameResources.mapResource;
    if (mapResource && mapResource.maps[character.mapId]) {
      const map = mapResource.maps[character.mapId] as any;
      if (map && map.getDefaultLayer) {
        const layer = map.getDefaultLayer();
        if (layer && layer.addPlayer) {
          layer.addPlayer(player);
          this.logger.info(`Added ${character.name} to map ${character.mapId} layer`);
        }
      }
    }
    // Broadcast spawn to other players (like C# layer.AddPlayer)
    (this.server.instance as any).broadcast(player, 'spawn', {
      id: player.id,
      name: player.name,
      position: player.position,
      level: player.level,
      // TODO: Include more data like C#
    });
    // TODO: Send initial snapshot to new player (like C# SendInitialSnapshot)
    this.logger.success(
      `Character ${character.name} (ID: ${character.id}) joined world server successfully as player entity.`
    );
  }

}
