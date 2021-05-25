const configCoins = require('./config/consts')
const coinUtils = require('./utils')

const COINS = configCoins.COINS
const ALL_CRYPTOS = configCoins.ALL_CRYPTOS
const CRYPTO_CURRENCIES = configCoins.CRYPTO_CURRENCIES
const utils = coinUtils

module.exports = {
  COINS,
  ALL_CRYPTOS,
  CRYPTO_CURRENCIES,
  utils
}
