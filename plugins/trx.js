const url = require('url')
const base58Validator = require('./validators').base58Validator

const base58Opts = {
  bufferLength: 21,
  mainNetPrefix: [
    [0x41],
  ],
  testNetPrefix: [
    [0x41],
  ]
}

function depositUrl (address, amount) {
  return `tron:${address}?amount=${amount}`
}

function parseUrl (network, uri) {
  try {
    var rec = url.parse(uri)

    var address = rec.path || rec.host
    if (address && isValidAddress(network, address)) return address

    return null
  } catch (e) {
    console.log(e)
    throw new Error('Invalid address')
  }
}

function buildUrl (address) {
  return `tron:${address}`
}


function isValidAddress (network, address) {
  if (!network) throw new Error('No network supplied.')
  if (!address) throw new Error('No address supplied.')
  if (base58Validator(network, address, base58Opts)) return true
  return false
}

function getAddressType (address, network) {
  const _address = parseUrl(network, address)
  if (isValidAddress(_address)) return 'Regular'
  return null
}

module.exports = {
  depositUrl,
  parseUrl,
  buildUrl,
  getAddressType
}
