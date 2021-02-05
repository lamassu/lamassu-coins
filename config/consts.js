const _ = require('lodash/fp')

const COINS = {
  BTC: 'BTC',
  ETH: 'ETH',
  LTC: 'LTC',
  DASH: 'DASH',
  ZEC: 'ZEC',
  BCH: 'BCH',
  USDT: 'USDT',
  YEENUS: 'YEENUS'
}

const CRYPTO_CURRENCIES = [
  {
    cryptoCode: COINS.BTC,
    display: 'Bitcoin',
    code: 'bitcoin',
    configFile: 'bitcoin.conf',
    daemon: 'bitcoind',
    defaultPort: 8332,
    unitScale: 8,
    displayScale: 5,
    zeroConf: true,
    type: 'coin',
    displayCode: 'mBTC'
  },
  {
    cryptoCode: COINS.ETH,
    display: 'Ethereum',
    code: 'ethereum',
    configFile: 'geth.conf',
    daemon: 'geth',
    defaultPort: 8545,
    unitScale: 18,
    displayScale: 15,
    zeroConf: false,
    type: 'coin',
    displayCode: 'mETH'
  },
  {
    cryptoCode: COINS.LTC,
    display: 'Litecoin',
    code: 'litecoin',
    configFile: 'litecoin.conf',
    daemon: 'litecoind',
    defaultPort: 9332,
    unitScale: 8,
    displayScale: 5,
    zeroConf: true,
    type: 'coin',
    displayCode: 'mLTC'
  },
  {
    cryptoCode: COINS.DASH,
    display: 'Dash',
    code: 'dash',
    configFile: 'dash.conf',
    daemon: 'dashd',
    defaultPort: 9998,
    unitScale: 8,
    displayScale: 5,
    zeroConf: true,
    type: 'coin',
    displayCode: 'mDASH'
  },
  {
    cryptoCode: COINS.ZEC,
    display: 'Zcash',
    code: 'zcash',
    configFile: 'zcash.conf',
    daemon: 'zcashd',
    defaultPort: 8232,
    unitScale: 8,
    displayScale: 5,
    zeroConf: true,
    type: 'coin',
    displayCode: 'mZEC'
  },
  {
    cryptoCode: COINS.BCH,
    display: 'Bitcoin Cash',
    code: 'bitcoincash',
    configFile: 'bitcoincash.conf',
    daemon: 'bitcoincashd',
    defaultPort: 8335,
    unitScale: 8,
    displayScale: 5,
    zeroConf: true,
    type: 'coin',
    displayCode: 'mBCH'
  },
  {
    cryptoCode: COINS.USDT,
    display: 'Tether',
    unitScale: 6,
    displayScale: 0,
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    type: 'erc-20',
    displayCode: 'USDT'
  },
  {
    cryptoCode: COINS.YEENUS,
    display: 'Yeenus',
    unitScale: 8,
    displayScale: 8,
    contractAddress: '0xF6fF95D53E08c9660dC7820fD5A775484f77183A',
    type: 'erc-20',
    displayCode: 'mYEENUS'
  }
]

const ALL_CRYPTOS = _.keys(COINS)

module.exports = { CRYPTO_CURRENCIES, COINS, ALL_CRYPTOS }
