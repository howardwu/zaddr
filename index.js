const bs58check = require('bs58check')
const crypto = require('crypto')
const wallet = require('./src/wallet')

// Generates a random secret key.
function generateKey () {
  const buffer = crypto.randomBytes(32)
  buffer[0] &= 0x0f

  const bufferSK = new Buffer([0xAB, 0x36])
  return bs58check.encode(Buffer.concat([bufferSK, buffer]))
}

// Generates the z-addr given a secret key.
function generateAddressFromKey(key) {
  return wallet.ConvertKeyToAddress(key)
}

// TODO (howardwu): Generate secret key from seed

// TODO (howardwu): Generate secret key from mnemonic (bip39)

// TODO (howardwu): Generate mnemonic (bip39) from key

// TODO (howardwu): Generate mnemonic (bip39) from seed

// TODO (howardwu): Generate z-addr from seed

// TODO (howardwu): Generate z-addr from mnemonic (bip39)

// TODO (howardwu): Generate wallet (key, zaddr, mnemonic)

// TODO (howardwu): Generate wallet (key, zaddr, mnemonic) from seed

// TODO (howardwu): Generate vanity wallet (key, vanity zaddr, mnemonic)

module.exports = {
  generateKey: generateKey,
  generateAddressFromKey: generateAddressFromKey
}
