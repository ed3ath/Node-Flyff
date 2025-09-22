const { BinaryStream } = require('./test_build/libraries/binaryStream.js')

// Test endianness detection
console.log('=== Endianness Detection Test ===')

// Create test buffers
const littleEndianBuffer = Buffer.from([0x5E, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x48, 0x65, 0x6C, 0x6C, 0x6F]) // "Hello" string
const bigEndianBuffer = Buffer.from([0x5E, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00, 0x48, 0x65, 0x6C, 0x6C, 0x6F]) // Same data, big-endian

// Test detection
const littleResult = BinaryStream.detectEndianness(littleEndianBuffer)
const bigResult = BinaryStream.detectEndianness(bigEndianBuffer)

console.log('Little-endian buffer detection:', littleResult)
console.log('Big-endian buffer detection:', bigResult)

// Test BinaryStream with different endianness modes
console.log('\n=== BinaryStream Endianness Test ===')

// Create a FlyFF-style stream (little-endian)
const flyffStream = BinaryStream.createFlyFFStream()
flyffStream.writeInt32(12345)
flyffStream.writeString('Test')
console.log('FlyFF Stream buffer:', flyffStream.buffer)

// Create a big-endian stream
const bigEndianStream = BinaryStream.createBigEndianStream()
bigEndianStream.writeInt32(12345)
bigEndianStream.writeString('Test')
console.log('Big-endian Stream buffer:', bigEndianStream.buffer)

// Test reading
console.log('\n=== Reading Test ===')
const readStream = new BinaryStream(flyffStream.buffer)
console.log('Read Int32:', readStream.readInt32())
console.log('Read String:', readStream.readString())

console.log('\n=== Factory Methods Test ===')
console.log('Available factory methods:')
console.log('- BinaryStream.createFlyFFStream() - for FlyFF protocol (little-endian)')
console.log('- BinaryStream.createBigEndianStream() - for big-endian protocols')
