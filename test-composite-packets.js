// Test composite packet parsing
const { PacketType } = require('./build/protocol/packetType.js');

// The composite packet you provided
const hexData = '5E D7 39 DC 95 0C 00 00 00 ED 3C CF F9 FF FF FF FF 0B 00 00 00 C5 1C 0E 00 5E 20 26 47 17 48 00 00 00 D7 2E 34 7C FF FF FF FF F6 00 00 00 08 00 00 00 32 30 31 30 30 34 31 32 00 00 00 00 04 00 00 00 74 65 73 74 20 00 00 00 38 39 64 31 65 64 32 32 61 61 63 35 38 66 35 62 62 65 61 35 33 62 32 66 64 65 38 31 61 39 34 36 F5 D0 B5 65';

function simulateCompositePacketParsing(hexData) {
    console.log('=== Testing Composite Packet Parsing ===');
    const buffer = Buffer.from(hexData.replace(/\s+/g, ''), 'hex');
    console.log(`Buffer length: ${buffer.length}`);

    function isValidPacketType(value) {
        return Object.values(PacketType).includes(value);
    }

    // Parse the main packet structure first
    let position = 0;

    // Header
    const header = buffer[position++];
    console.log(`Header: 0x${header.toString(16)}`);

    // Form #2 structure for cluster/world
    position += 4; // Skip length hash
    const packetLength = buffer.readUInt32LE(position);
    position += 4;
    console.log(`Packet length: ${packetLength}`);

    position += 4; // Skip data hash

    const marker = buffer.readUInt32LE(position);
    position += 4;
    console.log(`Marker: 0x${marker.toString(16)}`);

    const firstCommand = buffer.readUInt32LE(position);
    position += 4;
    console.log(`First command: 0x${firstCommand.toString(16).padStart(8, '0')} at position ${position - 4}`);

    // Store composite packets
    const compositePackets = [{
        packetType: firstCommand,
        dataStartPosition: position,
        commandPosition: position - 4
    }];

    console.log(`\nScanning from position ${position} for additional commands...`);

    // Scan for additional commands using the pattern: [FF FF FF FF] [Command]
    while (position < buffer.length - 8) {
        let foundCommand = false;

        // Look for 0xFFFFFFFF marker followed by valid packet type
        for (let i = position; i <= buffer.length - 8; i++) {
            if (buffer.readUInt32LE(i) === 0xFFFFFFFF) {
                const potentialCommand = buffer.readUInt32LE(i + 4);

                if (isValidPacketType(potentialCommand) && potentialCommand !== firstCommand) {
                    console.log(`Found additional command: 0x${potentialCommand.toString(16).padStart(8, '0')} at position ${i + 4}`);

                    compositePackets.push({
                        packetType: potentialCommand,
                        dataStartPosition: i + 8,
                        commandPosition: i + 4
                    });

                    position = i + 8; // Move past this command
                    foundCommand = true;
                    break;
                }
            }
        }

        if (!foundCommand) {
            break;
        }
    }

    // Calculate data for each packet
    for (let i = 0; i < compositePackets.length; i++) {
        const currentPacket = compositePackets[i];
        const nextPacket = compositePackets[i + 1];

        if (nextPacket) {
            // Data goes from current data start to next command position
            const dataLength = nextPacket.commandPosition - currentPacket.dataStartPosition;
            currentPacket.dataLength = Math.max(0, dataLength);
        } else {
            // Last packet - data goes to end
            currentPacket.dataLength = buffer.length - currentPacket.dataStartPosition;
        }

        currentPacket.data = buffer.subarray(
            currentPacket.dataStartPosition,
            currentPacket.dataStartPosition + currentPacket.dataLength
        );
    }

    console.log(`\n=== Results ===`);
    console.log(`Found ${compositePackets.length} commands in composite packet:`);

    compositePackets.forEach((packet, index) => {
        console.log(`\nPacket ${index + 1}:`);
        console.log(`  Command: 0x${packet.packetType.toString(16).padStart(8, '0')}`);
        console.log(`  Data start: ${packet.dataStartPosition}`);
        console.log(`  Data length: ${packet.dataLength}`);
        console.log(`  Data: ${packet.data.toString('hex')}`);

        // Special handling for known packet types
        if (packet.packetType === 0x0000000B) {
            console.log(`  Type: QUERY_TICK_COUNT`);
        } else if (packet.packetType === 0x000000F6) {
            console.log(`  Type: GET_CHARACTER_LIST`);

            // Try to parse the character list data
            if (packet.data.length > 8) {
                let dataPos = 0;
                try {
                    const dateLength = packet.data.readUInt32LE(dataPos);
                    dataPos += 4;
                    if (dateLength <= packet.data.length - dataPos) {
                        const date = packet.data.subarray(dataPos, dataPos + dateLength).toString();
                        dataPos += dateLength;
                        console.log(`    Date: ${date}`);

                        if (dataPos + 4 <= packet.data.length) {
                            const usernameLength = packet.data.readUInt32LE(dataPos);
                            dataPos += 4;
                            if (usernameLength <= packet.data.length - dataPos) {
                                const username = packet.data.subarray(dataPos, dataPos + usernameLength).toString();
                                dataPos += usernameLength;
                                console.log(`    Username: ${username}`);

                                if (dataPos + 4 <= packet.data.length) {
                                    const passwordLength = packet.data.readUInt32LE(dataPos);
                                    dataPos += 4;
                                    if (passwordLength <= packet.data.length - dataPos) {
                                        const password = packet.data.subarray(dataPos, dataPos + passwordLength).toString();
                                        console.log(`    Password Hash: ${password}`);
                                    }
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.log(`    Error parsing data: ${e.message}`);
                }
            }
        }
    });

    return compositePackets;
}

simulateCompositePacketParsing(hexData);