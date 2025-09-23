// Test the documented FlyFF packet structure
const { PacketType } = require('./build/protocol/packetType.js');

const hexData1 = '5E D1 C9 4E A6 0C 00 00 00 23 F8 67 56 FF FF FF FF 0B 00 00 00 DA A7 2D 00 5E 26 D6 D5 24 48 00 00 00 55 8C F3 DF FF FF FF FF F6 00 00 00 08 00 00 00 32 30 31 30 30 34 31 32 00 00 00 00 04 00 00 00 74 65 73 74 20 00 00 00 38 39 64 31 65 64 32 32 61 61 63 35 38 66 35 62 62 65 61 35 33 62 32 66 64 65 38 31 61 39 34 36 52 AE AE 76';

function testDocumentedStructure(hexData, testName) {
    console.log(`\n=== Testing ${testName} with documented structure ===`);
    const buffer = Buffer.from(hexData.replace(/\s+/g, ''), 'hex');
    console.log(`Buffer length: ${buffer.length}`);

    function simulateDocumentedParsing(buffer, isLogin = false) {
        let position = 0;

        // Read header
        const header = buffer[position++];
        console.log(`Header: 0x${header.toString(16)}`);

        if (isLogin) {
            // Form #1 - Login server packets:
            // [5E] [int] Length hash [int] Packet length [int] Data hash [int] Command
            const lengthHash = buffer.readUInt32LE(position);
            position += 4;
            console.log(`Length hash: 0x${lengthHash.toString(16)}`);

            const packetLength = buffer.readUInt32LE(position);
            position += 4;
            console.log(`Packet length: ${packetLength}`);

            const dataHash = buffer.readUInt32LE(position);
            position += 4;
            console.log(`Data hash: 0x${dataHash.toString(16)}`);

            const command = buffer.readUInt32LE(position);
            position += 4;
            console.log(`Command: 0x${command.toString(16).padStart(8, '0')}`);

            return { command, position };
        } else {
            // Form #2 - Cluster/World server packets:
            // [5E] [int] Length hash [int] Packet length [int] Data hash [int] -1 (0xFFFFFFFF) [int] Command
            const lengthHash = buffer.readUInt32LE(position);
            position += 4;
            console.log(`Length hash: 0x${lengthHash.toString(16)}`);

            const packetLength = buffer.readUInt32LE(position);
            position += 4;
            console.log(`Packet length: ${packetLength}`);

            const dataHash = buffer.readUInt32LE(position);
            position += 4;
            console.log(`Data hash: 0x${dataHash.toString(16)}`);

            const marker = buffer.readUInt32LE(position);
            position += 4;
            console.log(`Marker: 0x${marker.toString(16)} (expected: 0xffffffff)`);

            if (marker === 0xFFFFFFFF) {
                const command = buffer.readUInt32LE(position);
                position += 4;
                console.log(`Command: 0x${command.toString(16).padStart(8, '0')}`);
                return { command, position };
            } else {
                console.log(`Marker is not 0xFFFFFFFF, treating marker as command`);
                return { command: marker, position };
            }
        }
    }

    // Test as cluster/world packet (Form #2)
    console.log('\n--- Testing as Cluster/World packet (Form #2) ---');
    const result = simulateDocumentedParsing(buffer, false);

    if (result.command === 0x000000f6) {
        console.log('✅ SUCCESS: Found F6 (GET_CHARACTER_LIST)');
    } else {
        console.log(`Found command: 0x${result.command.toString(16)}`);
    }

    console.log(`Final position: ${result.position}`);

    // Also test as login packet (Form #1) for comparison
    console.log('\n--- Testing as Login packet (Form #1) ---');
    const loginResult = simulateDocumentedParsing(buffer, true);
    console.log(`Login parsing result: 0x${loginResult.command.toString(16)}, position: ${loginResult.position}`);
}

const hexData2 = '5E D1 C9 4E A6 0C 00 00 00 17 32 5B C5 FF FF FF FF 14 00 00 00 77 C5 2D 00';

testDocumentedStructure(hexData1, 'First packet (110 bytes)');
testDocumentedStructure(hexData2, 'Second packet (25 bytes)');