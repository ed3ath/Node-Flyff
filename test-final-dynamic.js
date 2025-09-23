// Test the final dynamic parsing approach
const hexData = '5E D7 39 DC 95 0C 00 00 00 ED 3C CF F9 FF FF FF FF 0B 00 00 00 C5 1C 0E 00 5E 20 26 47 17 48 00 00 00 D7 2E 34 7C FF FF FF FF F6 00 00 00 08 00 00 00 32 30 31 30 30 34 31 32 00 00 00 00 04 00 00 00 74 65 73 74 20 00 00 00 38 39 64 31 65 64 32 32 61 61 63 35 38 66 35 62 62 65 61 35 33 62 32 66 64 65 38 31 61 39 34 36 F5 D0 B5 65';

const buffer = Buffer.from(hexData.replace(/\s+/g, ''), 'hex');

console.log('Testing final dynamic parsing approach...');

function simulateNewParsingLogic(buffer) {
    let position = 0;

    // Header
    const header = buffer[position++];
    console.log(`Header: 0x${header.toString(16)}`);

    // Skip the first 4 bytes after header
    position += 4;
    console.log(`Skipped 4 bytes, now at position ${position}`);

    // Parse variable-length sections dynamically
    while (position < buffer.length - 4) {
        const sectionLength = buffer.readUInt32LE(position);
        console.log(`Position ${position}: Read length = ${sectionLength} (0x${sectionLength.toString(16)})`);

        // Check if this could be the packet type (reasonable packet type range)
        if (sectionLength > 0x000000f0 && sectionLength <= 0x000000ff) {
            // This looks like a packet type, read it as such
            console.log(`  -> This looks like a packet type!`);
            const packetType = buffer.readUInt32LE(position);
            position += 4;
            console.log(`Packet Type: 0x${packetType.toString(16).padStart(8, '0')}`);
            return { packetType, position };
        }

        position += 4; // Move past the length field

        // Check if the length is reasonable (< 100 bytes for hash sections)
        if (sectionLength > 0 && sectionLength < 100) {
            // Skip the data section
            console.log(`  -> Reasonable length, skipping ${sectionLength} bytes of data`);
            position += sectionLength;
        } else {
            // Length seems unreasonable, step back and treat as packet type
            console.log(`  -> Unreasonable length, treating previous 4 bytes as packet type`);
            position -= 4;
            const packetType = buffer.readUInt32LE(position);
            position += 4;
            console.log(`Packet Type: 0x${packetType.toString(16).padStart(8, '0')}`);
            return { packetType, position };
        }

        console.log(`  -> Continuing, now at position ${position}`);
    }

    // Fallback
    console.log(`Reached end of parsing loop at position ${position}`);
    if (position < buffer.length - 4) {
        const packetType = buffer.readUInt32LE(position);
        position += 4;
        console.log(`Fallback - Packet Type: 0x${packetType.toString(16).padStart(8, '0')}`);
        return { packetType, position };
    }

    return { packetType: null, position };
}

const result = simulateNewParsingLogic(buffer);

if (result.packetType === 0x000000f6) {
    console.log('✅ SUCCESS: Dynamic parsing correctly identified F6 packet!');
    console.log(`Final position: ${result.position}`);
} else {
    console.log(`❌ FAILED: Expected F6 but got ${result.packetType ? '0x' + result.packetType.toString(16) : 'null'}`);
}