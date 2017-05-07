const walletops = require('./src/walletops')

// Generates a random spending key.
function generateKey (network) {
  return walletops.CreateKey(network)
}

// Generates the zaddr associated with a given spending key.
function generateAddressFromKey (key, network) {
  return walletops.ConvertKeyToAddress(key, network)
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
