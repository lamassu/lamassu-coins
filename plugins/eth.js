const url = require('url')
const CryptoJS = require('crypto-js')
const _sha3 = require('crypto-js/sha3')
const ICAP = require('ethereumjs-icap')
// Machines running on node6 don't support this lib
// const ethWallet = require('ethereumjs-wallet').default

function depositUrl (address, amount) {
  return `ethereum:${address}?amount=${amount}`
}

function parseUrl (network, uri) {
  try {
    var rec = url.parse(uri)
    if (rec.protocol === 'iban:') {
      var icap = rec.host.toUpperCase()
      return ICAP.toAddress(icap)
    }

    var address = rec.path || rec.host
    if (address && isValidAddress(address)) return address

    return null
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

// function createWallet () {
//   let addressData = ethWallet.generate()

//   return {
//     publicAddress: addressData.getAddressString(),
//     privateKey: addressData.getPrivateKeyString()
//   }
// }

module.exports = {
  depositUrl,
  parseUrl,
  buildUrl
  // createWallet
}
