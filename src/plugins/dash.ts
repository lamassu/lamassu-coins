const base58Validator = require('./validators').base58Validator

import { CryptoPlugin } from './plugin'

class DASH implements CryptoPlugin {
  base58Opts = {
    bufferLength: 21,
    mainNetPrefix: [ [0x4c], [0x10] ],
    testNetPrefix: [ [0x8c], [0x13] ]
  }

  public parseUrl (network: string, url: string): string | never {
    const res = /^(dash:\/{0,2})?(\w+)/.exec(url)
    const address = res && res[2]

    console.log('DEBUG16: *%s*', address)
    if (!address || !this.validate(network, address)) throw new Error('Invalid address')

    return address
  }

  public buildUrl (address: string): string {
    return `dash:${address}`
  }

  public depositUrl (address: string, amount: string, _opts?: any): string {
    return `dash:${address}?amount=${amount}`
  }

  validate (network: string, address: string): boolean | never {
    if (!network) throw new Error('No network supplied.')
    if (base58Validator(network, address, this.base58Opts)) return true
    return false
  }

  public getAddressType (url: string, network: string): string | null {
    const address = this.parseUrl(network, url)
    return base58Validator(network, address, this.base58Opts) ? 'P2PKH/P2SH' : null
  }
}

export default new DASH()
