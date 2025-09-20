# Player Join Flow Test Guide

This guide explains how to test the complete player join communication logic from login to world entry.

## The Flow Implementation

Based on the original C++ Neuz client flow, the Node.js implementation now supports the complete sequence:

### 1. Login Phase
- Client connects to Login Server (port 23000)
- Sends `CERTIFY` packet with credentials
- Receives `SERVER_LIST` packet

### 2. Cluster/Character Selection Phase
- Client connects to Cluster Server (port 28000)
- Sends `GET_CHARACTER_LIST` packet
- Receives character list and optionally `LOGIN_PROTECT_NUMPAD` for PIN
- Sends `PRE_JOIN` packet to start character selection
- If PIN protection enabled:
  - Receives `LOGIN_PROTECT_CERT` with success/failure
  - On success, proceeds; on failure, gets new numpad
- Sends `SEL_PLAYER` packet to select character
- Receives `PLAYER_ID` packet with authKey for world server

### 3. World Server Transition
- Client connects to World Server (port 5400)
- Sends `JOIN_GAME` packet with authKey and character details
- Receives `SNAPSHOT` packet containing world state and spawns successfully

## Key Implementation Features

### PIN Protection (Login Protect)
- Configurable via `cluster_server.settings["login-protect"]`
- Uses numpad scrambling to secure PIN entry
- Validates against character's `bankPin` field
- Generates new numpad on failed attempts

### Comprehensive Logging
All packet handlers now include detailed logging:
- **prejoin.ts**: Logs PIN verification process step by step
- **selectPlayer.ts**: Logs character validation and authKey generation
- **joinGame.ts**: Logs complete world server join process
- **testClient.ts**: Shows client-side packet flow

### Database Integration
- Validates credentials against database accounts
- Loads character data with relationships (equipments, items)
- Initializes player state (position, stats, inventory, etc.)
- Supports character lookup by ID and name fallback

## Testing the Flow

### Prerequisites

1. **Start all servers** in separate terminals:
   ```bash
   # Terminal 1 - Login Server
   npm run dev login

   # Terminal 2 - Cluster Server
   npm run dev cluster

   # Terminal 3 - World Server
   npm run dev world
   ```

2. **Setup test data** (if needed):
   ```bash
   npx ts-node src/setupTestData.ts
   ```

### Running the Test Client

```bash
npm run test-client
```

### Expected Output

The test client will show a complete flow like this:

```
Connected to 127.0.0.1:23000 (LOGIN)
Sent CERTIFY packet
Received packet: WELCOME (0x0)
Session ID: 1234567
Received packet: SERVER_LIST (0xfd)
Received server list

Connected to 127.0.0.1:28000 (CLUSTER)
Sent GET_CHARACTER_LIST packet
Received packet: CHARACTER_LIST (0xf3)
Received character list
Sent PRE_JOIN packet
Received packet: LOGIN_PROTECT_NUMPAD (0x88100200)
Received numpad ID: 123
Sent PRE_JOIN packet with PIN: 1234
Received packet: LOGIN_PROTECT_CERT (0x88100201)
PIN verification result: SUCCESS
PIN verification successful, selecting character
Sent SEL_PLAYER packet
Received packet: PLAYER_ID (0xff)
Received auth key: 1876543210

Connected to 127.0.0.1:5400 (WORLD)
Sent JOIN_GAME packet
Received packet: SNAPSHOT (0xffffff00)
Received SNAPSHOT packet - join successful!
Successfully joined world server with character ID 1
```

### Server Log Output

Each server will show detailed logs of the packet handling process:

**Cluster Server Logs:**
```
[ClusterServer] PRE_JOIN received for user: testuser, character: testchar (ID: 1), secretNum: 1234
[ClusterServer] Login protection enabled, verifying PIN for character: testchar
[ClusterServer] Extracted PIN: 1234, Character PIN: 1234
[ClusterServer] PIN verification result: SUCCESS
[ClusterServer] PIN verification successful for testchar, sending PRE_JOIN acknowledgment
[ClusterServer] SEL_PLAYER received for characterId: 1
[ClusterServer] Generated authKey: 1876543210 for character: testchar (1)
[ClusterServer] Sent PLAYER_ID with authKey: 1876543210 - client should now connect to world server
```

**World Server Logs:**
```
[WorldServer] JOIN_GAME received from user: testuser
[WorldServer]   Character ID: 1
[WorldServer]   Auth Key: 1876543210
[WorldServer] Account validation successful for user: testuser (Account ID: 1)
[WorldServer] Character validation successful: testchar (ID: 1) for user: testuser
[WorldServer] Creating join complete snapshot for character: testchar
[WorldServer] Sending SNAPSHOT packet to client for character: testchar
[WorldServer] ✓ Character testchar (ID: 1) joined world server successfully! AuthKey: 1876543210
[WorldServer] ✓ Player spawned in world at position (6968, 3328, 0) on map 1
```

## Troubleshooting

### Common Issues

1. **"Character not found"** - Make sure test data is set up
2. **"PIN verification failed"** - Check that bankPin in database matches test PIN (1234)
3. **"Connection refused"** - Ensure all servers are running on correct ports
4. **Database errors** - Verify database entities are properly configured

### Debug Options

- Enable packet hex dumps by uncommenting debug lines in packet handlers
- Check Redis connectivity for numpad storage
- Verify database relationships are loading correctly
- Monitor network connections between servers

## Configuration

Key settings in server configs:

```yaml
cluster_server:
  settings:
    login-protect: true  # Enable/disable PIN protection
```

The implementation successfully replicates the original C++ client flow while adding modern Node.js features like comprehensive logging, database integration, and error handling.