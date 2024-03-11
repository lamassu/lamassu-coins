const cashaddr = require('cashaddrjs')
import _ from 'lodash/fp'
const { PrivateKey } = require('bitcore-lib-cash')

const NETWORK_PREFIX: { [key: string]: string } = {'main': 'bitcoincash:', 'test': 'bchtest:'}

import { CryptoPlugin } from './plugin'

class BCH implements CryptoPlugin {
  public parseUrl (network: string, uri: string, opts?: any): string | never {
    const res = /^(bitcoincash:\/{0,2}|bchtest:\/{0,2})?(\w+)/.exec(uri.toLowerCase())
    const addressPayload = res && res[2]
    const address = NETWORK_PREFIX[network] + addressPayload

    console.log('DEBUG16: [%s] *%s*', network, addressPayload)

    if (!this.validate(address)) throw new Error('Invalid address')

    return address
  }

  public buildUrl (address: string): string {
    return `${address}`
  }

  public depositUrl (address: string, amount: string): string {
    return `${address}?amount=${amount}`
  }

  validate (address: string): boolean | never {
    try {
      if (!address) throw new Error('No address supplied.')

      const buf = cashaddr.decode(address)
      // if either payload is invalid or payload and network don't match, cashaddrjs throws validationError
      return true
    } catch (err) {
      console.log(err)
      console.log('Invalid bitcoin cash address: %s', address)
      return false
    }
  }

  public formatAddress (address: string): string {
    const [, secondPart] = address.split(':')

    if (secondPart) return secondPart
    return address
  }


  public createWallet() {
    const privateKey = new PrivateKey()
    const address = privateKey.toAddress().toString()

    return {
      publicAddress: address,
      privateKey: privateKey.toWIF()
    }
  }

  public getAddressType (address: string, network: string): string | null {
    try {
      const { type } = cashaddr.decode(this.parseUrl(network, address))
      return type
    } catch (e) {
      return null
    }
  }
}

export default new BCH()
