const _ = require('lodash/fp')
const bs58check = require('bs58check')
const { bech32, bech32m } = require('bech32')
const keccak256 = require('keccak256')

const cnBase58 = require('./crypto/cnbase58')
const { f4Unjumble: reverseF4Jumble } = require('./crypto/f4jumble')

module.exports = {
  base58Validator,
  bech32mValidator,
  bech32Validator,
  isBech32Address,
  zecBech32Validator,
  zecBech32mValidator,
  xmrValidator
}

function validatePrefix(prefix, buf) {
  for (let prefixIndex = 0; prefixIndex < prefix.length; prefixIndex++) {
    let currentPrefix = prefix[prefixIndex]
    for (let byteIndex = 0; byteIndex < currentPrefix.length; byteIndex++) {
      if (currentPrefix[byteIndex] !== buf[byteIndex]) break
      if (byteIndex === currentPrefix.length - 1) return true
    }
  }
  return false
}

function base58Validator (network, address, opts) {
  try {
    const buf = bs58check.decode(address)

    if (buf.length !== opts.bufferLength) {
      console.log(`Invalid base58 address length: ${buf.length}`)
      return false
    }

    const prefix = network === 'main' ? opts.mainNetPrefix :
      network === 'test' ? opts.testNetPrefix :
      network === 'regtest' ? opts.regtestPrefix :
      null

    if (prefix) return validatePrefix(prefix, buf)
    console.log('Unrecognized network:', network)
    return false
  } catch (error) {
    console.log('Not a base58 address:', error.message)
    return false
  }
}

function bech32mValidator (network, address, opts) {
  let decoded
  try {
    decoded = bech32m.decode(address)
  } catch (error) {
    console.log('Not a bech32m address')
    return false
  }

  const witnessVersion = decoded.words[0]
  if (witnessVersion < 1 || witnessVersion > 16) {
    console.log('Unsupported witness version for bech32m')
    return false
  }

  const data = bech32m.fromWords(decoded.words.slice(1))	
  if (data.length < 2 || data.length > 40) {	
    console.log(`Invalid bech32m address length: ${data.length}`)	
    return false	
  }

  if (network === 'main' && decoded.prefix === opts.mainNetPrefix) return true
  if (network === 'test' && decoded.prefix === opts.testNetPrefix) return true
  if (network === 'regtest' && decoded.prefix === opts.regtestPrefix) return true
  return false
}

function bech32Validator (network, address, opts, limit) {
  let decoded
  try {
    decoded = bech32.decode(address, limit)
  } catch (error) {
    console.log('Not a bech32 address')
    return false
  }
  // LN invoice
  if(limit) {
    if (network === 'main' && address.toLowerCase().startsWith(opts.mainNetPrefix)) return true
    if (network === 'test' && address.toLowerCase().startsWith(opts.testNetPrefix)) return true
    return false
  }

  const witnessVersion = decoded.words[0]
  if (witnessVersion !== 0) {
    console.log('Unsupported witness version for bech32')
    return false
  }

  const data = bech32.fromWords(decoded.words.slice(1))	
  if (data.length !== 20 && data.length !== 32) {	
    console.log(`Invalid bech32 address length: ${data.length}`)	
    return false	
  }

  if (network === 'main' && decoded.prefix === opts.mainNetPrefix) return true
  if (network === 'test' && decoded.prefix === opts.testNetPrefix) return true
  if (network === 'regtest' && decoded.prefix === opts.regtestPrefix) return true
  return false
}

function isBech32Address (address, opts, lengthLimit) {
  return bech32Validator('main', address, opts, lengthLimit) || bech32Validator('test', address, opts, lengthLimit)
}

function zecBech32Validator (network, address, opts) {
  let decoded
  try {
    decoded = bech32.decode(address)
  } catch (error) {
    console.log('Not a bech32 address')
    return false
  }

  const data = bech32.fromWords(decoded.words)	
  if (data.length !== 43) {	
    console.log(`Invalid bech32 address length: ${data.length}`)	
    return false
  }

  if (network === 'main' && decoded.prefix === opts.mainNetPrefix) return true
  if (network === 'test' && decoded.prefix === opts.testNetPrefix) return true
  return false
}

function zecBech32mValidator (network, address, opts) {
  const confirmPadding = (unjumbled, humanReadiblePadding) => {
    const humanReadibleBuffer = Buffer.from(humanReadiblePadding).toString('hex')
    const lastBytes = Buffer.from(unjumbled).toString('hex').slice(-32)

    const paddingMask = '00000000000000000000000000000000'
    const paddedRes = (humanReadibleBuffer + paddingMask).substring(0, paddingMask.length) // Buffer.padEnd is not available before ES2017 (l-m doesn't support it)

    return lastBytes === paddedRes
  }

  let decoded
  try {
    decoded = bech32m.decode(address, 512)
  } catch (error) {
    console.log('error', error)
    console.log('Not a bech32m address')
    return false
  }

  const data = bech32m.fromWords(decoded.words)

  const res = reverseF4Jumble(data)

  if (network === 'main' && confirmPadding(res, opts.mainNetPrefix)) return true
  if (network === 'test' && confirmPadding(res, opts.testNetPrefix)) return true
  return false
}

function xmrValidator (network, address, opts) {
  const keccak256Checksum = payload =>
    keccak256(Buffer.from(payload)).toString('hex').substr(0, 8)
  
  const hexToBin = hex => {
    if (hex.length % 2 !== 0) return null
    var res = new Uint8Array(hex.length / 2)
    for (var i = 0; i < hex.length / 2; ++i) {
      res[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
    }
    return res
  }

  try {
    const decoded = cnBase58.decode(address)
    const addrChecksum = decoded.slice(-8)
    const hashChecksum = keccak256Checksum(hexToBin(decoded.slice(0, -8)))
    const matchesMainNetPrefix = _.startsWith(opts.mainNetPublicAddrPrefix, decoded) || _.startsWith(opts.mainNetIntegratedAddrPrefix, decoded) || _.startsWith(opts.mainNetSubAddrPrefix, decoded)
    const matchesTestNetPrefix = _.startsWith(opts.testNetPublicAddrPrefix, decoded) || _.startsWith(opts.testNetIntegratedAddrPrefix, decoded) || _.startsWith(opts.testNetSubAddrPrefix, decoded)
    if (network === 'main' && matchesMainNetPrefix && addrChecksum === hashChecksum) return true
    if (network === 'test' && matchesTestNetPrefix && addrChecksum === hashChecksum) return true
    return false
  } catch (err) {
    console.log('Not an XMR address')
    return false
  }
}
