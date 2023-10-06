const _ = require('lodash/fp')
const utils = require('../utils')
const { ALL_CRYPTOS } = require('../config/consts')

const NETWORKS = ['main', 'test', 'regtest']

function getSupportedCoinsForAddress (address) {
  const matches = _.reduce((acc, value) => {
    try {
      const network = _.find(it => {
        try {
          return !!utils.parseUrl(value, it, address)
        } catch (e) {
          return false
        }
      }, NETWORKS)
  
      const addressType = utils.getAddressType(value, address, network)

      if (network && addressType) {
        acc.push({ cryptoCode: value, addressType: addressType, isValid: true, network: network })
        return acc
      }
      return acc
    } catch (e) {
      return acc
    }
  }, [], ALL_CRYPTOS)

  return { address, matches }
}

module.exports = {
  getSupportedCoinsForAddress
}
