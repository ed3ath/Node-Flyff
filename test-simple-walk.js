// Simple walk through the structure to position 42
const hexData = '5E D7 39 DC 95 0C 00 00 00 ED 3C CF F9 FF FF FF FF 0B 00 00 00 C5 1C 0E 00 5E 20 26 47 17 48 00 00 00 D7 2E 34 7C FF FF FF FF F6 00 00 00 08 00 00 00 32 30 31 30 30 34 31 32 00 00 00 00 04 00 00 00 74 65 73 74 20 00 00 00 38 39 64 31 65 64 32 32 61 61 63 35 38 66 35 62 62 65 61 35 33 62 32 66 64 65 38 31 61 39 34 36 F5 D0 B5 65';

const buffer = Buffer.from(hexData.replace(/\s+/g, ''), 'hex');

console.log('Walking to position 42 step by step...');

let pos = 0;

// Header at 0
console.log(`Pos ${pos}: Header = 0x${buffer[pos].toString(16)}`);
pos++; // pos = 1

// Skip first 4 bytes (1-4)
console.log(`Pos ${pos}-${pos+3}: ${buffer.subarray(pos, pos+4).toString('hex')} (skipping)`);
pos += 4; // pos = 5

// Check what's at position 5-8
const len1 = buffer.readUInt32LE(pos);
console.log(`Pos ${pos}-${pos+3}: Length = ${len1} (0x${len1.toString(16)})`);
pos += 4; // pos = 9

console.log(`Pos ${pos}-${pos+len1-1}: Data (${len1} bytes) = ${buffer.subarray(pos, pos+len1).toString('hex')}`);
pos += len1; // pos = 9 + 12 = 21

// Check what's at position 21-24
const len2 = buffer.readUInt32LE(pos);
console.log(`Pos ${pos}-${pos+3}: Length = ${len2} (0x${len2.toString(16)})`);

// This length is way too big, so the structure is wrong
// Let me try a different approach - since we know F6 is at 42, let's see what pattern gets us there

console.log('\n=== Alternative approach ===');
console.log('We know F6 is at position 42. Let me try different parsing strategies...');

// Strategy: The hash structure might not be straightforward length+data
// Let me check if there's a pattern in the bytes before position 42

pos = 1;
console.log('\nExamining bytes 1-41 to understand the pattern:');

// Check for potential 4-byte aligned patterns
for (let i = 1; i < 42; i += 4) {
    if (i + 3 < buffer.length) {
        const val = buffer.readUInt32LE(i);
        console.log(`Pos ${i.toString().padStart(2)}: 0x${val.toString(16).padStart(8, '0')} (${val})`);

        // Check if this could be a reasonable length
        if (val > 0 && val < 50) {
            console.log(`  ^ This could be a length field (${val} bytes)`);
        }
    }
}

// Let me try the documented structure more carefully
console.log('\n=== Trying documented protocol structure ===');
// [5E] [HASH-Length] [INT-Length] [HASH-Data] [INT-Data] [FC-Command]

pos = 1;
// First 4 bytes after header might be hash length
const hashLen = buffer.readUInt32LE(pos);
console.log(`Hash length: ${hashLen} (0x${hashLen.toString(16)})`);

// This is too big, but maybe it's the entire hash section including nested parts
// Let me just try to find a working pattern by trial

console.log('\n=== Manual positioning test ===');
// Try different fixed offsets to see which one lands us at F6
const testOffsets = [17, 21, 25, 29, 33, 37, 41];

for (const offset of testOffsets) {
    if (offset + 4 <= buffer.length) {
        const val = buffer.readUInt32LE(offset);
        console.log(`Offset ${offset}: 0x${val.toString(16).padStart(8, '0')}`);
        if (val === 0x000000f6) {
            console.log(`  *** FOUND F6 at offset ${offset}! ***`);
            console.log(`  This means we need to skip ${offset - 1} bytes after the header`);
            break;
        }
    }
}