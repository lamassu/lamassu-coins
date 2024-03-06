const _ = require('lodash/fp')
const bitcoin = require('bitcoinjs-lib')
const bolt11 = require('@lamassu/bolt11')
const bech32Validator = require('./validators').bech32Validator

const lnurlOptions = {
  mainNetPrefix: 'lnurl',
  testNetPrefix: 'lntb'
}

const invoiceOptions = {
  mainNetPrefix: 'lnbc',
  testNetPrefix: 'lntb'
}

const lengthLimit = Number.MAX_SAFE_INTEGER

function parseUrl (network, url, opts, fromMachine) {
  const urlElements = _.split('?', url);

  // Handle address type: bitcoin:bc1(...)?amount=0.00035&lightning=lnbc(...)
  if(_.size(urlElements) === 2) {
    const lnElements = _.split('&', urlElements[1])
    const parameters = _.fromPairs(_.map(parameter => _.split('=', parameter) , lnElements))
    const invoice = parameters.lightning
    if (!validate(network, invoice, fromMachine)) throw new Error('Invalid address')
    return invoice
  }

  const res = /^(\w+:)?(\w+)/i.exec(url)
  const address = res && res[2]

  console.log('DEBUG16: [%s] *%s*', network, address)

  if (!validate(network, address)) throw new Error('Invalid address')
  return address
}

function buildUrl (address) {
  return address
}

function depositUrl (address, amount) {
  return address
}

function formatAddress (address) {
  return address
}

function validate (network, address, fromMachine) {
  if (!network) throw new Error('No network supplied.')
  if (!address) throw new Error('No address supplied.')

  if (bech32Validator(network, address, invoiceOptions, lengthLimit)) {
    let amount = 0
    try {
      amount = _.toNumber(bolt11.decode(address).millisatoshis)
      if (amount !== 0 && fromMachine) throw new Error('Non-zero amount invoice supplied.', amount)
    } catch(e) {
      console.log(e)
      throw new Error('Invalid address')
    }
    return true
  }

  if (bech32Validator(network, address, lnurlOptions, lengthLimit)) return true
  return false
}

module.exports = {
  depositUrl,
  parseUrl,
  buildUrl,
  formatAddress,
  lengthLimit
}
