import {CRYPTO_CURRENCIES} from './config/consts'

export function cryptoCurrencies() {
  return CRYPTO_CURRENCIES
}

export function getEquivalentCode(cryptoCurrency: string) {
  switch (cryptoCurrency) {
    case 'USDT_TRON':
      return 'USDT';
    case 'LN':
      return 'BTC';
    default:
      return cryptoCurrency;
  }
}

export function toUnit (cryptoAtoms: any, cryptoCode: string) {
  const cryptoRec = getCryptoCurrency(cryptoCode)
  const unitScale = cryptoRec.unitScale
  return cryptoAtoms.shiftedBy(-unitScale)
}

/* TODO: make cryptoCode more restrictive: https://www.typescriptlang.org/docs/handbook/enums.html */
export function getCryptoCurrency(cryptoCode: string) {
  const cryptoCurrency = cryptoCurrencies().find(crypto => crypto.cryptoCode === cryptoCode);
  if (!cryptoCurrency) throw new Error(`Unsupported crypto: ${cryptoCode}`);
  return cryptoCurrency;
}

export function formatCryptoAddress(cryptoCode: string = '', address: string = '') {
  return cryptoCode === 'BCH' ? address.replace('bitcoincash:', '') : address
}

