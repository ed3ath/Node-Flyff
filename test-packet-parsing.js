const { FlyffPacket } = require('./build/libraries/flyffPacket.js');

// Test packet data
const hexData = '5E D7 39 DC 95 0C 00 00 00 ED 3C CF F9 FF FF FF FF 0B 00 00 00 C5 1C 0E 00 5E 20 26 47 17 48 00 00 00 D7 2E 34 7C FF FF FF FF F6 00 00 00 08 00 00 00 32 30 31 30 30 34 31 32 00 00 00 00 04 00 00 00 74 65 73 74 20 00 00 00 38 39 64 31 65 64 32 32 61 61 63 35 38 66 35 62 62 65 61 35 33 62 32 66 64 65 38 31 61 39 34 36 F5 D0 B5 65';

// Convert hex string to buffer
const buffer = Buffer.from(hexData.replace(/\s+/g, ''), 'hex');

console.log('Raw buffer length:', buffer.length);
console.log('Raw buffer hex:', buffer.toString('hex'));

// Test with cluster server (login = false)
console.log('\n=== Testing as Cluster Server Packet (login = false) ===');
try {
    const packet = new FlyffPacket(buffer, false, false);
    console.log('Header:', packet.HeaderNumber.toString(16));
    console.log('Packet Type:', packet.PacketType.toString(16));
    console.log('Packet Type (hex):', '0x' + packet.PacketType.toString(16).padStart(8, '0'));

    // Try to read the data manually
    console.log('\n=== Manual parsing ===');
    console.log('Position after header parsing:', packet.position);

    // Read date string
    const dateLength = packet.readInt32LE();
    console.log('Date length:', dateLength);
    const dateStr = packet.readBytes(dateLength).toString();
    console.log('Date:', dateStr);

    // Read username
    const usernameLength = packet.readInt32LE();
    console.log('Username length:', usernameLength);
    const username = packet.readBytes(usernameLength).toString();
    console.log('Username:', username);

    // Read password hash
    const passwordLength = packet.readInt32LE();
    console.log('Password hash length:', passwordLength);
    const passwordHash = packet.readBytes(passwordLength).toString();
    console.log('Password hash:', passwordHash);

} catch (error) {
    console.error('Error parsing packet:', error.message);
}

// Test with login server (login = true)
console.log('\n=== Testing as Login Server Packet (login = true) ===');
try {
    const loginPacket = new FlyffPacket(buffer, true, false);
    console.log('Header:', loginPacket.HeaderNumber.toString(16));
    console.log('Packet Type:', loginPacket.PacketType.toString(16));
    console.log('Packet Type (hex):', '0x' + loginPacket.PacketType.toString(16).padStart(8, '0'));
} catch (error) {
    console.error('Error parsing login packet:', error.message);
}

// Manual byte-by-byte analysis
console.log('\n=== Manual Byte Analysis ===');
let pos = 0;
console.log(`Byte ${pos}: 0x${buffer[pos].toString(16)} (header)`);
pos++;

// Look for packet structure
console.log('Full packet structure analysis:');
for (let i = 0; i < Math.min(50, buffer.length); i++) {
    console.log(`Pos ${i.toString().padStart(2, '0')}: 0x${buffer[i].toString(16).padStart(2, '0')}`);
}

console.log('\nLooking for F6 command...');
for (let i = 0; i < buffer.length - 3; i++) {
    if (buffer[i] === 0xF6 && buffer[i+1] === 0x00 && buffer[i+2] === 0x00 && buffer[i+3] === 0x00) {
        console.log(`Found F6 command at position ${i}`);

        // Parse from F6 position
        console.log('\n=== Parsing from F6 position ===');
        let f6pos = i + 4; // Skip F6 00 00 00

        // Read date length and date
        const dateLen = buffer.readUInt32LE(f6pos);
        f6pos += 4;
        console.log('Date length:', dateLen);
        const date = buffer.subarray(f6pos, f6pos + dateLen).toString();
        f6pos += dateLen;
        console.log('Date:', date);

        // Read username length and username
        const userLen = buffer.readUInt32LE(f6pos);
        f6pos += 4;
        console.log('Username length:', userLen);
        const username = buffer.subarray(f6pos, f6pos + userLen).toString();
        f6pos += userLen;
        console.log('Username:', username);

        // Read password length and password
        const passLen = buffer.readUInt32LE(f6pos);
        f6pos += 4;
        console.log('Password length:', passLen);
        const password = buffer.subarray(f6pos, f6pos + passLen).toString();
        console.log('Password:', password);

        break;
    }
}