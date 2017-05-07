const bs58check = require('bs58check')
const nacl = require('tweetnacl')
const sha256 = require('./sha256')

// TODO (howardwu): Add version here for mainnet and testnet prefixes.

// TODO (howardwu): Check typeof key
// TODO (howardwu): Check length of key
// Generates the SHA256 hash of a formatted secret key.
function AddrPRF (key, t) {
  const buffer = Buffer.concat([key, Buffer.alloc(32, 0)])
  buffer[0] |= 0xc0
  buffer[32] = t
  return sha256(buffer, { noPreprocess: true, asBytes: true })
}

// TODO (howardwu): Check typeof key
// TODO (howardwu): Check length of key
// Generates the SHA256 hash of a formatted secret key and encoded
// using the x-coordinate of the generator for Curve25519 with NaCl.
function EncAddrPRF (key) {
  const addr = AddrPRF(key, 1)
  return nacl.scalarMult.base(Uint8Array.from(addr))
}

// TODO (howardwu): Assert key starts with SK
// TODO (howardwu): Assert key is x characters
// TODO (howardwu): Check typeof key
// TODO (howardwu): Add version check
// Converts a provided secret key string to a zaddr string.
function ConvertKeyToAddress (key) {
  const decodedKey = bs58check.decode(key).slice(2)

  const addrA = AddrPRF(decodedKey, 0)
  const addrB = EncAddrPRF(decodedKey)

  // TODO (howardwu): Generalize this for all versions
  const bufferV = Buffer.from([0x16, 0x9A])
  const bufferA = Buffer.from(addrA)
  const bufferB = Buffer.from(addrB)

  const bufferAddr = Buffer.concat([bufferV, bufferA, bufferB])

  const zaddr = bs58check.encode(bufferAddr)
  // TODO (howardwu): Add version check
  // TODO (howardwu): Assert zaddr is 96 characters
  return zaddr
}

module.exports = {
  ConvertKeyToAddress: ConvertKeyToAddress
}
