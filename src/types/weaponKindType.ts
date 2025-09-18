export enum WeaponKindType {
  General,
  Unique,
  Ultimate,
}

export function getWeaponKindType(type: string) {
  switch (type) {
    case "WEAPON_GENERAL":
      return WeaponKindType.General;
    case "WEAPON_UNIQUE":
      return WeaponKindType.Unique;
    case "WEAPON_ULTIMATE":
      return WeaponKindType.Ultimate;
    default:
      return WeaponKindType.General;
  }
}
