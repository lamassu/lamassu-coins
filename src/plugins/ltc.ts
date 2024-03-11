const _ = require('lodash/fp')
const base58Validator = require('./validators').base58Validator
const bech32Validator = require('./validators').bech32Validator
const bitcoin = require('bitcoinjs-lib')

import { CryptoPlugin } from './plugin'

class LTC implements CryptoPlugin {
  base58Opts = {
    bufferLength: 21,
    mainNetPrefix: [ [0x30], [0x32] ],
    testNetPrefix: [ [0x6f], [0x3a] ]
  }

  bech32Opts = {
    mainNetPrefix: 'ltc',
    testNetPrefix: 'tltc'
  }

  public parseUrl(network: string, url: string, opts?: any, fromMachine?: any): string | never {
    const res = /^(litecoin:\/{0,2})?(\w+)/.exec(url)
    const address = res && res[2]

    console.log('DEBUG16: *%s*', address)
    if (!address || !this.validate(network, address)) throw new Error('Invalid address')

    return address
  }

  public depositUrl(addr: string, amount: string, opts?: any): string {
    return `litecoin:${addr}?amount=${amount}`
  }

  public buildUrl(addr: string): string {
    return `litecoin:${addr}`
  }

  public validate (network: string|null|undefined, address: string) {
    if (!network) throw new Error('No network supplied.')
    if (base58Validator(network, address, this.base58Opts)) return true
    if (bech32Validator(network, address, this.bech32Opts)) return true
    return false
  }

  public createWallet () {
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

  public getAddressType(url: string, network: string): string | null {
    const address = this.parseUrl(network, url)
    return base58Validator(network, address, this.base58Opts) ? 'P2PKH/PS2H' :
      bech32Validator(network, address, this.bech32Opts) ? 'SegWit' :
      null
  }
}

export default new LTC()
