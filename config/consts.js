const _ = require('lodash/fp')

const COINS = {
  BTC: 'BTC',
  BCH: 'BCH',
  DASH: 'DASH',
  ETH: 'ETH',
  LTC: 'LTC',
  ZEC: 'ZEC',
  USDT: 'USDT'
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
    zeroConf: true,
    type: 'coin',
    units:{
      full: {
        displayScale: 6,
        displayCode: 'BTC'
      },
      mili: {
        displayScale: 3,
        displayCode: 'mBTC'
      }
    }
  },
  {
    cryptoCode: COINS.BCH,
    display: 'Bitcoin Cash',
    code: 'bitcoincash',
    configFile: 'bitcoincash.conf',
    daemon: 'bitcoincashd',
    defaultPort: 8335,
    unitScale: 8,
    zeroConf: true,
    type: 'coin',
    units:{
      full: {
        displayScale: 6,
        displayCode: 'BCH'
      },
      mili: {
        displayScale: 3,
        displayCode: 'mBCH'
      }
    }
  },
  {
    cryptoCode: COINS.DASH,
    display: 'Dash',
    code: 'dash',
    configFile: 'dash.conf',
    daemon: 'dashd',
    defaultPort: 9998,
    unitScale: 8,
    zeroConf: true,
    type: 'coin',
    units:{
      full: {
        displayScale: 6,
        displayCode: 'DASH'
      },
      mili: {
        displayScale: 3,
        displayCode: 'mDASH'
      }
    }
  },
  {
    cryptoCode: COINS.ETH,
    display: 'Ethereum',
    code: 'ethereum',
    configFile: 'geth.conf',
    daemon: 'geth',
    defaultPort: 8545,
    unitScale: 18,
    zeroConf: false,
    type: 'coin',
    units:{
      full: {
        displayScale: 6,
        displayCode: 'ETH'
      },
      mili: {
        displayScale: 3,
        displayCode: 'mETH'
      }
    }
  },
  {
    cryptoCode: COINS.LTC,
    display: 'Litecoin',
    code: 'litecoin',
    configFile: 'litecoin.conf',
    daemon: 'litecoind',
    defaultPort: 9332,
    unitScale: 8,
    zeroConf: true,
    type: 'coin',
    units:{
      full: {
        displayScale: 6,
        code: 'LTC'
      },
      mili: {
        displayScale: 3,
        displayCode: 'mLTC'
      }
    }
  },
  {
    cryptoCode: COINS.USDT,
    display: 'Tether',
    unitScale: 6,
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    type: 'erc-20',
    units:{
      full: {
        displayScale: 6,
        displayCode: 'USDT'
      },
      mili: {
        displayScale: 3,
        displayCode: 'mUSDT'
      }
    }
  },
  {
    cryptoCode: COINS.ZEC,
    display: 'Zcash',
    code: 'zcash',
    configFile: 'zcash.conf',
    daemon: 'zcashd',
    defaultPort: 8232,
    unitScale: 8,
    zeroConf: true,
    type: 'coin',
    units:{
      full: {
        displayScale: 6,
        displayCode: 'ZEC'
      },
      mili: {
        displayScale: 3,
        displayCode: 'mZEC'
      }
    }
  }
]

const ALL_CRYPTOS = _.keys(COINS)

module.exports = { CRYPTO_CURRENCIES, COINS, ALL_CRYPTOS }
