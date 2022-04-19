const _ = require('lodash/fp')
const bitcoin = require('bitcoinjs-lib')
const btc = require('./btc')
const bech32Validator = require('./validators').bech32Validator

const bech32Opts = {
  mainNetPrefix: 'lnbc',
  testNetPrefix: 'lntb'
}

function parseUrl (network, url) {
  const urlElements = _.split('?', url);
  const lnInvoiceElements = _.split('&', urlElements[1])

  // Handle address type: bitcoin:bc1(...)?amount=0.00035&lightning=lnbc(...)
  if(_.size(urlElements) === 2 && _.size(lnInvoiceElements) === 2) {
    const lightningParameter = lnInvoiceElements[1]
    const invoice = _.split('=', lightningParameter)[1]
    if (!validate(network, invoice)) throw new Error('Invalid address')
    return invoice
  }

  const res = /^(\w+:)?(\w+)/i.exec(url)
  const address = res && res[2]

  console.log('DEBUG16: [%s] *%s*', network, address)

  if(address.substr(0, 2) === 'ln') {
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

  if(_.size(urlElements) === 3) {
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
  if (bech32Validator(network, address, bech32Opts, Number.MAX_SAFE_INTEGER)) return true
  return false
}

function createWallet () {
  const keyPair = bitcoin.ECPair.makeRandom()
  const segwitAddr = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey })

  return {
    publicAddress: segwitAddr.address,
    privateKey: keyPair.toWIF()
  }
}

module.exports = {
  depositUrl,
  parseUrl,
  buildUrl,
  formatAddress,
  bech32Opts,
  createWallet
}
