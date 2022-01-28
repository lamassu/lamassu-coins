const _ = require('lodash/fp')
const base58Validator = require('./validators').base58Validator
const bech32Validator = require('./validators').bech32Validator
const bitcoin = require('bitcoinjs-lib')

const base58Opts = {
  bufferLength: 21,
  mainNetPrefix: [ [0x30], [0x32] ],
  testNetPrefix: [ [0x6f], [0x3a] ]
}

const bech32Opts = {
  mainNetPrefix: 'ltc',
  testNetPrefix: 'tltc'
}

function parseUrl (network, url) {
  const res = /^(litecoin:\/{0,2})?(\w+)/.exec(url)
  const address = res && res[2]

  console.log('DEBUG16: *%s*', address)
  if (!validate(network, address)) throw new Error('Invalid address')

  return address
}

function depositUrl (address, amount) {
  return `litecoin:${address}?amount=${amount}`
}

function buildUrl (address) {
  return `litecoin:${address}`
}

function validate (network, address) {
  if (!network) throw new Error('No network supplied.')
  if (!address) throw new Error('No address supplied.')
  if (base58Validator(network, address, base58Opts)) return true
  if (bech32Validator(network, address, bech32Opts)) return true
  return false
}

function createWallet () {
  // Network definition based on:
  // https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/test/integration/addresses.spec.ts
  const LITECOIN = {
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bech32: 'ltc',
    bip32: {
      public: 0x019da462,
      private: 0x019d9cfe,
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
  }
  const keyPair = bitcoin.ECPair.makeRandom({ network: LITECOIN })
  const segwitAddr = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: LITECOIN })

  return {
    publicAddress: segwitAddr.address,
    privateKey: keyPair.toWIF()
  }
}

module.exports = {
  depositUrl,
  parseUrl,
  buildUrl,
  base58Opts,
  bech32Opts,
  createWallet
}
