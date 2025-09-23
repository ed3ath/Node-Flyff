// Test the dynamic parsing logic
const hexData = '5E D7 39 DC 95 0C 00 00 00 ED 3C CF F9 FF FF FF FF 0B 00 00 00 C5 1C 0E 00 5E 20 26 47 17 48 00 00 00 D7 2E 34 7C FF FF FF FF F6 00 00 00 08 00 00 00 32 30 31 30 30 34 31 32 00 00 00 00 04 00 00 00 74 65 73 74 20 00 00 00 38 39 64 31 65 64 32 32 61 61 63 35 38 66 35 62 62 65 61 35 33 62 32 66 64 65 38 31 61 39 34 36 F5 D0 B5 65';

const buffer = Buffer.from(hexData.replace(/\s+/g, ''), 'hex');

console.log('Testing dynamic parsing logic...');
console.log('Raw buffer length:', buffer.length);

// Simulate the new dynamic parsing
let position = 0;

// Read header
const header = buffer[position];
position++;
console.log('Header:', '0x' + header.toString(16));

// Read packet data length (total packet size)
const packetDataLength = buffer.readUInt32LE(position);
position += 4;
console.log('Packet data length:', packetDataLength, '(0x' + packetDataLength.toString(16) + ')');

// Read hash length
const hashLength = buffer.readUInt32LE(position);
position += 4;
console.log('Hash length:', hashLength, '(0x' + hashLength.toString(16) + ')');

// Skip hash data
console.log('Skipping', hashLength, 'bytes of hash data');
position += hashLength;

// Read data length
const dataLength = buffer.readUInt32LE(position);
position += 4;
console.log('Data length:', dataLength, '(0x' + dataLength.toString(16) + ')');

// Skip additional hash/verification data
console.log('Skipping', dataLength, 'bytes of additional data');
position += dataLength;

// Now read the packet type
const packetType = buffer.readUInt32LE(position);
position += 4;
console.log('Packet Type:', '0x' + packetType.toString(16).padStart(8, '0'));

// Verify
if (packetType === 0x000000f6) {
    console.log('✅ SUCCESS: Correctly identified GET_CHARACTER_LIST (F6) packet with dynamic parsing');
} else {
    console.log('❌ FAILED: Expected F6 but got', '0x' + packetType.toString(16));
    console.log('Current position:', position);
    console.log('Remaining bytes:', buffer.length - position);
}