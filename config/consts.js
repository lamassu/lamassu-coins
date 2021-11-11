const _ = require('lodash/fp')

const COINS = {
  BTC: 'BTC',
  BCH: 'BCH',
  DASH: 'DASH',
  ETH: 'ETH',
  LTC: 'LTC',
  ZEC: 'ZEC',
  USDT: 'USDT',
  XMR: 'XMR'
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
    cryptoCode: COINS.ETH,
    display: 'Ethereum',
    code: 'ethereum',
    configFile: 'geth.conf',
    daemon: 'geth',
    defaultPort: 8545,
    unitScale: 18,
    displayScale: 15,
    zeroConf: true,
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
    cryptoCode: COINS.USDT,
    display: 'Tether',
    unitScale: 6,
    displayScale: 0,
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    type: 'erc-20',
    displayCode: 'USDT'
  },
  {
    cryptoCode: COINS.XMR,
    display: 'Monero',
    code: 'monero',
    configFile: 'monero.conf',
    daemon: 'monerod',
    wallet: 'monero-wallet-rpc',
    defaultPort: 38081,
    walletPort: 38083,
    unitScale: 12,
    displayScale: 9,
    zeroConf: true,
    type: 'coin',
    displayCode: 'mXMR'
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
  }
]

const ALL_CRYPTOS = _.keys(COINS)

module.exports = { CRYPTO_CURRENCIES, COINS, ALL_CRYPTOS }
