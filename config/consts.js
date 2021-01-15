const _ = require('lodash/fp')

const COINS = {
  BTC: 'BTC',
  ETH: 'ETH',
  LTC: 'LTC',
  DASH: 'DASH',
  ZEC: 'ZEC',
  BCH: 'BCH'
}

const CRYPTO_CURRENCIES = [
  {
    cryptoCode: 'BTC',
    display: 'Bitcoin',
    code: 'bitcoin',
    configFile: 'bitcoin.conf',
    daemon: 'bitcoind',
    defaultPort: 8332,
    unitScale: 8,
    displayScale: 5,
    zeroConf: true
  },
  {
    cryptoCode: 'ETH',
    display: 'Ethereum',
    code: 'ethereum',
    configFile: 'geth.conf',
    daemon: 'geth',
    defaultPort: 8545,
    unitScale: 18,
    displayScale: 15,
    zeroConf: false
  },
  {
    cryptoCode: 'LTC',
    display: 'Litecoin',
    code: 'litecoin',
    configFile: 'litecoin.conf',
    daemon: 'litecoind',
    defaultPort: 9332,
    unitScale: 8,
    displayScale: 5,
    zeroConf: true
  },
  {
    cryptoCode: 'DASH',
    display: 'Dash',
    code: 'dash',
    configFile: 'dash.conf',
    daemon: 'dashd',
    defaultPort: 9998,
    unitScale: 8,
    displayScale: 5,
    zeroConf: true
  },
  {
    cryptoCode: 'ZEC',
    display: 'Zcash',
    code: 'zcash',
    configFile: 'zcash.conf',
    daemon: 'zcashd',
    defaultPort: 8232,
    unitScale: 8,
    displayScale: 5,
    zeroConf: true
  },
  {
    cryptoCode: 'BCH',
    display: 'Bitcoin Cash',
    code: 'bitcoincash',
    configFile: 'bitcoincash.conf',
    daemon: 'bitcoincashd',
    defaultPort: 8335,
    unitScale: 8,
    displayScale: 5,
    zeroConf: true
  }
]

const ALL_CRYPTOS = _.keys(COINS)

module.exports = { CRYPTO_CURRENCIES, COINS, ALL_CRYPTOS }
