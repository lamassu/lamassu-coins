const _ = require('lodash/fp')

const COINS = {
  BTC: 'BTC',
  BCH: 'BCH',
  DASH: 'DASH',
  ETH: 'ETH',
  LTC: 'LTC',
  ZEC: 'ZEC',
  USDT: 'USDT',
  XMR: 'XMR',
  TRX: 'TRX',
  USDT_TRON: 'USDT_TRON',
  LN: 'LN'
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
    defaultPort: 8336,
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
    hideFromInstall: true,
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
    cryptoCode: COINS.TRX,
    display: 'Tron',
    code: 'tron',
    unitScale: 6,
    zeroConf: false,
    hideFromInstall: true,
    type: 'coin',
    units:{
      full: {
        displayScale: 6,
        displayCode: 'TRX'
      },
      mili: {
        displayScale: 3,
        displayCode: 'mTRX'
      }
    }
  },
  {
    cryptoCode: COINS.USDT_TRON,
    cryptoCodeDisplay: 'USDT (Tron)',
    display: 'USDT (Tron)',
    code: 'tether_tron',
    unitScale: 6,
    zeroConf: false,
    hideFromInstall: true,
    contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    testnetContractAddress: 'TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs',
    type: 'trc-20',
    units:{
      full: {
        displayScale: 6,
        displayCode: 'USDT (Tron)'
      }
    },
    isCashinOnly: true
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
    display: 'USDT',
    code: 'tether',
    unitScale: 6,
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    type: 'erc-20',
    hideFromInstall: true,
    units:{
      full: {
        displayScale: 6,
        displayCode: 'USDT'
      }
    },
    isCashinOnly: true
  },
  {
    cryptoCode: COINS.XMR,
    display: 'Monero',
    code: 'monero',
    configFile: 'monero.conf',
    daemon: 'monerod',
    wallet: 'monero-wallet-rpc',
    defaultPort: 18081,
    walletPort: 18082,
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
    hideFromInstall: true,
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
  },
  {
    cryptoCode: COINS.LN,
    display: 'Lighting Network',
    code: 'ln',
    configFile: null,
    daemon: null,
    defaultPort: null,
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
]

const CRYPTO_CURRENCIES = _.orderBy(['code', 'cryptoCode'], ['asc', 'asc'], CRYPTOS)

const ALL_CRYPTOS = _.keys(COINS)

module.exports = { CRYPTO_CURRENCIES, COINS, ALL_CRYPTOS }
