# zaddr

A lightweight Javascript library for generating Zcash zaddrs and zkeys

**NOTE: This library is under active development. Observe the marked TODOs and proceed at your own discretion.**

[![TRAVIS](https://secure.travis-ci.org/howardwu/zaddr.png)](http://travis-ci.org/howardwu/zaddr)
[![NPM](http://img.shields.io/npm/v/zaddr.svg)](https://www.npmjs.org/package/zaddr)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Install

```
npm install zaddr --save
```

## Example

``` javascript
const zaddr = require('zaddr')

const network = 'mainnet'

const key = zaddr.generateKey(network)
// => SKxsbCVjuidoTfTm58UmGv32Bap5YeboJqVc2hScye1WrearWbHA

const address = zaddr.generateAddressFromKey(key, network)
// => zcB54stMXcyiDhDCLtvHcEDismnWrTycEW4ktU4iEc5H1tH313zjn4buiTRjXiNhcTw5yR4De8p787qqJbz1iRj37uwiKJB
```

## License

[MIT License](LICENSE)
