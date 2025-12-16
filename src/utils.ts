import path from 'path'
import addressValidator from '@lamassu/multicoin-address-validator'

import {CRYPTO_CURRENCIES} from './config/consts'
import {getCryptoCurrency} from './lightUtils';

export function cryptoCurrencies() {
  return CRYPTO_CURRENCIES
}

export function getTrc20Token(cryptoCode: string) {
  const token = trc20Tokens().find(t => t.cryptoCode === cryptoCode)
  if (!token) throw new Error(`Unsupported token: ${cryptoCode}`)
  return token
}

export function getErc20Token(cryptoCode: string) {
  const token = erc20Tokens().find(t => t.cryptoCode === cryptoCode)
  if (!token) throw new Error(`Unsupported token: ${cryptoCode}`)
  return token
}

function trc20Tokens() {
  return cryptoCurrencies().filter((e: any) => e.type === 'trc-20')
}

function erc20Tokens() {
  return cryptoCurrencies().filter((e: any) => e.type === 'erc-20')
}

export function isErc20Token(cryptoCode: string) {
  return getCryptoCurrency(cryptoCode).type === 'erc-20'
}

export function isTrc20Token(cryptoCode: string) {
  return getCryptoCurrency(cryptoCode).type === 'trc-20'
}

export function buildUrl(cryptoCode: string, address: string) {
  const coinConfig = getCryptoCurrency(cryptoCode)
    return coinConfig.urlPrefix ? `${coinConfig.urlPrefix}:${address}` : address
}

/* TODO: make cryptoRec more restrictive */
export function cryptoDir(cryptoRec: any, blockchainDir: string) {
  const code = cryptoRec.code
  return path.resolve(blockchainDir, code)
}

export function configPath(cryptoRec: any, blockchainDir: string) {
  return path.resolve(cryptoDir(cryptoRec, blockchainDir), cryptoRec.configFile)
}

export function isValidAddressInAnyChain(address: string) {
  for (const coin of CRYPTO_CURRENCIES) {
    console.log('DEBUG16: [%s] *%s*', coin.cryptoCode, address)
    const validatorKey = 'validatorKey' in coin ? coin.validatorKey : coin.cryptoCode
    if (validatorKey === 'disabled') continue
    try {
      const isValid = addressValidator.validate(address, validatorKey)
      console.log('DEBUG16: [%s] *%s*', coin.cryptoCode, isValid ? 'valid' : 'invalid')
      if (isValid) return true
    } catch (err) {}
  }

  return false
}

export { getEquivalentCode, toUnit, formatCryptoAddress, getCryptoCurrency } from './lightUtils';

