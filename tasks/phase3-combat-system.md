# Phase 3: Combat System

**Priority: HIGH** - Required for combat mechanics and skill system

## Overview
This phase implements the complete combat system including magic attacks, ranged attacks, skill usage, targeting, death/revival mechanics, and character progression.

## 🎯 Success Criteria
- [ ] Magic attacks work with proper animations
- [ ] Ranged attacks function correctly
- [ ] Skill system allows casting abilities
- [ ] Target selection works properly
- [ ] Death and revival mechanics function
- [ ] Experience and leveling work
- [ ] Combat feedback is responsive

## 📨 Packet Handlers to Implement

### 1. MAGICATTACK (0x00ff0011)
**File:** `src/servers/worldServer/handlers/magicAttack.ts`
**Purpose:** Handle magic spell casting
**Priority:** CRITICAL
**C++ Reference:** Magic combat system

**Implementation Notes:**
- Validate mana cost and skill requirements
- Calculate magic damage based on intelligence and skill level
- Handle area-of-effect spells
- Apply magic resistances and defenses
- Send damage and animation snapshots

### 2. RANGEATTACK (0x00ff0012)
**File:** `src/servers/worldServer/handlers/rangeAttack.ts`
**Purpose:** Handle bow/crossbow attacks
**Priority:** HIGH
**C++ Reference:** Ranged combat system

**Implementation Notes:**
- Validate ammunition requirements
- Calculate damage based on dexterity and weapon
- Handle distance and accuracy calculations
- Apply armor penetration and resistances
- Send projectile and damage effects

### 3. SETTARGET (0x00ff0023)
**File:** `src/servers/worldServer/handlers/setTarget.ts`
**Purpose:** Target selection for combat
**Priority:** CRITICAL
**C++ Reference:** Target system

**Implementation Notes:**
- Validate target is in range and line of sight
- Handle target switching and clearing
- Update combat state based on target
- Send target information to client

### 4. USESKILL (0x00ff0020)
**File:** `src/servers/worldServer/handlers/useSkill.ts`
**Purpose:** Cast skills and abilities
**Priority:** CRITICAL
**C++ Reference:** Skill system

**Implementation Notes:**
- Validate skill level and requirements
- Check mana/FP costs and cooldowns
- Apply skill effects (damage, buffs, debuffs)
- Handle skill animations and ranges
- Update skill experience

### 5. MOVERDEATH (0x00ff0013)
**File:** `src/servers/worldServer/handlers/moverDeath.ts`
**Purpose:** Handle player/monster death
**Priority:** HIGH
**C++ Reference:** Death system

**Implementation Notes:**
- Process death conditions (HP <= 0)
- Apply death penalties (experience loss)
- Handle item dropping on death
- Set death state and location
- Notify nearby players

### 6. REVIVAL (0x00ff00c0)
**File:** `src/servers/worldServer/handlers/revival.ts`
**Purpose:** Player resurrection
**Priority:** HIGH
**C++ Reference:** Revival system

**Implementation Notes:**
- Validate revival conditions
- Restore HP/MP based on revival type
- Apply revival penalties if applicable
- Update player state to alive
- Send revival effects

### 7. SETEXPERIENCE (0x00ff000d)
**File:** `src/servers/worldServer/handlers/setExperience.ts`
**Purpose:** Grant experience points
**Priority:** MEDIUM
**C++ Reference:** Experience system

**Implementation Notes:**
- Calculate experience from kills/quests
- Apply experience bonuses/penalties
- Handle level up conditions
- Update skill points and stat points
- Send experience gain notifications

## 📸 Snapshot Types to Implement

### 1. USE_SKILL (0x0019)
**File:** `src/protocol/snapshots/useSkill.ts`
**Purpose:** Skill casting animation and effects
**Priority:** CRITICAL
**C++ Reference:** `SNAPSHOTTYPE_USESKILL`

**Structure:**
```typescript
export class UseSkillSnapshot {
  constructor(
    casterId: number,
    skillId: number,
    skillLevel: number,
    targetId: number,
    position?: Vector3
  ) {
    // Write skill casting data
    // Include caster, skill, target, and effect position
  }
}
```

### 2. MOVERDEATH (0x00c7)
**File:** `src/protocol/snapshots/moverDeath.ts`
**Purpose:** Death animation and state
**Priority:** HIGH
**C++ Reference:** `SNAPSHOTTYPE_MOVERDEATH`

**Structure:**
```typescript
export class MoverDeathSnapshot {
  constructor(deadMover: Mover, killerId?: number) {
    // Write death animation data
    // Include who died and who killed them
  }
}
```

### 3. RESURRECTION (0x00eb)
**File:** `src/protocol/snapshots/resurrection.ts`
**Purpose:** Revival animation and effects
**Priority:** HIGH
**C++ Reference:** `SNAPSHOTTYPE_RESURRECTION`

**Structure:**
```typescript
export class ResurrectionSnapshot {
  constructor(
    revivedMover: Mover,
    revivalType: RevivalType,
    position: Vector3
  ) {
    // Write resurrection data
    // Include revival type and new position
  }
}
```

### 4. SET_LEVEL (0x0011)
**File:** `src/protocol/snapshots/setLevel.ts`
**Purpose:** Level change notification
**Priority:** MEDIUM
**C++ Reference:** `SNAPSHOTTYPE_SETLEVEL`

**Structure:**
```typescript
export class SetLevelSnapshot {
  constructor(playerId: number, newLevel: number, levelType: LevelType) {
    // Write level change data
    // Handle both character and job levels
  }
}
```

### 5. SET_EXPERIENCE (0x0012)
**File:** `src/protocol/snapshots/setExperience.ts`
**Purpose:** Experience gain display
**Priority:** MEDIUM
**C++ Reference:** `SNAPSHOTTYPE_SETEXPERIENCE`

**Structure:**
```typescript
export class SetExperienceSnapshot {
  constructor(
    playerId: number,
    experienceGained: number,
    newTotal: number,
    experienceType: ExperienceType
  ) {
    // Write experience gain data
    // Include amount gained and new total
  }
}
```

### 6. SET_FXP (0x0029)
**File:** `src/protocol/snapshots/setFxp.ts`
**Purpose:** Flight experience updates
**Priority:** LOW
**C++ Reference:** `SNAPSHOTTYPE_SETFXP`

**Structure:**
```typescript
export class SetFxpSnapshot {
  constructor(playerId: number, fxpGained: number, newTotal: number) {
    // Write flight experience data
  }
}
```

### 7. CLEAR_USE_SKILL (0x001a)
**File:** `src/protocol/snapshots/clearUseSkill.ts`
**Purpose:** Cancel skill casting
**Priority:** MEDIUM
**C++ Reference:** `SNAPSHOTTYPE_CLEARUSESKILL`

**Structure:**
```typescript
export class ClearUseSkillSnapshot {
  constructor(casterId: number, reason: SkillCancelReason) {
    // Write skill cancellation data
  }
}
```

## 🔧 Technical Implementation Details

### Combat Calculation System
```typescript
interface CombatCalculation {
  baseDamage: number;        // Base weapon/skill damage
  statModifier: number;      // STR/DEX/INT modifier
  skillModifier: number;     // Skill level bonus
  elementalBonus: number;    // Elemental damage
  criticalHit: boolean;      // Critical hit flag
  finalDamage: number;       // After all calculations
}
```

### Skill System Architecture
```typescript
interface SkillCast {
  skillId: number;          // Skill being cast
  skillLevel: number;       // Level of skill
  casterId: number;         // Who is casting
  targetId?: number;        // Target (if any)
  castPosition?: Vector3;   // Cast location
  castTime: number;         // Time to complete cast
  manaCost: number;         // MP required
  fpCost: number;          // FP required
}
```

### Death and Revival System
```typescript
enum RevivalType {
  HERE = 0,           // Revive at death location
  LODESTAR = 1,       // Revive at nearest lodestar
  LODELIGHT = 2,      // Revive at set lodelight
  SKILL = 3,          // Revived by player skill
  ITEM = 4            // Revived by item
}
```

### Experience Types
```typescript
enum ExperienceType {
  KILL_EXP = 0,       // From killing monsters
  QUEST_EXP = 1,      // From completing quests
  SKILL_EXP = 2,      // Skill-specific experience
  FLIGHT_EXP = 3,     // Flight experience
  PARTY_EXP = 4       // Shared party experience
}
```

## 🧪 Testing Checklist
- [ ] Melee attacks hit and show damage
- [ ] Magic spells cast and hit targets
- [ ] Ranged attacks work with proper projectiles
- [ ] Skills can be learned and used
- [ ] Targeting works for all attack types
- [ ] Death occurs when HP reaches 0
- [ ] Revival restores player to combat-ready state
- [ ] Experience is gained from kills
- [ ] Level up increases stats and unlocks abilities
- [ ] Mana and FP are consumed properly
- [ ] Cooldowns prevent skill spam
- [ ] Combat animations play correctly

## 📋 Dependencies
- [ ] Skill resource loading system
- [ ] Monster AI and stats system
- [ ] Buff/debuff effect system
- [ ] Animation and effect system
- [ ] Experience table system
- [ ] Item enhancement system (for weapon damage)

## 🚀 Implementation Order
1. **SETTARGET** packet (foundation for all combat)
2. **USE_SKILL** snapshot + **USESKILL** packet (skill system)
3. **MAGICATTACK** packet (magic combat)
4. **RANGEATTACK** packet (ranged combat)
5. **MOVERDEATH** snapshot + **MOVERDEATH** packet (death system)
6. **RESURRECTION** snapshot + **REVIVAL** packet (revival system)
7. **SET_EXPERIENCE/SET_LEVEL** snapshots (progression)

## ⚠️ Known Issues & Considerations
- **Balance:** Combat calculations need careful tuning
- **Performance:** Area-of-effect skills can be CPU intensive
- **Security:** Validate all combat actions server-side
- **Synchronization:** Combat state must stay synced between client/server
- **Exploits:** Prevent rapid-fire and damage manipulation
- **PvP:** Consider player vs player combat implications

## 🎮 Combat Features by Priority

### Phase 3A (Essential):
- Basic magic attacks
- Skill casting system
- Target selection
- Death/revival mechanics

### Phase 3B (Enhanced):
- Advanced skills and combos
- Status effects and buffs
- Critical hits and special attacks
- Party combat mechanics

### Phase 3C (Advanced):
- PvP combat systems
- Guild war mechanics
- Advanced skill trees
- Combat balancing

## 📖 References
- Skill System: `src/resources/skillResources.ts`
- Combat Mechanics: Player statistics and combat calculations
- Experience Tables: `src/resources/expTableResource.ts`
- Magic System: Spell casting and mana management