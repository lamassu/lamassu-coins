const _ = require('lodash/fp')
const bitcoin = require('bitcoinjs-lib')
const btc = require('./btc')
const bech32Validator = require('./validators').bech32Validator

const bech32Opts = {
  mainNetPrefix: 'lnbc',
  testNetPrefix: 'lntb'
}

const lengthLimit = Number.MAX_SAFE_INTEGER

const EXTERNAL_CRYPTO_CODE = 'BTC'

function parseUrl (network, url) {
  const urlElements = _.split('?', url);

  // Handle address type: bitcoin:bc1(...)?amount=0.00035&lightning=lnbc(...)
  if(_.size(urlElements) === 2) {
    const lnElements = _.split('&', urlElements[1])
    const parameters = _.fromPairs(_.map(parameter => _.split('=', parameter) , lnElements))
    const invoice = parameters.lightning
    if (!validate(network, invoice)) throw new Error('Invalid address')
    return invoice
  }

  const res = /^(\w+:)?(\w+)/i.exec(url)
  const address = res && res[2]

  console.log('DEBUG16: [%s] *%s*', network, address)

  const prefix = address.substr(0, 2)

  if(res[1] === 'lightning:' || prefix === 'ln' || prefix === 'LN') {
    if (!validate(network, address)) throw new Error('Invalid address')
  } else {
    if (!btc.validate(network, address)) throw new Error('Invalid address')
  }

  return address
}

function buildUrl (address) {
  return address
}

function depositUrl (address, amount) {
  const urlElements = _.split('?', address)

  if(_.size(urlElements) === 2) {
    return address
  }

  const parts = _.split(':', address)

  if(_.size(parts) === 2) {
    return `${address}?amount=${amount}`
  }

  if(address.substr(0, 2) === 'ln') {
    return `lightning:${address}?amount=${amount}`
  } else {
    return `bitcoin:${address}?amount=${amount}`
  }
}

function formatAddress (address) {
  return address
}

function validate (network, address) {
  if (!network) throw new Error('No network supplied.')
  if (!address) throw new Error('No address supplied.')
  return bech32Validator(network, address, bech32Opts, lengthLimit)
}

function createWallet () {
  const keyPair = bitcoin.ECPair.makeRandom()
  const segwitAddr = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey })

  return {
    publicAddress: segwitAddr.address,
    privateKey: keyPair.toWIF()
  }
}

function getExternalCryptoCode() {
    return EXTERNAL_CRYPTO_CODE
}

module.exports = {
  depositUrl,
  parseUrl,
  buildUrl,
  formatAddress,
  bech32Opts,
  lengthLimit,
  createWallet,
  getExternalCryptoCode
}
