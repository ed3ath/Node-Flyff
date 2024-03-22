import { ElementType } from "../common/elementType";
import { ItemKind1, ItemKind2, ItemKind3 } from "../common/itemKind";
import { ItemPartType } from "../common/itemPartyType";
import { DefineJob } from "../common/defineJob";
import { WeaponKindType } from "../common/weaponKindType";
import { DefineAttributes } from "../common/defineAttributes";
import { WeaponType } from "../common/weaponType";
import { DataMember, IgnoreDataTransformation } from "../decorators/itemResource";

export class ItemProperties {
    id: number
    
    @DataMember({ name: 'ver6' })
    version: number;

    @DataMember({ name: 'dwID' })
    itemId: number;

    @DataMember({ name: 'dwID' })
    @IgnoreDataTransformation()
    identifierName: string;

    @DataMember({ name: 'szName' })
    name: string;

    @DataMember({ name: 'szName' })
    @IgnoreDataTransformation()
    nameKey: string;

    @DataMember({ name: 'dwPackMax' })
    packMax: number;

    @DataMember({ name: 'dwItemKind1' })
    itemKind1: ItemKind1;

    @DataMember({ name: 'dwItemKind2' })
    itemKind2: ItemKind2;

    @DataMember({ name: 'dwItemKind3' })
    itemKind3: ItemKind3;

    @DataMember({ name: 'dwItemJob' })
    itemJob: DefineJob;

    @DataMember({ name: 'dwItemSex', defaultValue: Number.MAX_SAFE_INTEGER })
    itemSex: number;

    @DataMember({ name: 'dwCost' })
    cost: number;

    @DataMember({ name: 'dwLimitLevel1' })
    limitLevel: number;

    @DataMember({ name: 'dwParts' })
    parts: string; // Assuming ItemPartType is a string type

    @DataMember({ name: 'dwAbilityMin' })
    abilityMin: number;

    @DataMember({ name: 'dwAbilityMax' })
    abilityMax: number;

    @DataMember({ name: 'eItemType' })
    elementType: string; // Assuming ElementType is a string type

    @DataMember({ name: 'dwItemLV' })
    level: number;

    @DataMember({ name: 'dwItemRare' })
    rare: number;

    @DataMember({ name: 'dwAttackSpeed' })
    attackSpeed: number;

    @DataMember({ name: 'dwDestParam1' })
    destParam1: string;

    @DataMember({ name: 'dwDestParam2' })
    destParam2: string;

    @DataMember({ name: 'dwDestParam3' })
    destParam3: string;

    @DataMember({ name: 'nAdjParamVal1' })
    adjustParam1: number;

    @DataMember({ name: 'nAdjParamVal2' })
    adjustParam2: number;

    @DataMember({ name: 'nAdjParamVal3' })
    adjustParam3: number;

    @DataMember({ name: 'dwCircleTime' })
    circleTime: number;

    @DataMember({ name: 'dwUseable' })
    isUseable: boolean;

    @DataMember({ name: 'dwSfxObj' })
    sfxObject: number;

    @DataMember({ name: 'dwSfxObj2' })
    sfxObject2: number;

    @DataMember({ name: 'dwSfxObj3' })
    sfxObject3: number;

    @DataMember({ name: 'dwSfxObj4' })
    sfxObject4: number;

    @DataMember({ name: 'dwSfxObj5' })
    sfxObject5: number;

    @DataMember({ name: 'bPermanence' })
    isPermanant: boolean;

    @DataMember({ name: 'dwSkillReady' })
    coolTime: number;

    @DataMember({ name: 'dwWeaponType' })
    weaponTypeId: number;

    @DataMember({ name: 'dwItemAtkOrder1' })
    itemAtkOrder1: number;

    @DataMember({ name: 'dwItemAtkOrder2' })
    itemAtkOrder2: number;

    @DataMember({ name: 'dwItemAtkOrder3' })
    itemAtkOrder3: number;

    @DataMember({ name: 'dwItemAtkOrder4' })
    itemAtkOrder4: number;

    @DataMember({ name: 'dwSkillReadyType' })
    skillReadyType: number;

    @DataMember({ name: 'dwReferStat1' })
    weaponKind: string; // Assuming WeaponKindType is a string type

    @DataMember({ name: 'dwAddSkillMin' })
    attackSkillMin: number;

    @DataMember({ name: 'dwAddSkillMax' })
    attackSkillMax: number;

    @DataMember({ name: 'dwReqMp' })
    requiredMp: number;

    @DataMember({ name: 'dwReqFp' })
    requiredFp: number;

    get isStackable(): boolean {
        return this.packMax > 1;
    }    
    get weaponType(): WeaponType {
        return WeaponType[this.weaponTypeId] as unknown as WeaponType;
    }

    // Define Params property if needed
}

// export interface ItemProperties {
//     id?: number;
//     ver6: number;
//     dwID: string;
//     szName: string;
//     dwPackMax: number;
//     dwItemKind1: string;
//     dwItemKind2: string;
//     dwItemKind3: string;
//     dwItemJob: string;
//     bPermanence: boolean;
//     dwUseable: boolean;
//     dwItemSex: number;
//     dwCost: number;
//     dwLimitLevel1: number;
//     dwParts: string;
//     dwAbilityMin: number;
//     dwAbilityMax: number;
//     eItemType: string;
//     dwItemLV: number;
//     dwItemRare: number;
//     dwAttackSpeed: number;
//     dwDestParam1: number;
//     dwDestParam2: number;
//     dwDestParam3: number;
//     nAdjParamVal1: number;
//     nAdjParamVal2: number;
//     nAdjParamVal3: number;
//     dwCircleTime: number;
//     dwSfxObj: number;
//     dwSfxObj2: number;
//     dwSfxObj3: number;
//     dwSfxObj4: number;
//     dwSfxObj5: number;
//     dwSkillReady: number;
//     dwWeaponType: number;
//     dwItemAtkOrder1: number;
//     dwItemAtkOrder2: number;
//     dwItemAtkOrder3: number;
//     dwItemAtkOrder4: number;
//     dwSkillReadyType: number;
//     dwReferStat1: string;
//     dwAddSkillMin: number;
//     dwAddSkillMax: number;
//     dwReqMp: number;
//     dwReqFp: number;
//     bCharged: boolean;
//     dwReferStat2: number;
//     dwReferTarget1: number;
//     dwReferTarget2: number;
//     dwReferValue1: number;
//     dwReferValue2: number;
//     dwFlightLimit: number;
//     dwFFuelReMax: number;
//     dwAFuelReMax: number;
//     dwLimitLevel: number;
//     dwReflect: number;
//     szIcon: string;
//     dwQuestID: number;
//     szTextFile: string;
//     szComment: string;
//     readonly stackable?: boolean;
//     readonly Params?: Readonly<Record<DefineAttributes, number>>;
// }