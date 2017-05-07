const test = require('tape')
const zaddr = require('../index')

const mainnetPairs = [
  {
    network: 'mainnet',
    key: 'SKxsbCVjuidoTfTm58UmGv32Bap5YeboJqVc2hScye1WrearWbHA',
    zaddr: 'zcB54stMXcyiDhDCLtvHcEDismnWrTycEW4ktU4iEc5H1tH313zjn4buiTRjXiNhcTw5yR4De8p787qqJbz1iRj37uwiKJB'
  },
  {
    network: 'mainnet',
    key: 'SKxtJAcHLGTUvkt4KgFnYCmWorGATmtnC7838TLys5umVWFV5QXe',
    zaddr: 'zcgsnB8NVHd3q9pWFze2ac3BLV5rAYYVbLft8yJz4ctxN6BiscHtw2hiN8E5u42rHWaZTYCTL7Rfvk8pvsH5Vv6iFyjXRqr'
  },
  {
    network: 'mainnet',
    key: 'SKxtuGdvqt6sfBbYJKYBJMUexrciygbTh5Fq3Ka4314tc5FeY2Fe',
    zaddr: 'zcdRd6LYLHYy8SLKUWG2DbTMLs4ou92KFKy9DWUmxt27x4kr2tpLJtD93tq7GsXgsQrR1RQMJzboCUnektRU3c9Wf54zJn7'
  },
  {
    network: 'mainnet',
    key: 'SKxt8YUMFcdy3nYddqrnLeMkdonhEDotfwen38DmYdijbhXeWg1m',
    zaddr: 'zccoHYHKjK6AyTMDCCwpfwwm8ESQwYyXraUSMMoym43Hzkw4FkhhoJjmRKjSQnF64rjTs7NKaKAApJAmoJkWdfHBqkpB2G8'
  },
  {
    network: 'mainnet',
    key: 'SKxpCRBeDNNwrvP6WqZpzJwrdKqACun4ayUYWQFxYR3sVNft6F3b',
    zaddr: 'zcRkZxWPDiTkRSn2AikrYsVmhbUx8YtFFjWZYino3KiNH4m1Pp7RA22gTrQnRc15cnBaLuYpHRtBhuRAF4qXV716jxiaiR6'
  }
]

test('generateKey', function (t) {
  const mainnetKey = zaddr.generateKey('mainnet')
  t.equal(mainnetKey.slice(0, 2), 'SK')

  const testnetKey = zaddr.generateKey('testnet')
  t.equal(testnetKey.slice(0, 2), 'ST')
  t.end()
})

mainnetPairs.forEach(function (pair, index) {
  test('generateAddressFromKey' + index, function (t) {
    const address = zaddr.generateAddressFromKey(pair.key, pair.network)
    t.equal(address.slice(0, 2), 'zc')
    t.equal(address, pair.zaddr)
    t.end()
  })
})
