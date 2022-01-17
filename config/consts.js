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

const CRYPTOS = [
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
        displayScale: 8,
        displayCode: 'BTC'
      },
      mili: {
        displayScale: 5,
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
        displayScale: 8,
        displayCode: 'BCH'
      },
      mili: {
        displayScale: 5,
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
        displayScale: 8,
        displayCode: 'DASH'
      },
      mili: {
        displayScale: 5,
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
        displayScale: 18,
        displayCode: 'ETH'
      },
      mili: {
        displayScale: 15,
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
        displayScale: 8,
        displayCode: 'LTC'
      },
      mili: {
        displayScale: 5,
        displayCode: 'mLTC'
      }
    }
  },
  {
    cryptoCode: COINS.USDT,
    display: 'Tether',
    code: 'tether',
    unitScale: 6,
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    type: 'erc-20',
    units:{
      full: {
        displayScale: 6,
        displayCode: 'USDT'
      }
    }
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
    zeroConf: true,
    type: 'coin',
    units: {
      full: {
        displayScale: 12,
        displayCode: 'XMR'
      },
      mili: {
        displayScale: 9,
        displayCode: 'mXMR'
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
        displayScale: 8,
        displayCode: 'ZEC'
      },
      mili: {
        displayScale: 5,
        displayCode: 'mZEC'
      }
    }
  }
]

const CRYPTO_CURRENCIES = _.orderBy(['code', 'cryptoCode'], ['asc', 'asc'], CRYPTOS)

const ALL_CRYPTOS = _.keys(COINS)

module.exports = { CRYPTO_CURRENCIES, COINS, ALL_CRYPTOS }
