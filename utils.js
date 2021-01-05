const path = require('path')

const _ = require('lodash/fp')

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

const PLUGINS = {
  BTC: require('./plugins/btc'),
  ETH: require('./plugins/eth'),
  ZEC: require('./plugins/zec'),
  LTC: require('./plugins/ltc'),
  DASH: require('./plugins/dash'),
  BCH: require('./plugins/bch')
}

function getCryptoCurrency (cryptoCode) {
  const cryptoCurrency = _.find(['cryptoCode', cryptoCode], CRYPTO_CURRENCIES)
  if (!cryptoCurrency) throw new Error(`Unsupported crypto: ${cryptoCode}`)
  return cryptoCurrency
}

function cryptoCurrencies () {
  return CRYPTO_CURRENCIES
}

function buildUrl (cryptoCode, address) {
  switch (cryptoCode) {
    case 'BTC': return `bitcoin:${address}`
    case 'ETH': return `ethereum:${address}`
    case 'ZEC': return `zcash:${address}`
    case 'LTC': return `litecoin:${address}`
    case 'DASH': return `dash:${address}`
    case 'BCH': return `${address}`
    default: throw new Error(`Unsupported crypto: ${cryptoCode}`)
  }
}

function cryptoDir (cryptoRec, blockchainDir) {
  const code = cryptoRec.code
  return path.resolve(blockchainDir, code)
}

function configPath (cryptoRec) {
  return path.resolve(cryptoDir(cryptoRec), cryptoRec.configFile)
}

function toUnit (cryptoAtoms, cryptoCode) {
  const cryptoRec = getCryptoCurrency(cryptoCode)
  const unitScale = cryptoRec.unitScale
  return cryptoAtoms.shiftedBy(-unitScale)
}

function formatCryptoAddress(cryptoCode = '', address = '') {
  return cryptoCode === 'BCH' ? address.replace('bitcoincash:', '') : address
}

function coinPlugin (cryptoCode) {
  const plugin = PLUGINS[cryptoCode]
  if (!plugin) throw new Error(`Unsupported coin: ${cryptoCode}`)
  return plugin
}

function depositUrl (cryptoCode, address, amountStr) {
  if (!address) return null
  const plugin = coinPlugin(cryptoCode)
  return plugin.depositUrl(address, amountStr)
}

function parseUrl (cryptoCode, network, url) {
  const plugin = coinPlugin(cryptoCode)
  return plugin.parseUrl(network, url)
}

function formatAddress (cryptoCode, address) {
  if (!address) return null

  const plugin = coinPlugin(cryptoCode)
  if (!plugin.formatAddress) return address
  return plugin.formatAddress(address)
}

function createWallet (cryptoCode) {
  const plugin = coinPlugin(cryptoCode)
  if (!plugin.createWallet) {
    throw new Error(`${cryptoCode} paper wallet printing is not supported`)
  }

  return plugin.createWallet()
}

module.exports = {
  buildUrl,
  cryptoDir,
  configPath,
  cryptoCurrencies,
  getCryptoCurrency,
  toUnit,
  formatCryptoAddress,
  depositUrl,
  parseUrl,
  formatAddress,
  createWallet
}