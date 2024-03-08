const _ = require('lodash/fp')
const bitcoin = require('bitcoinjs-lib')
const base58Validator = require('./validators').base58Validator
const bech32Validator = require('./validators').bech32Validator
const bech32mValidator = require('./validators').bech32mValidator

import { CryptoPlugin } from './plugin'

class BTC implements CryptoPlugin {
  base58Opts = {
    bufferLength: 21,
    mainNetPrefix: [ [0x00], [0x05] ],
    testNetPrefix: [ [0x6f], [0xc4] ],
    regtestPrefix: [ [0x6f], [0xc4] ]
  }

  bech32Opts = {
    mainNetPrefix: 'bc',
    testNetPrefix: 'tb',
    regtestPrefix: 'bcrt'
  }

  parseUrl (network: string, url: string): string | never {
    const res = /^(bitcoin:)?(\w+)/i.exec(url)
    const address = res && res[2]
    console.log('DEBUG16: [%s] *%s*', network, address)
    if (!address || !this.validate(network, address)) throw new Error('Invalid address')
    return address
  }

  buildUrl (address: string): string {
    return `bitcoin:${address}`
  }

  depositUrl (address: string, amount: string): string {
    const parts = _.split(':', address)

    // Strike LN payment
    if (parts[0] === 'strike') return _.nth(3, parts)

    // Regular LN payment
    if (_.size(parts) === 2) return _.nth(1, parts)

    return `bitcoin:${address}?amount=${amount}`
  }

  formatAddress (address: string) {
    const parts = _.split(':', address)
    const isLightning = _.size(parts) >= 2

    if (isLightning) return 'Lightning Network'
    return address
  }

  validate (network: string|null|undefined, address: string) {
    if (!network) throw new Error('No network supplied.')
    if (bech32mValidator(network, address, this.bech32Opts)) return true
    if (base58Validator(network, address, this.base58Opts)) return true
    if (bech32Validator(network, address, this.bech32Opts)) return true
    return false
  }

  createWallet () {
    const keyPair = bitcoin.ECPair.makeRandom()
    const segwitAddr = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey })

    return {
      publicAddress: segwitAddr.address,
      privateKey: keyPair.toWIF()
    }
  }

  getAddressType (url: string, network: string): string | null {
    const address = this.parseUrl(network, url)
    if (bech32mValidator(network, address, this.bech32Opts)) return 'P2TR'
    if (base58Validator(network, address, this.base58Opts)) return 'P2PKH/P2SH (legacy)'
    if (bech32Validator(network, address, this.bech32Opts)) return 'Native SegWit'
    return null
  }
}

export default new BTC()
