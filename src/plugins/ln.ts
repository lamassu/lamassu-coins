import * as _ from 'lodash/fp'
import * as bitcoin from 'bitcoinjs-lib'
const bolt11 = require('@lamassu/bolt11')

import { bech32Validator } from './validators'
import { CryptoPlugin } from './plugin'

class LN implements CryptoPlugin {
  lnurlOptions = {
    mainNetPrefix: 'lnurl',
    testNetPrefix: 'lntb'
  }

  invoiceOptions = {
    mainNetPrefix: 'lnbc',
    testNetPrefix: 'lntb'
  }

  lengthLimit = Number.MAX_SAFE_INTEGER

  public parseUrl (network: string, url: string, opts?: any, fromMachine?: any): string | never {
    const urlElements = _.split('?', url);

    // Handle address type: bitcoin:bc1(...)?amount=0.00035&lightning=lnbc(...)
    if(_.size(urlElements) === 2) {
      const lnElements = _.split('&', urlElements[1])
      const parameters = _.fromPairs(_.map((parameter: string) => _.split('=', parameter) , lnElements))
      const invoice = parameters.lightning
      if (!invoice || !this.validate(network, invoice, fromMachine)) throw new Error('Invalid address')
      return invoice
    }

    const res = /^(\w+:)?(\w+)/i.exec(url)
    const address = res && res[2]

    console.log('DEBUG16: [%s] *%s*', network, address)

    if (!address || !this.validate(network, address)) throw new Error('Invalid address')
    return address
  }

  public buildUrl (address: string): string {
    return address
  }

  public depositUrl (address: string, amount: string, _opts?: any): string {
    return address
  }

  validate (network: string, address: string, fromMachine?: string): boolean | never {
    if (!network) throw new Error('No network supplied.')
    if (bech32Validator(network, address, this.invoiceOptions, this.lengthLimit)) {
      let amount = 0
      try {
        amount = _.toNumber(bolt11.decode(address).millisatoshis)
        if (amount !== 0 && fromMachine) throw new Error(`Non-zero amount (${amount}) invoice supplied.`)
      } catch(e) {
        console.log(e)
        throw new Error('Invalid address')
      }
      return true
    }

    if (bech32Validator(network, address, this.lnurlOptions, this.lengthLimit)) return true
    return false
  }

  public formatAddress (address: string): string {
    return address
  }

  public getAddressType (url: string, network: string): string | null {
    return null
  }
}

export default new LN()
