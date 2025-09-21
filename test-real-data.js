// Test with the actual logged data
const { PacketType } = require('./build/protocol/packetType.js');

const hexData1 = '5E D1 C9 4E A6 0C 00 00 00 23 F8 67 56 FF FF FF FF 0B 00 00 00 DA A7 2D 00 5E 26 D6 D5 24 48 00 00 00 55 8C F3 DF FF FF FF FF F6 00 00 00 08 00 00 00 32 30 31 30 30 34 31 32 00 00 00 00 04 00 00 00 74 65 73 74 20 00 00 00 38 39 64 31 65 64 32 32 61 61 63 35 38 66 35 62 62 65 61 35 33 62 32 66 64 65 38 31 61 39 34 36 52 AE AE 76';
const hexData2 = '5E D1 C9 4E A6 0C 00 00 00 17 32 5B C5 FF FF FF FF 14 00 00 00 77 C5 2D 00';

function testParsing(hexData, testName) {
    console.log(`\n=== Testing ${testName} ===`);
    const buffer = Buffer.from(hexData.replace(/\s+/g, ''), 'hex');
    console.log(`Buffer length: ${buffer.length}`);

    function isValidPacketType(value) {
        return Object.values(PacketType).includes(value);
    }

    function simulateNewParsing(buffer) {
        let position = 0;

        // Header
        const header = buffer[position++];
        console.log(`Header: 0x${header.toString(16)}`);

        // Skip the first 4 bytes after header
        position += 4;
        console.log(`After skipping 4 bytes, position: ${position}`);

        let packetType = undefined;

        // Parse variable-length sections more carefully
        while (position < buffer.length - 4) {
            // Save current position in case we need to backtrack
            const currentPos = position;
            const value = buffer.readUInt32LE(position);
            position += 4;

            console.log(`Position ${currentPos}: Read value = ${value} (0x${value.toString(16)})`);

            // Check if this is a valid packet type
            if (isValidPacketType(value)) {
                console.log(`  -> Valid packet type found!`);
                packetType = value;
                position = currentPos + 4; // Keep position after the packet type
                break;
            }

            // Check if this looks like a reasonable length field (1-50 bytes)
            if (value > 0 && value <= 50 && (position + value) <= buffer.length) {
                console.log(`  -> Looks like length field, skipping ${value} bytes`);
                position += value;
            } else {
                console.log(`  -> Not a length field, continuing scan`);
                // position is already advanced
            }
        }

        // Ensure we have a packet type set
        if (packetType === undefined) {
            console.log('Could not determine packet type, using fallback');
            packetType = PacketType.QUERY_TICK_COUNT;
        }

        return { packetType, position };
    }

    const result = simulateNewParsing(buffer);
    console.log(`Final result: PacketType = 0x${result.packetType.toString(16).padStart(8, '0')}, Position = ${result.position}`);

    // Check if it's F6
    if (result.packetType === 0x000000f6) {
        console.log('✅ SUCCESS: Found F6 (GET_CHARACTER_LIST)');
    } else if (result.packetType === 0x00000014) {
        console.log('✅ SUCCESS: Found 14 (PING)');
    } else {
        console.log(`Found packet type: 0x${result.packetType.toString(16)}`);
    }
}

testParsing(hexData1, 'First packet (110 bytes)');
testParsing(hexData2, 'Second packet (25 bytes)');