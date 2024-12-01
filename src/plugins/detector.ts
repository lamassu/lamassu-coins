import reduce from 'lodash/fp/reduce'
import find from 'lodash/fp/find'
import { getAddressType, parseUrl } from '../utils'
import { ALL_CRYPTOS } from '../config/consts'

const NETWORKS = ['main', 'test', 'regtest']

type Matches = Array<any>;

export function getSupportedCoinsForAddress (address: string): { address: string, matches: Matches } {
  const matches = reduce((acc: Matches, cryptoCode: string) => {
    try {
      const network = find((network: string) => {
        try {
          return !!parseUrl(cryptoCode, network, address)
        } catch (e) {
          return false
        }
      }, NETWORKS)
      if (!network) return acc

      const addressType = getAddressType(cryptoCode, address, network)
      if (!addressType) return acc

      acc.push({ cryptoCode, addressType, isValid: true, network })
      return acc
    } catch (e) {
      return acc
    }
  }, [], ALL_CRYPTOS)

  return { address, matches }
}
