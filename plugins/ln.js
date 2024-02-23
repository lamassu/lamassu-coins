const _ = require('lodash/fp')
const bitcoin = require('bitcoinjs-lib')
const bolt11 = require('@lamassu/bolt11')
const bech32Validator = require('./validators').bech32Validator

const bech32Opts = {
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

  let amount = 0
  try {
    amount = _.toNumber(bolt11.decode(address).millisatoshis)
  } catch(e) {
    throw new Error('Invalid address')
  }

  if (amount !== 0 && fromMachine) throw new Error('Non-zero amount invoice supplied.', amount)
  return bech32Validator(network, address, bech32Opts, lengthLimit)
}

module.exports = {
  depositUrl,
  parseUrl,
  buildUrl,
  formatAddress,
  bech32Opts,
  lengthLimit
}
