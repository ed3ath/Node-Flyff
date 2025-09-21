// Final detailed analysis
const hexData = '5E D7 39 DC 95 0C 00 00 00 ED 3C CF F9 FF FF FF FF 0B 00 00 00 C5 1C 0E 00 5E 20 26 47 17 48 00 00 00 D7 2E 34 7C FF FF FF FF F6 00 00 00 08 00 00 00 32 30 31 30 30 34 31 32 00 00 00 00 04 00 00 00 74 65 73 74 20 00 00 00 38 39 64 31 65 64 32 32 61 61 63 35 38 66 35 62 62 65 61 35 33 62 32 66 64 65 38 31 61 39 34 36 F5 D0 B5 65';

const buffer = Buffer.from(hexData.replace(/\s+/g, ''), 'hex');

console.log('Final analysis with correct F6 position at 42...');

// We know F6 is at position 42, so let's work backwards to understand the structure
console.log('Working backwards from F6 at position 42...');

// Check what's at position 42
console.log(`Pos 42-45: ${buffer.subarray(42, 46).toString('hex')} = F6 command`);

// Check structure before F6
console.log('\nAnalyzing structure before F6:');

// Position 0: Header
console.log(`Pos 0: ${buffer[0].toString(16)} (header)`);

// The structure appears to be multiple sections, let me try to identify them
console.log('\nTrying to identify sections:');

// Section 1: bytes 1-4 (could be total length)
const section1 = buffer.readUInt32LE(1);
console.log(`Pos 1-4: ${section1} (0x${section1.toString(16)}) - possibly total packet length`);

// Section 2: bytes 5-8
const section2 = buffer.readUInt32LE(5);
console.log(`Pos 5-8: ${section2} (0x${section2.toString(16)})`);

// Section 3: check if this is a length+data pattern
if (section2 === 12) { // 0x0C = 12 bytes
    console.log(`  Section 2 indicates 12 bytes of data following...`);
    console.log(`  Data: ${buffer.subarray(9, 9 + 12).toString('hex')}`);

    // After 12 bytes of data, check next section
    const nextPos = 9 + 12; // = 21
    const section3 = buffer.readUInt32LE(nextPos);
    console.log(`Pos ${nextPos}-${nextPos+3}: ${section3} (0x${section3.toString(16)})`);

    if (section3 === 11) { // 0x0B = 11 bytes
        console.log(`  Section 3 indicates 11 bytes of data following...`);
        const dataStart = nextPos + 4;
        console.log(`  Data: ${buffer.subarray(dataStart, dataStart + 11).toString('hex')}`);

        // Continue pattern
        const nextPos2 = dataStart + 11; // Should be around 36
        console.log(`Next position should be around ${nextPos2}`);

        if (nextPos2 < buffer.length - 4) {
            const section4 = buffer.readUInt32LE(nextPos2);
            console.log(`Pos ${nextPos2}-${nextPos2+3}: ${section4} (0x${section4.toString(16)})`);

            // Check if this gets us to F6
            const afterSection4 = nextPos2 + 4 + section4;
            console.log(`After section 4 data, position would be: ${afterSection4}`);

            if (Math.abs(afterSection4 - 42) <= 2) {
                console.log('✅ This pattern leads us close to the F6 position!');
            }
        }
    }
}

// Let me implement the correct dynamic parsing based on this analysis
console.log('\n=== Implementing correct dynamic parsing ===');

function parsePacketDynamic(buffer) {
    let pos = 0;

    // Header
    const header = buffer[pos++];
    console.log(`Header: 0x${header.toString(16)}`);

    // Skip total packet length (4 bytes)
    const totalLength = buffer.readUInt32LE(pos);
    pos += 4;
    console.log(`Total length: ${totalLength} (skipping)`);

    // Read first section length and data
    const section1Length = buffer.readUInt32LE(pos);
    pos += 4;
    console.log(`Section 1 length: ${section1Length}`);
    pos += section1Length; // Skip section 1 data

    // Read second section length and data
    const section2Length = buffer.readUInt32LE(pos);
    pos += 4;
    console.log(`Section 2 length: ${section2Length}`);
    pos += section2Length; // Skip section 2 data

    // Read third section length and data
    const section3Length = buffer.readUInt32LE(pos);
    pos += 4;
    console.log(`Section 3 length: ${section3Length}`);
    pos += section3Length; // Skip section 3 data

    // Now we should be at the packet type
    const packetType = buffer.readUInt32LE(pos);
    console.log(`Packet type at pos ${pos}: 0x${packetType.toString(16).padStart(8, '0')}`);

    return packetType;
}

const result = parsePacketDynamic(buffer);

if (result === 0x000000f6) {
    console.log('✅ SUCCESS: Dynamic parsing correctly identified F6 packet!');
} else {
    console.log('❌ FAILED: Expected F6 but got 0x' + result.toString(16));
}