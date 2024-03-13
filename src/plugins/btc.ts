const bitcoin = require('bitcoinjs-lib')
import { base58Validator, bech32Validator, bech32mValidator } from './validators'

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

  public parseUrl (network: string, url: string): string | never {
    const res = /^(bitcoin:)?(\w+)/i.exec(url)
    const address = res && res[2]
    console.log('DEBUG16: [%s] *%s*', network, address)
    if (!address || !this.validate(network, address)) throw new Error('Invalid address')
    return address
  }

  public buildUrl (address: string): string {
    return `bitcoin:${address}`
  }

  public depositUrl (address: string, amount: string, _opts?: any): string {
    const parts = address.split(':')

    // Strike LN payment
    if (parts[0] === 'strike') return parts[3]

    // Regular LN payment
    if (parts.length === 2) return parts[2]

    return `bitcoin:${address}?amount=${amount}`
  }

  public formatAddress (address: string): string {
    const parts = address.split(':')
    const isLightning = parts.length >= 2

    if (isLightning) return 'Lightning Network'
    return address
  }

  public validate (network: string|null|undefined, address: string): boolean | never {
    if (!network) throw new Error('No network supplied.')
    return bech32mValidator(network, address, this.bech32Opts)
      || base58Validator(network, address, this.base58Opts)
      || bech32Validator(network, address, this.bech32Opts)
  }

  public createWallet () {
    const keyPair = bitcoin.ECPair.makeRandom()
    const segwitAddr = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey })

    return {
      publicAddress: segwitAddr.address,
      privateKey: keyPair.toWIF()
    }
  }

  public getAddressType (url: string, network: string): string | null {
    const address = this.parseUrl(network, url)
    return bech32mValidator(network, address, this.bech32Opts) ? 'P2TR' :
      base58Validator(network, address, this.base58Opts) ? 'P2PKH/P2SH (legacy)' :
      bech32Validator(network, address, this.bech32Opts) ? 'Native SegWit' :
      null
  }
}

export default new BTC()
