// Analyze the exact structure step by step
const hexData = '5E D7 39 DC 95 0C 00 00 00 ED 3C CF F9 FF FF FF FF 0B 00 00 00 C5 1C 0E 00 5E 20 26 47 17 48 00 00 00 D7 2E 34 7C FF FF FF FF F6 00 00 00 08 00 00 00 32 30 31 30 30 34 31 32 00 00 00 00 04 00 00 00 74 65 73 74 20 00 00 00 38 39 64 31 65 64 32 32 61 61 63 35 38 66 35 62 62 65 61 35 33 62 32 66 64 65 38 31 61 39 34 36 F5 D0 B5 65';

const buffer = Buffer.from(hexData.replace(/\s+/g, ''), 'hex');

console.log('Analyzing packet structure...');
console.log('Total length:', buffer.length);

// Print every 4 bytes as both little-endian and big-endian integers
console.log('\n=== 4-byte chunks analysis ===');
for (let i = 0; i < buffer.length - 3; i += 4) {
    const le = buffer.readUInt32LE(i);
    const be = buffer.readUInt32BE(i);
    const bytes = Array.from(buffer.subarray(i, i + 4)).map(b => b.toString(16).padStart(2, '0')).join(' ');
    console.log(`Pos ${i.toString().padStart(2, '0')}: [${bytes}] LE=${le.toString().padStart(10)} BE=${be.toString().padStart(10)} (0x${le.toString(16).padStart(8, '0')})`);

    // Check if this could be the F6 command
    if (le === 0x000000f6) {
        console.log(`    *** FOUND F6 COMMAND AT POSITION ${i} ***`);
    }
}

console.log('\n=== Structure Analysis ===');
// Based on FlyFF protocol: [5E] [HASH-Length] [INT-Length] [HASH-Data] [INT-Data] [Command] ...

let pos = 0;
console.log(`Pos ${pos}: Header = 0x${buffer[pos].toString(16)}`);
pos++;

// The next pattern appears to be multiple nested structures
console.log('\nTrying to parse as nested structures...');

// Pattern seems to be: length + data, length + data, etc.
while (pos < buffer.length - 8 && pos < 50) { // Limit to avoid infinite loop
    const length = buffer.readUInt32LE(pos);
    console.log(`Pos ${pos}: Length field = ${length} (0x${length.toString(16)})`);

    if (length > 0 && length < 1000) { // Reasonable length
        pos += 4;
        console.log(`Pos ${pos}: Data (${length} bytes):`, buffer.subarray(pos, pos + Math.min(length, 16)).toString('hex'));
        pos += length;
    } else if (length === 0x000000f6) {
        console.log(`    *** This is the F6 command! ***`);
        break;
    } else {
        console.log(`    Skipping unreasonable length...`);
        pos += 4;
    }

    if (pos >= buffer.length) break;
}