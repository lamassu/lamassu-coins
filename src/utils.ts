import find from 'lodash/fp/find'
import filter from 'lodash/fp/filter'
import path from 'path'

import {CRYPTO_CURRENCIES} from './config/consts'
import {getCryptoCurrency} from './lightUtils';
import {isBech32Address} from './plugins/validators'
import BTC from './plugins/btc'
import ETH from './plugins/eth'
import ZEC from './plugins/zec'
import LTC from './plugins/ltc'
import DASH from './plugins/dash'
import BCH from './plugins/bch'
import XMR from './plugins/xmr'
import TRX from './plugins/trx'
import LN from './plugins/ln'

const PLUGINS: { [key: string]: any } = {BTC, ETH, ZEC, LTC, DASH, BCH, XMR, TRX, LN}

export function cryptoCurrencies() {
  return CRYPTO_CURRENCIES
}

export function getTrc20Token(cryptoCode: string) {
  const token = find(['cryptoCode', cryptoCode], trc20Tokens())
  if (!token) throw new Error(`Unsupported token: ${cryptoCode}`)
  return token
}

export function getErc20Token(cryptoCode: string) {
  const token = find(['cryptoCode', cryptoCode], erc20Tokens())
  if (!token) throw new Error(`Unsupported token: ${cryptoCode}`)
  return token
}

function trc20Tokens() {
  return filter((e: any) => e.type === 'trc-20', cryptoCurrencies())
}

export function erc20Tokens() {
  return filter((e: any) => e.type === 'erc-20', cryptoCurrencies())
}

export function isErc20Token(cryptoCode: string) {
  return getCryptoCurrency(cryptoCode).type === 'erc-20'
}

export function isTrc20Token(cryptoCode: string) {
  return getCryptoCurrency(cryptoCode).type === 'trc-20'
}

export function buildUrl(cryptoCode: string, address: string) {
  return coinPlugin(cryptoCode).buildUrl(address)
}

/* TODO: make cryptoRec more restrictive */
export function cryptoDir(cryptoRec: any, blockchainDir: string) {
  const code = cryptoRec.code
  return path.resolve(blockchainDir, code)
}

export function configPath(cryptoRec: any, blockchainDir: string) {
  return path.resolve(cryptoDir(cryptoRec, blockchainDir), cryptoRec.configFile)
}

function coinPlugin(cryptoCode: string) {
  const coin = getCryptoCurrency(cryptoCode)
  const type = coin.type ?? 'coin'
  switch (type) {
    case 'erc-20':
      return PLUGINS['ETH']
    case 'trc-20':
      return PLUGINS['TRX']
    default:
      return PLUGINS[cryptoCode]
  }
}

export function depositUrl(cryptoCode: string, address: string, amount: string) {
  if (!address) return null
  const plugin = coinPlugin(cryptoCode)
  return plugin.depositUrl(address, amount)
}

/* TODO: make network more restrictive */
export function parseUrl(cryptoCode: string, network: string, url: string, fromMachine: boolean = true) {
  const plugin = coinPlugin(cryptoCode)
  const address = plugin.parseUrl(network, url, {cryptoCode}, fromMachine)
  return formatAddressCasing(cryptoCode, address)
}

export function formatAddress(cryptoCode: string, address: string) {
  if (!address) return null

  const plugin = coinPlugin(cryptoCode)
  if (!plugin.formatAddress) return address
  return plugin.formatAddress(address)
}

export function formatAddressCasing(cryptoCode: string, address: string) {
  const plugin = coinPlugin(cryptoCode)
  if (!plugin.bech32Opts) return address
  return isBech32Address(address, plugin.bech32Opts, plugin.lengthLimit) ? address.toLowerCase() : address
}

export function createWallet(cryptoCode: string) {
  const plugin = coinPlugin(cryptoCode)
  if (!plugin.createWallet) {
    throw new Error(`${cryptoCode} paper wallet printing is not supported`)
  }

  return plugin.createWallet()
}

export function getAddressType(cryptoCode: string, address: string, network: string) {
  const plugin = coinPlugin(cryptoCode)
  return plugin.getAddressType(address, network)
}

export {getEquivalentCode, toUnit, formatCryptoAddress, getCryptoCurrency} from './lightUtils';

