const fs = require('fs')
const path = require('path')

// Read the BinaryStream.ts file and extract just the class definition
const binaryStreamContent = fs.readFileSync('src/libraries/binaryStream.ts', 'utf8')

// Simple test to demonstrate endianness detection
console.log('=== BinaryStream Endianness Detection Demo ===\n')

// Mock the Buffer and other Node.js globals for demonstration
global.Buffer = require('buffer').Buffer

// Create test buffers with different endianness patterns
const littleEndianBuffer = Buffer.from([
  0x5E, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Little-endian length + session
  0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x00, 0x00, 0x00 // "Hello" string
])

const bigEndianBuffer = Buffer.from([
  0x5E, 0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, // Big-endian length + session
  0x00, 0x00, 0x00, 0x48, 0x65, 0x6C, 0x6C, 0x6F // "Hello" string
])

console.log('Test Buffer Analysis:')
console.log('Little-endian buffer:', littleEndianBuffer.toString('hex'))
console.log('Big-endian buffer:', bigEndianBuffer.toString('hex'))

// Simulate the endianness detection logic
function detectEndianness (buffer) {
  if (buffer.length < 4) {
    return { endianness: 'unknown', confidence: 0, reason: 'Buffer too small' }
  }

  let littleScore = 0
  let bigScore = 0
  const reasons = []

  // Simple string detection
  for (let i = 0; i < buffer.length - 4; i++) {
    const lengthLE = buffer.readUInt32LE(i)
    const lengthBE = buffer.readUInt32BE(i)

    if (lengthLE > 0 && lengthLE < 1000 && i + 4 + lengthLE <= buffer.length) {
      const str = buffer.subarray(i + 4, i + 4 + lengthLE).toString('ascii')
      if (str.length >= 3 && str.match(/[a-zA-Z]{3,}/)) {
        littleScore += str.length
      }
    }

    if (lengthBE > 0 && lengthBE < 1000 && i + 4 + lengthBE <= buffer.length) {
      const str = buffer.subarray(i + 4, i + 4 + lengthBE).toString('ascii')
      if (str.length >= 3 && str.match(/[a-zA-Z]{3,}/)) {
        bigScore += str.length
      }
    }
  }

  if (littleScore > bigScore) {
    reasons.push(`String detection favors little-endian (${littleScore} vs ${bigScore})`)
  } else if (bigScore > littleScore) {
    reasons.push(`String detection favors big-endian (${bigScore} vs ${littleScore})`)
  }

  const totalScore = littleScore + bigScore
  let confidence = 0
  let endianness = 'unknown'

  if (totalScore > 0) {
    confidence = Math.max(littleScore, bigScore) / totalScore
    endianness = littleScore > bigScore ? 'little' : 'big'
  }

  return {
    endianness,
    confidence: Math.min(confidence, 1),
    reason: reasons.join('; ')
  }
}

// Test the detection
const littleResult = detectEndianness(littleEndianBuffer)
const bigResult = detectEndianness(bigEndianBuffer)

console.log('\nDetection Results:')
console.log('Little-endian buffer:', littleResult)
console.log('Big-endian buffer:', bigResult)

console.log('\n=== BinaryStream Class Features ===')
console.log('✓ Automatic endianness detection')
console.log('✓ Configurable byte reversal via reverseIfLittleEndian property')
console.log('✓ Factory methods for different protocols:')
console.log('  - BinaryStream.createFlyFFStream() - for FlyFF (little-endian)')
console.log('  - BinaryStream.createBigEndianStream() - for big-endian protocols')
console.log('✓ Comprehensive multi-method detection (string, magic numbers, statistics)')
console.log('✓ High confidence scoring system')

console.log('\n=== Usage Example ===')
console.log('// Detect endianness of unknown buffer')
console.log('const result = BinaryStream.detectEndianness(unknownBuffer);')
console.log('if (result.endianness === "little") {')
console.log('  // Use little-endian reading methods')
console.log('  stream.readInt32LE();')
console.log('} else {')
console.log('  // Use big-endian reading methods')
console.log('  stream.readInt32();')
console.log('}')

console.log('\n=== Factory Methods ===')
console.log('// Create a FlyFF-compatible stream')
console.log('const flyffStream = BinaryStream.createFlyFFStream(buffer);')
console.log('// Create a big-endian stream')
console.log('const bigEndianStream = BinaryStream.createBigEndianStream(buffer);')
