const test = require('tape')
const wallet = require('../src/wallet')
const zaddr = require('../index')

const pairs = [
  {
    key: 'SKxsbCVjuidoTfTm58UmGv32Bap5YeboJqVc2hScye1WrearWbHA',
    zaddr: 'zcB54stMXcyiDhDCLtvHcEDismnWrTycEW4ktU4iEc5H1tH313zjn4buiTRjXiNhcTw5yR4De8p787qqJbz1iRj37uwiKJB'
  },
  {
    key: 'SKxtJAcHLGTUvkt4KgFnYCmWorGATmtnC7838TLys5umVWFV5QXe',
    zaddr: 'zcgsnB8NVHd3q9pWFze2ac3BLV5rAYYVbLft8yJz4ctxN6BiscHtw2hiN8E5u42rHWaZTYCTL7Rfvk8pvsH5Vv6iFyjXRqr'
  },
  {
    key: 'SKxtuGdvqt6sfBbYJKYBJMUexrciygbTh5Fq3Ka4314tc5FeY2Fe',
    zaddr: 'zcdRd6LYLHYy8SLKUWG2DbTMLs4ou92KFKy9DWUmxt27x4kr2tpLJtD93tq7GsXgsQrR1RQMJzboCUnektRU3c9Wf54zJn7'
  },
  {
    key: 'SKxt8YUMFcdy3nYddqrnLeMkdonhEDotfwen38DmYdijbhXeWg1m',
    zaddr: 'zccoHYHKjK6AyTMDCCwpfwwm8ESQwYyXraUSMMoym43Hzkw4FkhhoJjmRKjSQnF64rjTs7NKaKAApJAmoJkWdfHBqkpB2G8'
  },
  {
    key: 'SKxpCRBeDNNwrvP6WqZpzJwrdKqACun4ayUYWQFxYR3sVNft6F3b',
    zaddr: 'zcRkZxWPDiTkRSn2AikrYsVmhbUx8YtFFjWZYino3KiNH4m1Pp7RA22gTrQnRc15cnBaLuYpHRtBhuRAF4qXV716jxiaiR6'
  }
]

pairs.forEach(function (pair, index) {
  test('ConvertKeyToAddress' + index, function (t) {
    const address = wallet.ConvertKeyToAddress(pair.key)
    t.equal(address.slice(0, 2), 'zc')
    t.equal(address, pair.zaddr)
    t.end()
  })

  test('generateAddressFromKey' + index, function (t) {
    const address = zaddr.generateAddressFromKey(pair.key)
    t.equal(address.slice(0, 2), 'zc')
    t.equal(address, pair.zaddr)
    t.end()
  })
})

test('generateKey', function (t) {
  const key = zaddr.generateKey()
  t.equal(key.slice(0, 2), 'SK')
  t.end()
})
