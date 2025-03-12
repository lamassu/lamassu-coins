import url from 'url'
import sha3 from 'crypto-js/sha3'
import ICAP from 'ethereumjs-icap'

import { CryptoPlugin } from './plugin'

  /* Adapted from web3.js https://github.com/ethereum/web3.js */
const sha3str = (value: string): string =>
  sha3(value, { outputLength: 256 }).toString()


class ETH implements CryptoPlugin {
  public depositUrl (address: string, amount: string): string {
    return `ethereum:${address}?amount=${amount}`
  }

  public parseUrl (network: string, uri: string, opts?: any): string | never {
    const cryptoCode = (opts && opts.cryptoCode) || 'ETH'
    try {
      const rec = url.parse(uri, true)
      let address = null
      if (rec.protocol === 'iban:') {
        let icap = rec.host
        if (!icap) throw new Error('Invalid Address')
        return ICAP.toAddress(icap.toUpperCase())
      }

      const queryAddress = rec.query.address
      if (rec.protocol === 'ethereum:' && cryptoCode === 'ETH' && queryAddress) {
        throw new Error('Invalid Address')
      }

      if (rec.protocol === 'ethereum:' && cryptoCode === 'USDT') {
        address = rec.query.address as string /* TODO */
        if (address && this.isValidAddress(address)) return address
      }

      if(rec.protocol === 'ethereum:') {
        // auth stores the address for the metamask edge case: `ethereum:0xABCD@1`
        address = rec.auth
        if (address && this.isValidAddress(address)) return address
      }

      address = rec.path || rec.host
      if (address && this.isValidAddress(address)) return address

      throw new Error('Invalid Address')
    } catch (e) {
      throw new Error('Invalid address')
    }
  }

  public buildUrl (address: string): string {
    return `ethereum:${address}`
  }

  isValidAddress (address: string): boolean {
    return (address.toUpperCase() === address || address.toLowerCase() === address)
      ? address.indexOf('0x') === 0
      : this.isChecksumAddress(address)
  }

  isChecksumAddress (address: string): boolean {
    address = address.replace('0x', '')
    let addressHash = sha3str(address.toLowerCase())

    for (let i = 0; i < 40; i++) {
      if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
          (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
        return false
      }
    }
    return true
  }

  public getAddressType (url: string, network: string): string | null {
    const address = this.parseUrl(network, url)
    return this.isValidAddress(address) ? 'Regular' : null
  }
}

export default new ETH()
