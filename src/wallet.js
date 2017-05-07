const bs58check = require('bs58check')
const nacl = require('tweetnacl')
const sha256 = require('./sha256')

const networkHeader = {
  mainnet: {
    key: [0xAB, 0x36],
    zaddr: [0x16, 0x9A]
  },
  testnet: {
    key: [0xAC, 0x08],
    zaddr: [0x16, 0xB6]
  }
}

function ValidateNetwork (network) {
  if (network === undefined || network === null) {
    return false
  } else if (network !== 'mainnet' && network !== 'testnet') {
    return false
  } else {
    return true
  }
}

// Validates the header of the provided spending key.
function ValidateKey (key, header) {
  if (key === undefined || key === null) {
    return false
  } else if ((key[0] & 0xf0) !== 0) {
    return false
  } else {
    return true
  }
}

// Generates the SHA256 hash of a formatted spending key.
function AddrPRF (key, t) {
  if (!Buffer.isBuffer(key)) {
    throw new Error('Invalid key instance')
  }

  if (key.length < 32) {
    throw new Error('Invalid key length')
  }

  const buffer = Buffer.concat([key, Buffer.alloc(32, 0)])
  buffer[0] |= 0xc0
  buffer[32] = t

  return sha256(buffer, { noPreprocess: true, asBytes: true })
}

// Generates the SHA256 hash of a formatted spending key and encoded
// using the x-coordinate of the generator for Curve25519 with NaCl.
function EncAddrPRF (key) {
  if (!Buffer.isBuffer(key)) {
    throw new Error('Invalid key instance')
  }

  if (key.length < 32) {
    throw new Error('Invalid key length')
  }

  const addr = AddrPRF(key, 1)

  return nacl.scalarMult.base(Uint8Array.from(addr))
}

// Converts a provided spending key string to a zaddr string.
function ConvertKeyToAddress (key, network) {
  if (!ValidateNetwork(network)) {
    throw new Error('Invalid network choice')
  }

  const header = network === 'mainnet' ? networkHeader.mainnet : networkHeader.testnet

  if (!ValidateKey(key, header)) {
    throw new Error('Invalid spending key')
  }

  const decode = bs58check.decode(key)
  const prefix = decode.slice(0, 2)
  const payload = decode.slice(2)

  if (!prefix[0] === header.key[0] || prefix[1] !== header.key[1]) {
    throw new Error('Invalid spending key header')
  }

  const addrA = AddrPRF(payload, 0)
  const addrB = EncAddrPRF(payload)

  const bufferH = Buffer.from(header.zaddr)
  const bufferA = Buffer.from(addrA)
  const bufferB = Buffer.from(addrB)

  const bufferAddr = Buffer.concat([bufferH, bufferA, bufferB])

  const zaddr = bs58check.encode(bufferAddr)
  if (zaddr.length !== 95) {
    throw new Error('Invalid zaddr length')
  }
  return zaddr
}

module.exports = {
  ConvertKeyToAddress: ConvertKeyToAddress
}
