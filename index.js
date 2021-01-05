const configCoins = require('./config/coins')
const coinUtils = require('./utils')

const COINS = configCoins.COINS
const ALL_CRYPTOS = configCoins.ALL_CRYPTOS
const COIN_LIST = configCoins.COIN_LIST
const utils = coinUtils

module.exports = {
  COINS,
  ALL_CRYPTOS,
  COIN_LIST,
  utils
}