# Phase 4: Social & Communication

**Priority: MEDIUM** - Quality of life improvements for social interaction

## Overview
This phase implements the social features that make FlyFF a multiplayer experience, including chat systems, trading, party mechanics, and guild systems.

## 🎯 Success Criteria
- [x] ~~All chat types work (whisper, say, shout)~~ **Basic chat (NORMAL) implemented and working**
- [ ] Player trading functions completely
- [ ] Party system allows grouping and experience sharing
- [ ] Guild system supports basic guild operations
- [ ] Friend system tracks online/offline status
- [ ] Social UI elements update correctly

## 📨 Packet Handlers to Implement

### 1. WHISPER (0x00ff00d4)
**File:** `src/servers/worldServer/handlers/whisper.ts`
**Purpose:** Private messaging between players
**Priority:** HIGH
**C++ Reference:** Private message system

**Implementation Notes:**
- Validate target player exists and is online
- Handle cross-server whispers if applicable
- Support ignore list functionality
- Log whispers for moderation purposes

### 2. SAY (0x00ff00e0)
**File:** `src/servers/worldServer/handlers/say.ts`
**Purpose:** Local area chat
**Priority:** HIGH
**C++ Reference:** Local chat system

**Implementation Notes:**
- Broadcast to players within hearing range (~20 units)
- Handle different say ranges based on volume
- Support emotes and special commands
- Apply chat filters and restrictions

### 3. SHOUT (0x00ff00e1)
**File:** `src/servers/worldServer/handlers/shout.ts`
**Purpose:** Area-wide chat (map-wide)
**Priority:** MEDIUM
**C++ Reference:** Shout system

**Implementation Notes:**
- Broadcast to entire map or large area
- Require items or level restrictions
- Handle shout cooldowns
- Support colored text and formatting

### 4. TRADE (0x00ff00a0)
**File:** `src/servers/worldServer/handlers/trade.ts`
**Purpose:** Initiate player trading
**Priority:** HIGH
**C++ Reference:** Trade system

**Implementation Notes:**
- Validate both players can trade
- Check distance and trade restrictions
- Create trade session state
- Handle trade cancellation

### 5. TRADEPUT (0x00ff00a1)
**File:** `src/servers/worldServer/handlers/tradePut.ts`
**Purpose:** Add items to trade window
**Priority:** HIGH
**C++ Reference:** Trade item placement

**Implementation Notes:**
- Validate item exists in inventory
- Check item trade restrictions
- Update trade window for both players
- Handle quantity selection

### 6. TRADEPULL (0x00ff00a2)
**File:** `src/servers/worldServer/handlers/tradePull.ts`
**Purpose:** Remove items from trade
**Priority:** HIGH
**C++ Reference:** Trade item removal

**Implementation Notes:**
- Remove items from trade window
- Return items to original inventory slots
- Update trade state for both players

### 7. TRADEOK (0x00ff00a3)
**File:** `src/servers/worldServer/handlers/tradeOk.ts`
**Purpose:** Confirm trade acceptance
**Priority:** HIGH
**C++ Reference:** Trade confirmation

**Implementation Notes:**
- Mark player as ready to trade
- Wait for both players to confirm
- Execute trade when both are ready
- Handle trade completion

## 📸 Snapshot Types to Implement

### 1. TRADE (0x0007)
**File:** `src/protocol/snapshots/trade.ts`
**Purpose:** Trade window management
**Priority:** HIGH
**C++ Reference:** `SNAPSHOTTYPE_TRADE`

**Structure:**
```typescript
export class TradeSnapshot {
  constructor(
    tradePartner: Player,
    tradeState: TradeState
  ) {
    // Write trade window data
    // Include partner info and trade state
  }
}
```

### 2. TRADE_PUT (0x0008)
**File:** `src/protocol/snapshots/tradePut.ts`
**Purpose:** Item added to trade
**Priority:** HIGH
**C++ Reference:** `SNAPSHOTTYPE_TRADEPUT`

**Structure:**
```typescript
export class TradePutSnapshot {
  constructor(
    item: Item,
    quantity: number,
    isOwnItem: boolean
  ) {
    // Write trade item addition
    // Include item data and quantity
  }
}
```

### 3. TRADE_PULL (0x0009)
**File:** `src/protocol/snapshots/tradePull.ts`
**Purpose:** Item removed from trade
**Priority:** HIGH
**C++ Reference:** `SNAPSHOTTYPE_TRADEPULL`

**Structure:**
```typescript
export class TradePullSnapshot {
  constructor(
    slotIndex: number,
    isOwnItem: boolean
  ) {
    // Write trade item removal
  }
}
```

### 4. PARTY_MEMBER (0x0082)
**File:** `src/protocol/snapshots/partyMember.ts`
**Purpose:** Party member updates
**Priority:** MEDIUM
**C++ Reference:** `SNAPSHOTTYPE_PARTYMEMBER`

**Structure:**
```typescript
export class PartyMemberSnapshot {
  constructor(
    member: Player,
    updateType: PartyUpdateType
  ) {
    // Write party member data
    // Include HP, MP, level, location
  }
}
```

### 5. GUILD (0x009e)
**File:** `src/protocol/snapshots/guild.ts`
**Purpose:** Guild information updates
**Priority:** LOW
**C++ Reference:** `SNAPSHOTTYPE_GUILD`

**Structure:**
```typescript
export class GuildSnapshot {
  constructor(
    guild: Guild,
    updateType: GuildUpdateType
  ) {
    // Write guild data
    // Include members, ranks, war status
  }
}
```

## 🔧 Technical Implementation Details

### Chat System Architecture
```typescript
enum ChatType {
  SAY = 0,          // Local chat
  SHOUT = 1,        // Area/map chat
  WHISPER = 2,      // Private message
  PARTY = 3,        // Party chat
  GUILD = 4,        // Guild chat
  NOTICE = 5,       // System notices
  GM = 6            // GM messages
}

interface ChatMessage {
  senderId: number;
  senderName: string;
  message: string;
  chatType: ChatType;
  timestamp: Date;
}
```

### Trading System
```typescript
interface TradeSession {
  trader1: Player;
  trader2: Player;
  trader1Items: Map<number, TradeItem>;
  trader2Items: Map<number, TradeItem>;
  trader1Gold: number;
  trader2Gold: number;
  trader1Ready: boolean;
  trader2Ready: boolean;
  tradeState: TradeState;
}

enum TradeState {
  REQUESTING = 0,
  ACTIVE = 1,
  CONFIRMING = 2,
  COMPLETED = 3,
  CANCELLED = 4
}
```

### Party System
```typescript
interface Party {
  id: number;
  leaderId: number;
  members: Player[];
  expShareMode: ExpShareMode;
  itemShareMode: ItemShareMode;
  maxMembers: number;
}

enum ExpShareMode {
  INDIVIDUAL = 0,
  EQUAL_SHARE = 1,
  LEVEL_BASED = 2
}
```

### Guild System
```typescript
interface Guild {
  id: number;
  name: string;
  masterId: number;
  members: GuildMember[];
  level: number;
  experience: number;
  gold: number;
  notice: string;
  warState: GuildWarState;
}

interface GuildMember {
  playerId: number;
  rank: GuildRank;
  contribution: number;
  joinDate: Date;
}
```

## 🧪 Testing Checklist

### Chat System:
- [x] ~~Say messages appear to nearby players~~ **NORMAL chat implemented and working**
- [ ] Whispers reach target player only
- [ ] Shouts broadcast to appropriate range
- [ ] Chat filters work correctly
- [ ] GM chat has special formatting

### Trading:
- [ ] Trade requests can be sent and received
- [ ] Items can be added to trade window
- [ ] Items can be removed from trade
- [ ] Gold can be added to trade
- [ ] Trade completes when both players confirm
- [ ] Trade cancellation works properly
- [ ] Invalid trades are rejected

### Party System:
- [ ] Players can form parties
- [ ] Party members share experience
- [ ] Party member status updates
- [ ] Party leader can manage members
- [ ] Party chat reaches all members

### Guild System:
- [ ] Guilds can be created
- [ ] Members can be invited/removed
- [ ] Guild chat functions
- [ ] Guild ranks and permissions work
- [ ] Guild wars can be declared

## 📋 Dependencies
- [ ] Player online status tracking
- [ ] Cross-server communication (for whispers)
- [ ] Chat logging and moderation system
- [ ] Trade security and validation
- [ ] Party experience calculation
- [ ] Guild database storage

## 🚀 Implementation Order

### Phase 4A - Basic Communication:
1. [x] ~~**SAY** packet + chat snapshot~~ **COMPLETED - Basic NORMAL chat working**
2. **WHISPER** packet for private messages
3. **SHOUT** packet for area chat

### Phase 4B - Trading System:
1. **TRADE** packet + snapshot (initiate trading)
2. **TRADEPUT/TRADEPULL** packets + snapshots (manage items)
3. **TRADEOK/TRADECANCEL** packets (complete/cancel trades)

### Phase 4C - Social Systems:
1. **PARTY** system packets and snapshots
2. **GUILD** system packets and snapshots
3. **FRIEND** system for buddy lists

## ⚠️ Known Issues & Considerations
- **Security:** Validate all trade operations to prevent duplication
- **Performance:** Large guilds can impact server performance
- **Spam Prevention:** Implement chat rate limiting
- **Cross-Server:** Consider multi-server guild/party support
- **Storage:** Guild and party data needs persistent storage
- **Moderation:** Chat logging for administrative purposes

## 🎮 Social Features by Priority

### Essential:
- Local chat (say)
- Private messages (whisper)
- Basic trading

### Important:
- Party system
- Guild basics
- Friend lists

### Nice-to-Have:
- Advanced guild features
- Guild wars
- Chat channels
- Emote system

## 📖 References
- Chat System: Message broadcasting and filtering
- Trade System: Secure item exchange mechanics
- Party System: Group management and experience sharing
- Guild System: Large-scale social organization
- Friend System: Social connection tracking