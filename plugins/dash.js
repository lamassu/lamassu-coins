const _ = require('lodash/fp')
const base58Validator = require('./validators').base58Validator
const { PrivateKey } = require('@dashevo/dashcore-lib')

const base58Opts = {
  bufferLength: 21,
  mainNetPrefix: [ [0x4c], [0x10] ],
  testNetPrefix: [ [0x8c], [0x13] ]
}

function parseUrl (network, url) {
  const res = /^(dash:\/{0,2})?(\w+)/.exec(url)
  const address = res && res[2]

  console.log('DEBUG16: *%s*', address)
  if (!validate(network, address)) throw new Error('Invalid address')

  return address
}

function buildUrl (address) {
  return `dash:${address}`
}

function depositUrl (address, amount) {
  return `dash:${address}?amount=${amount}`
}

function validate (network, address) {
  if (!network) throw new Error('No network supplied.')
  if (!address) throw new Error('No address supplied.')
  if (base58Validator(network, address, base58Opts)) return true
  return false
}

function createWallet() {
  const privateKey = new PrivateKey()
  const address = privateKey.toAddress().toString()
  return {
    publicAddress: address,
    privateKey: privateKey.toWIF()
  }
}

module.exports = {
  depositUrl,
  parseUrl,
  buildUrl,
  base58Opts,
  createWallet
}
