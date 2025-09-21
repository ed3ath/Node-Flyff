# Phase 2: Inventory & Basic Items

**Priority: HIGH** - Required for item interaction and inventory management

## Overview
This phase implements the core item system, including inventory management, equipment, item usage, and basic item interactions.

## 🎯 Success Criteria
- [ ] Items can be created and given to players
- [ ] Inventory management works (move, stack, split)
- [ ] Equipment system functions (equip/unequip)
- [ ] Consumable items can be used
- [ ] Items can be dropped and picked up
- [ ] Item synchronization works properly

## 📨 Packet Handlers to Implement

### 1. CREATEITEM (0x00ff0005)
**File:** `src/servers/worldServer/handlers/createItem.ts`
**Purpose:** Create/give items to players
**Priority:** CRITICAL
**C++ Reference:** Item creation system

**Implementation Notes:**
- Create items from item ID and properties
- Add to player inventory with proper validation
- Handle item stacking and quantity limits
- Send item creation snapshot to client

### 2. MOVEITEM (0x00ff0006)
**File:** `src/servers/worldServer/handlers/moveItem.ts`
**Purpose:** Move items within inventory
**Priority:** CRITICAL
**C++ Reference:** Inventory management

**Implementation Notes:**
- Validate source and destination slots
- Handle item stacking rules
- Update inventory state
- Broadcast changes to client

### 3. DOEQUIP (0x00ff000b)
**File:** `src/servers/worldServer/handlers/doEquip.ts`
**Purpose:** Equip/unequip items
**Priority:** HIGH
**C++ Reference:** Equipment system

**Implementation Notes:**
- Validate item can be equipped (job, level, gender restrictions)
- Handle equipment slot conflicts
- Update player stats based on equipment
- Send visual updates to other players

### 4. DOUSEITEM (0x00ff0021)
**File:** `src/servers/worldServer/handlers/doUseItem.ts`
**Purpose:** Use consumable items
**Priority:** HIGH
**C++ Reference:** Item usage system

**Implementation Notes:**
- Validate item is usable
- Apply item effects (healing, buffs, etc.)
- Consume item quantity
- Handle cooldowns and restrictions

### 5. DROPITEM (0x00ff0007)
**File:** `src/servers/worldServer/handlers/dropItem.ts`
**Purpose:** Drop items from inventory
**Priority:** MEDIUM
**C++ Reference:** Item dropping system

**Implementation Notes:**
- Remove item from inventory
- Create world item object
- Set pickup restrictions and timers
- Notify nearby players of dropped item

### 6. REMOVEITEM (0x00ff0009)
**File:** `src/servers/worldServer/handlers/removeItem.ts`
**Purpose:** Remove items from inventory
**Priority:** MEDIUM
**C++ Reference:** Item removal system

**Implementation Notes:**
- Validate item exists in inventory
- Remove specified quantity
- Update inventory display
- Handle item destruction

## 📸 Snapshot Types to Implement

### 1. CREATE_ITEM (0x0003)
**File:** `src/protocol/snapshots/createItem.ts`
**Purpose:** Item creation notification
**Priority:** CRITICAL
**C++ Reference:** `SNAPSHOTTYPE_CREATEITEM`

**Structure:**
```typescript
export class CreateItemSnapshot {
  constructor(item: Item, slot: number, quantity: number) {
    // Write item creation data
    // Include item properties, slot position, quantity
  }
}
```

### 2. MOVE_ITEM (0x0004)
**File:** `src/protocol/snapshots/moveItem.ts`
**Purpose:** Item movement in inventory
**Priority:** CRITICAL
**C++ Reference:** `SNAPSHOTTYPE_MOVEITEM`

**Structure:**
```typescript
export class MoveItemSnapshot {
  constructor(fromSlot: number, toSlot: number, quantity: number) {
    // Write item movement data
    // Handle partial moves and stacking
  }
}
```

### 3. DO_EQUIP (0x0006)
**File:** `src/protocol/snapshots/doEquip.ts`
**Purpose:** Equipment changes
**Priority:** HIGH
**C++ Reference:** `SNAPSHOTTYPE_DOEQUIP`

**Structure:**
```typescript
export class DoEquipSnapshot {
  constructor(playerId: number, equipSlot: number, item: Item | null) {
    // Write equipment change data
    // Include visual updates for other players
  }
}
```

### 4. SYNC_ITEM (0x000d)
**File:** `src/protocol/snapshots/syncItem.ts`
**Purpose:** Item state synchronization
**Priority:** HIGH
**C++ Reference:** `SNAPSHOTTYPE_SYNCITEM`

**Structure:**
```typescript
export class SyncItemSnapshot {
  constructor(item: Item) {
    // Write complete item state
    // Include durability, enchantment, etc.
  }
}
```

### 5. UPDATE_ITEM (0x0018)
**File:** `src/protocol/snapshots/updateItem.ts`
**Purpose:** Item property updates
**Priority:** MEDIUM
**C++ Reference:** `SNAPSHOTTYPE_UPDATEITEM`

**Structure:**
```typescript
export class UpdateItemSnapshot {
  constructor(item: Item, updateType: ItemUpdateType) {
    // Write item updates (durability, quantity, etc.)
  }
}
```

## 🔧 Technical Implementation Details

### Item System Architecture
```typescript
interface ItemInstance {
  itemId: number;           // Item type ID
  serialNumber: number;     // Unique instance ID
  quantity: number;         // Stack count
  durability: number;       // Item condition
  refine: number;          // Enhancement level
  element: ElementType;     // Element type
  elementRefine: number;    // Element level
  creatorId?: number;      // Who created/enhanced item
}
```

### Inventory Management
- **Slots:** 0-129 (130 total inventory slots)
- **Equipment:** Separate equipment slots (helmet, armor, weapon, etc.)
- **Stacking:** Items stack based on itemId and properties
- **Validation:** All moves validated server-side

### Equipment System
```typescript
enum EquipmentSlot {
  HELMET = 0,
  ARMOR = 1,
  GAUNTLET = 2,
  BOOTS = 3,
  WEAPON = 4,
  SHIELD = 5,
  NECKLACE = 6,
  RING1 = 7,
  RING2 = 8,
  EARRING1 = 9,
  EARRING2 = 10
}
```

### Item Usage Types
- **Consumables:** Potions, food, scrolls
- **Equipment:** Weapons, armor, accessories
- **Quest Items:** Special quest-related items
- **Materials:** Crafting components
- **Currency:** Gold and special currencies

## 🧪 Testing Checklist
- [ ] Items can be created via GM commands
- [ ] Items appear in correct inventory slots
- [ ] Items can be moved between slots
- [ ] Item stacking works correctly
- [ ] Equipment changes player appearance
- [ ] Equipment affects player stats
- [ ] Consumable items apply effects
- [ ] Items can be dropped and picked up
- [ ] Item durability decreases with use
- [ ] Invalid operations are rejected

## 📋 Dependencies
- [ ] Item properties loading from resources
- [ ] Player statistics system
- [ ] Equipment visual system
- [ ] Buff/effect system (for consumables)
- [ ] World item objects (for dropped items)

## 🚀 Implementation Order
1. **CREATE_ITEM** snapshot + **CREATEITEM** packet
2. **MOVE_ITEM** snapshot + **MOVEITEM** packet
3. **DO_EQUIP** snapshot + **DOEQUIP** packet
4. **SYNC_ITEM** snapshot for state management
5. **DOUSEITEM** packet for consumables
6. **DROPITEM** packet for item dropping
7. **UPDATE_ITEM** snapshot for property changes

## ⚠️ Known Issues & Considerations
- **Duplication:** Prevent item duplication exploits
- **Validation:** All item operations must be server-validated
- **Performance:** Large inventories can impact performance
- **Security:** Validate item IDs exist in game resources
- **Synchronization:** Keep client and server inventory in sync

## 🎮 Item Categories by Priority

### Immediate (Phase 2A):
- Basic consumables (potions)
- Simple weapons and armor
- Basic materials

### Later (Phase 2B):
- Enhanced equipment
- Rare/unique items
- Crafting materials
- Quest items

## 📖 References
- Item Properties: `src/interfaces/resource.ts:ItemProperties`
- Item Resources: `src/resources/itemResource.ts`
- Game Item Class: `src/game/mechanics/item.ts`
- Equipment System: Player inventory and equipment slots