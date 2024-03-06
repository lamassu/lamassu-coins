const url = require('url')
const CryptoJS = require('crypto-js')
const _sha3 = require('crypto-js/sha3')
const ICAP = require('ethereumjs-icap')

function depositUrl (address, amount) {
  return `ethereum:${address}?amount=${amount}`
}

function parseUrl (network, uri, opts) {
  const cryptoCode = (opts && opts.cryptoCode) || 'ETH'
  try {
    const rec = url.parse(uri, true)
    let address = null
    if (rec.protocol === 'iban:') {
      var icap = rec.host.toUpperCase()
      return ICAP.toAddress(icap)
    }

    const queryAddress = rec.query.address
    if (rec.protocol === 'ethereum:' && cryptoCode === 'ETH' && queryAddress) {
      throw new Error('Invalid Address')
    }

    if (rec.protocol === 'ethereum:' && cryptoCode === 'USDT') {
      address = rec.query.address
      if (address && isValidAddress(address)) return address
    }

    if(rec.protocol === 'ethereum:') {
      // auth stores the address for the metamask edge case: `ethereum:0xABCD@1`
      address = rec.auth
      if (address && isValidAddress(address)) return address
    }

    address = rec.path || rec.host
    if (address && isValidAddress(address)) return address

    throw new Error('Invalid Address')
  } catch (e) {
    throw new Error('Invalid address')
  }
}

function buildUrl (address) {
  return `ethereum:${address}`
}

function isValidAddress (address) {
  return (address.toUpperCase() === address || address.toLowerCase() === address) 
    ? address.indexOf('0x') === 0
    : isChecksumAddress(address)
}

/* Adapted from web3.js https://github.com/ethereum/web3.js */
function sha3 (value, options) {
  if (options && options.encoding === 'hex') {
    if (value.length > 2 && value.substr(0, 2) === '0x') {
      value = value.substr(2)
    }
    value = CryptoJS.enc.Hex.parse(value)
  }

  return _sha3(value, {
    outputLength: 256
  }).toString()
}

function isChecksumAddress (address) {
  address = address.replace('0x', '')
  var addressHash = sha3(address.toLowerCase())

  for (var i = 0; i < 40; i++) {
    if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
        (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
      return false
    }
  }
  return true
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
