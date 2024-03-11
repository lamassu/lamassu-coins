const _ = require('lodash/fp')

const { xmrValidator } = require('./validators')

import { CryptoPlugin } from './plugin'

class XMR implements CryptoPlugin {
  opts = {
    mainNetPublicAddrPrefix: '12',
    mainNetIntegratedAddrPrefix: '13',
    mainNetSubAddrPrefix: '2a',
    testNetPublicAddrPrefix: '35',
    testNetIntegratedAddrPrefix: '35',
    testNetSubAddrPrefix: '3f'
  }

  public parseUrl(network: string, url: string, opts?: any, fromMachine?: any): string | never {
    const res = /^(monero:\/{0,2})?(\w+)/.exec(url)
    const address = res && res[2]

    console.log('DEBUG16: *%s*', address)
    if (!address || !this.validate(network, address)) throw new Error('Invalid address')
    return address
  }

  public depositUrl(addr: string, amount: string, opts?: any): string {
    return `monero:${addr}?amount=${amount}`
  }

  public buildUrl(addr: string): string {
    return `monero:${addr}`
  }

  validate (network: string|null|undefined, address: string): boolean | never {
    if (!network) throw new Error('No network supplied.')
    return xmrValidator(network, address, this.opts)
  }

  public getAddressType(url: string, network: string): string | null {
    const address = this.parseUrl(network, url)
    return xmrValidator(network, address, this.opts) ? 'Regular' : null
  }
}

export default new XMR()
