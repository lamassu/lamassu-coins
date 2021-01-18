const path = require('path')
const _ = require('lodash/fp')

const consts = require('./config/consts')
const BTC = require('./plugins/btc')
const ETH = require('./plugins/eth')
const ZEC = require('./plugins/zec')
const LTC = require('./plugins/ltc')
const DASH = require('./plugins/dash')
const BCH = require('./plugins/bch')

const PLUGINS = { BTC, ETH, ZEC, LTC, DASH, BCH }

function getCryptoCurrency (cryptoCode) {
  const cryptoCurrency = _.find(['cryptoCode', cryptoCode], cryptoCurrencies())
  if (!cryptoCurrency) throw new Error(`Unsupported crypto: ${cryptoCode}`)
  return cryptoCurrency
}

function cryptoCurrencies () {
  return consts.CRYPTO_CURRENCIES
}

function buildUrl (cryptoCode, address) {
  return coinPlugin(cryptoCode).buildUrl(address)
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
