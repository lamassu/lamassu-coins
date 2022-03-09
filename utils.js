const path = require('path')
const _ = require('lodash/fp')

const consts = require('./config/consts')
const BTC = require('./plugins/btc')
const ETH = require('./plugins/eth')
const ZEC = require('./plugins/zec')
const LTC = require('./plugins/ltc')
const DASH = require('./plugins/dash')
const BCH = require('./plugins/bch')
const XMR = require('./plugins/xmr')
const TRX = require('./plugins/trx')
const LN = require('./plugins/ln')

const PLUGINS = { BTC, ETH, ZEC, LTC, DASH, BCH, XMR, TRX, LN }

const isBech32Address = require('./plugins/validators').isBech32Address

function getCryptoCurrency (cryptoCode) {
  const cryptoCurrency = _.find(['cryptoCode', cryptoCode], cryptoCurrencies())
  if (!cryptoCurrency) throw new Error(`Unsupported crypto: ${cryptoCode}`)
  return cryptoCurrency
}

function cryptoCurrencies () {
  return consts.CRYPTO_CURRENCIES
}

function getTrc20Token (cryptoCode) {
  const token = _.find(['cryptoCode', cryptoCode], trc20Tokens())
  if (!token) throw new Error(`Unsupported token: ${cryptoCode}`)
  return token
}

function getErc20Token (cryptoCode) {
  const token = _.find(['cryptoCode', cryptoCode], erc20Tokens())
  if (!token) throw new Error(`Unsupported token: ${cryptoCode}`)
  return token
}

function trc20Tokens () {
  return _.filter(e => e.type === 'trc-20', consts.CRYPTO_CURRENCIES)
}

function erc20Tokens () {
  return _.filter(e => e.type === 'erc-20', consts.CRYPTO_CURRENCIES)
}

function isErc20Token (cryptoCode) {
  return getCryptoCurrency(cryptoCode).type === 'erc-20'
}

function isTrc20Token (cryptoCode) {
  return getCryptoCurrency(cryptoCode).type === 'trc-20'
}

function buildUrl (cryptoCode, address) {
  return coinPlugin(cryptoCode).buildUrl(address)
}

function cryptoDir (cryptoRec, blockchainDir) {
  const code = cryptoRec.code
  return path.resolve(blockchainDir, code)
}

function configPath (cryptoRec, blockchainDir) {
  return path.resolve(cryptoDir(cryptoRec, blockchainDir), cryptoRec.configFile)
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
  const coin = getCryptoCurrency(cryptoCode)
  const type = coin.type || 'coin'

  let plugin = null
  switch (type) {
    case 'coin':
      plugin = PLUGINS[cryptoCode]
      break;
    case 'erc-20':
      plugin = PLUGINS['ETH']
      break;
    case 'trc-20':
      plugin = PLUGINS['TRX']
      break;
    default:
      break;
  }

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
  const address = plugin.parseUrl(network, url)
  return formatAddressCasing(cryptoCode, address)
}

function formatAddress (cryptoCode, address) {
  if (!address) return null

  const plugin = coinPlugin(cryptoCode)
  if (!plugin.formatAddress) return address
  return plugin.formatAddress(address)
}

function formatAddressCasing (cryptoCode, address) {
  const plugin = coinPlugin(cryptoCode)
  if (!plugin.bech32Opts) return address
  return isBech32Address(address, plugin.bech32Opts) ? address.toLowerCase() : address
}

function createWallet (cryptoCode) {
  const plugin = coinPlugin(cryptoCode)
  if (!plugin.createWallet) {
    throw new Error(`${cryptoCode} paper wallet printing is not supported`)
  }

  return plugin.createWallet()
}

function getAddressType (cryptoCode, address, network) {
  const plugin = coinPlugin(cryptoCode)
  return plugin.getAddressType(address, network)
}

function getEquivalentCode (cryptoCurrency) {
  const PEGGED_CRYPTO_CURRENCIES = { USDT_TRON: 'USDT', LN: 'BTC' }

  return PEGGED_CRYPTO_CURRENCIES[cryptoCurrency] || cryptoCurrency
}

module.exports = {
  buildUrl,
  cryptoDir,
  configPath,
  cryptoCurrencies,
  erc20Tokens,
  getCryptoCurrency,
  getTrc20Token,
  isTrc20Token,
  getErc20Token,
  isErc20Token,
  toUnit,
  formatCryptoAddress,
  depositUrl,
  parseUrl,
  formatAddress,
  formatAddressCasing,
  createWallet,
  getAddressType,
  getEquivalentCode
}
