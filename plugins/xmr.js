const _ = require('lodash/fp')

const { xmrValidator } = require('./validators')

const opts = {
  mainNetPublicAddrPrefix: '12',
  mainNetIntegratedAddrPrefix: '13',
  mainNetSubAddrPrefix: '2a',
  testNetPublicAddrPrefix: '35',
  testNetIntegratedAddrPrefix: '35',
  testNetSubAddrPrefix: '3f'
}

function parseUrl (network, url) {
  const res = /^(monero:\/{0,2})?(\w+)/.exec(url)
  const address = res && res[2]

  console.log('DEBUG16: *%s*', address)
  if (!validate(network, address)) throw new Error('Invalid address')

  return address
}

function depositUrl (address, amount) {
  return `monero:${address}?amount=${amount}`
}

function buildUrl (address) {
  return `monero:${address}`
}

function validate (network, address) {
  if (!network) throw new Error('No network supplied.')
  if (!address) throw new Error('No address supplied.')
  if (xmrValidator(network, address, opts)) return true
  return false
}

module.exports = {
  opts,
  parseUrl,
  depositUrl,
  buildUrl
}
