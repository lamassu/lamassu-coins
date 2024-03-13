import _ from 'lodash/fp'

import { base58Validator, zecBech32Validator, zecBech32mValidator } from './validators'
import { CryptoPlugin } from './plugin'

class ZEC implements CryptoPlugin {
  base58Opts = {
    bufferLength: 22,
    mainNetPrefix: [
      [0x1C, 0xB8], // t1
      [0x1C, 0xBD]  // t3
    ],
    testNetPrefix: [
      [0x1C, 0xBA], // t2
      [0x1D, 0x25]  // tm
    ]
  }

  bech32Opts = {
    mainNetPrefix: 'zs',
    testNetPrefix: 'ztestsapling'
  }

  bech32mOpts = {
    mainNetPrefix: 'u',
    testNetPrefix: 'utest'
  }

  public parseUrl (network: string, url: string): string | never {
    const res = /^(zcash:\/{0,2})?(\w+)/.exec(url)
    const address = res && res[2]

    console.log('DEBUG16: *%s*', address)
    if (!address || !this.validate(network, address)) throw new Error('Invalid address')
    return address
  }

  public depositUrl (address: string, amount: string, _opts?: any): string {
    return `zcash:${address}?amount=${amount}`
  }

  public buildUrl (address: string): string {
    return `zcash:${address}`
  }

  validate (network: string|null|undefined, address: string): boolean | never {
    if (!network) throw new Error('No network supplied.')
    return base58Validator(network, address, this.base58Opts)
      || zecBech32Validator(network, address, this.bech32Opts)
      || zecBech32mValidator(network, address, this.bech32mOpts)
  }

  public getAddressType (url: string, network: string): string | null {
    const address = this.parseUrl(network, url)
    return base58Validator(network, address, this.base58Opts) ? 'Transparent' :
      zecBech32Validator(network, address, this.bech32Opts) ? 'Shielded' :
      zecBech32mValidator(network, address, this.bech32mOpts) ? 'Unified' :
      null
  }
}

export default new ZEC()
