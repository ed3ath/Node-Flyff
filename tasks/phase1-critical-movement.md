# Phase 1: Critical Movement & World Interaction

**Priority: URGENT** - Required for basic world functionality

## Overview
This phase implements the essential systems needed for multiplayer world interaction, allowing players to see other players, NPCs, and basic world objects.

## 🎯 Success Criteria
- [ ] Other players appear in the world
- [ ] NPCs spawn and despawn correctly
- [ ] Position synchronization works
- [ ] Basic damage feedback displays
- [ ] Chat messages appear

## 📨 Packet Handlers to Implement

### 1. ADDOBJ (0x00ff0002)
**File:** `src/servers/worldServer/handlers/addObj.ts`
**Purpose:** Spawn other players/NPCs in the world
**Priority:** CRITICAL
**C++ Reference:** `H:\game\v19\Source\Source\WORLDSERVER\User.cpp:AddAddObj`

**Implementation Notes:**
- Handle spawning other players when they enter view range
- Spawn NPCs when player enters their area
- Send proper object type and model index
- Include position, rotation, and basic properties

### 2. REMOVEOBJ (0x00ff0003)
**File:** `src/servers/worldServer/handlers/removeObj.ts`
**Purpose:** Despawn objects when they leave view range
**Priority:** CRITICAL
**C++ Reference:** `H:\game\v19\Source\Source\WORLDSERVER\User.cpp:AddRemoveObj`

**Implementation Notes:**
- Remove players when they leave view range
- Despawn NPCs when player moves away
- Clean up object references

### 3. PLAYERCORR (0xffffff05)
**File:** `src/servers/worldServer/handlers/playerCorr.ts`
**Purpose:** Position correction for client-server sync
**Priority:** HIGH
**C++ Reference:** Movement correction system

**Implementation Notes:**
- Validate client position against server
- Send correction if position differs significantly
- Handle anti-cheat for movement speed

### 4. DAMAGE (0x00ff000c)
**File:** `src/servers/worldServer/handlers/damage.ts`
**Purpose:** Process and broadcast damage events
**Priority:** HIGH
**C++ Reference:** Combat damage system

**Implementation Notes:**
- Calculate damage based on stats and equipment
- Broadcast damage to nearby players
- Handle death conditions

## 📸 Snapshot Types to Implement

### 1. DEL_OBJ (0x00f1)
**File:** `src/protocol/snapshots/delObj.ts`
**Purpose:** Remove objects from world
**Priority:** CRITICAL
**C++ Reference:** `SNAPSHOTTYPE_DEL_OBJ`

**Structure:**
```typescript
export class DelObjSnapshot {
  constructor(objectId: number) {
    // Write object ID to remove
  }
}
```

### 2. MOVERMOVED (0x00ca)
**File:** `src/protocol/snapshots/moverMoved.ts`
**Purpose:** Other player movement updates
**Priority:** CRITICAL
**C++ Reference:** `SNAPSHOTTYPE_MOVERMOVED`

**Structure:**
```typescript
export class MoverMovedSnapshot {
  constructor(mover: Mover, position: Vector3, angle: number) {
    // Write movement data for other players
  }
}
```

### 3. MOVERBEHAVIOR (0x00cb)
**File:** `src/protocol/snapshots/moverBehavior.ts`
**Purpose:** Other player behavior updates (walking, running, flying)
**Priority:** CRITICAL
**C++ Reference:** `SNAPSHOTTYPE_MOVERBEHAVIOR`

**Structure:**
```typescript
export class MoverBehaviorSnapshot {
  constructor(mover: Mover, behavior: BehaviorType) {
    // Write behavior state changes
  }
}
```

### 4. DAMAGE (0x0013)
**File:** `src/protocol/snapshots/damage.ts`
**Purpose:** Damage number display
**Priority:** HIGH
**C++ Reference:** `SNAPSHOTTYPE_DAMAGE`

**Structure:**
```typescript
export class DamageSnapshot {
  constructor(targetId: number, damage: number, damageType: DamageType) {
    // Write damage information for visual feedback
  }
}
```

### 5. CHAT (0x0001)
**File:** `src/protocol/snapshots/chat.ts`
**Purpose:** Chat message display
**Priority:** HIGH
**C++ Reference:** `SNAPSHOTTYPE_CHAT`

**Structure:**
```typescript
export class ChatSnapshot {
  constructor(playerId: number, message: string, chatType: ChatType) {
    // Write chat message data
  }
}
```

## 🔧 Technical Implementation Details

### View Range System
- **Range:** ~32x32 units around player
- **Update Frequency:** Every 100ms for movement
- **Optimization:** Only send updates for objects within range

### Object Management
- **Player Tracking:** Maintain list of players in view range
- **NPC Spawning:** Load NPCs based on map data
- **State Sync:** Keep server and client object states synchronized

### Position Validation
- **Speed Limits:** Validate movement speed against job/level
- **Boundary Checks:** Ensure positions are within map bounds
- **Anti-Cheat:** Detect impossible movements

## 🧪 Testing Checklist
- [ ] Two players can see each other
- [ ] Players appear when entering view range
- [ ] Players disappear when leaving view range
- [ ] NPCs spawn in correct locations
- [ ] Position corrections work smoothly
- [ ] Chat messages display correctly
- [ ] Damage numbers appear on hits

## 📋 Dependencies
- [ ] Player entity system
- [ ] World map management
- [ ] View range calculation system
- [ ] Snapshot broadcast system

## 🚀 Implementation Order
1. **DEL_OBJ** snapshot (removal first, then addition)
2. **ADDOBJ** packet handler
3. **REMOVEOBJ** packet handler
4. **MOVERMOVED/MOVERBEHAVIOR** snapshots
5. **PLAYERCORR** packet handler
6. **DAMAGE** system (packet + snapshot)
7. **CHAT** snapshot

## ⚠️ Known Issues & Considerations
- **Performance:** Object spawning can be CPU intensive
- **Network:** Avoid sending duplicate add/remove packets
- **Memory:** Clean up object references properly
- **Security:** Validate all position data from clients

## 📖 References
- C++ AddAddObj: `H:\game\v19\Source\Source\WORLDSERVER\User.cpp:657`
- C++ Serialize: `H:\game\v19\Source\Source\_Common\ObjSerializeOpt.cpp:97`
- Snapshot System: `H:\game\v19\Source\Source\WORLDSERVER\User.cpp:669`