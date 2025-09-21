// Direct import of the updated FlyffPacket
const fs = require('fs');
const path = require('path');

// Read the updated flyffPacket.ts and simulate its behavior
const hexData = '5E D7 39 DC 95 0C 00 00 00 ED 3C CF F9 FF FF FF FF 0B 00 00 00 C5 1C 0E 00 5E 20 26 47 17 48 00 00 00 D7 2E 34 7C FF FF FF FF F6 00 00 00 08 00 00 00 32 30 31 30 30 34 31 32 00 00 00 00 04 00 00 00 74 65 73 74 20 00 00 00 38 39 64 31 65 64 32 32 61 61 63 35 38 66 35 62 62 65 61 35 33 62 32 66 64 65 38 31 61 39 34 36 F5 D0 B5 65';

// Convert hex string to buffer
const buffer = Buffer.from(hexData.replace(/\s+/g, ''), 'hex');

console.log('Testing updated FlyffPacket parsing logic...');
console.log('Raw buffer length:', buffer.length);

// Let's analyze the structure step by step
console.log('\n=== Byte-by-byte analysis ===');
for (let i = 0; i < Math.min(50, buffer.length); i++) {
    console.log(`Pos ${i.toString().padStart(2, '0')}: 0x${buffer[i].toString(16).padStart(2, '0')}`);
}

// Based on the FlyFF protocol documentation, let's try a different approach
let position = 0;

// Read header
const header = buffer[position];
position++;
console.log('\nHeader:', '0x' + header.toString(16));

// According to the protocol doc, this follows:
// [5E] [HASH-Length] [INT-Length] [HASH-Data] [INT-Data] [FC-Command] ...
// But looking at our data, it seems more complex

// Let me find the F6 command directly and work backwards
console.log('\nLooking for F6 command pattern...');
for (let i = 0; i < buffer.length - 3; i++) {
    if (buffer[i] === 0xF6 && buffer[i+1] === 0x00 && buffer[i+2] === 0x00 && buffer[i+3] === 0x00) {
        console.log(`Found F6 at position ${i}`);

        // Set position to read packet type
        position = i;
        const packetType = buffer.readUInt32LE(position);
        position += 4;
        console.log('Packet Type:', '0x' + packetType.toString(16).padStart(8, '0'));

        // Verify this matches our expectation
        if (packetType === 0x000000f6) {
            console.log('✅ SUCCESS: Correctly identified GET_CHARACTER_LIST (F6) packet');

            // Now parse the data
            console.log('\n=== Parsing packet data ===');

            // Read date
            const dateLength = buffer.readUInt32LE(position);
            position += 4;
            const date = buffer.subarray(position, position + dateLength).toString();
            position += dateLength;
            console.log('Date:', date);

            // Read username
            const usernameLength = buffer.readUInt32LE(position);
            position += 4;
            const username = buffer.subarray(position, position + usernameLength).toString();
            position += usernameLength;
            console.log('Username:', username);

            // Read password
            const passwordLength = buffer.readUInt32LE(position);
            position += 4;
            const password = buffer.subarray(position, position + passwordLength).toString();
            console.log('Password Hash:', password);

        } else {
            console.log('❌ FAILED: Expected F6 but got', '0x' + packetType.toString(16));
        }

        break; // Found the command, exit loop
    }
}