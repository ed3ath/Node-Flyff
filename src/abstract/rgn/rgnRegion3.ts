import { RgnElement } from "./rgnElement";
import { Vector3 } from "../vector3";

export class RgnRegion3 extends RgnElement {
  public index: number;
  public attribute: number;
  public musicId: number;
  public directMusic: boolean;
  public script: string;
  public sound: string;
  public teleportWorldId: number;
  public teleportPosition: Vector3;
  public key: string;
  public targetKey: boolean;
  public itemId: number;
  public itemCount: number;
  public minLevel: number;
  public maxLevel: number;
  public questId: number;
  public questFlag: number;
  public job: number;
  public gender: number;
  public checkParty: boolean;
  public checkGuild: boolean;
  public chaoKey: boolean;

  constructor(regionData: string[]) {
    super(
      parseInt(regionData[1]),
      new Vector3(
        parseInt(regionData[3]),
        parseInt(regionData[4]),
        parseInt(regionData[5])
      ),
      parseInt(regionData[15]),
      parseInt(regionData[16]),
      parseInt(regionData[17]),
      parseInt(regionData[18])
    );

    this.index = parseInt(regionData[2]);
    this.attribute = parseInt(regionData[6].replace("0x", ""), 16);
    this.musicId = parseInt(regionData[7]);
    this.directMusic = parseInt(regionData[8]) === 1;
    this.script = regionData[9];
    this.sound = regionData[10];
    this.teleportWorldId = parseInt(regionData[11]);
    this.teleportPosition = new Vector3(
      parseFloat(regionData[12]),
      parseFloat(regionData[13]),
      parseFloat(regionData[14])
    );
    this.key = regionData[19].replace(/"/g, "");
    this.targetKey = parseInt(regionData[20]) === 1;
    this.itemId = parseInt(regionData[21]);
    this.itemCount = parseInt(regionData[22]);
    this.minLevel = parseInt(regionData[23]);
    this.maxLevel = parseInt(regionData[24]);
    this.questId = parseInt(regionData[25]);
    this.questFlag = parseInt(regionData[26]);
    this.job = parseInt(regionData[27]);
    this.gender = parseInt(regionData[28]);
    this.checkParty = parseInt(regionData[29]) === 1;
    this.checkGuild = parseInt(regionData[30]) === 1;
    this.chaoKey = parseInt(regionData[31]) === 1;
  }
}
