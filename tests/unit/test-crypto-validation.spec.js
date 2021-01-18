const cryptoValidator = require('../../plugins/validators')
const BTC = require('../../plugins/btc')
const LTC = require('../../plugins/ltc')
const DASH = require('../../plugins/dash')
const ZEC = require('../../plugins/zec')

test('Should validate BTC P2PKH', () => {
  const mainNetaddr = '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
  const testNetaddr = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, BTC.base58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, BTC.base58Opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should validate BTC P2SH', () => {
  const mainNetaddr = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy'
  const testNetaddr = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, BTC.base58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, BTC.base58Opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should validate LTC P2PKH', () => {
  const mainNetaddr = 'LVdPgVLae4mTeAdywWqmwWkJypAGcRkHy3'
  const testNetaddr = 'mhLpXMH9EGV7xFRg5gjKXFpoxaer7ehEeW'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, LTC.base58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, LTC.base58Opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should validate LTC P2SH', () => {
  const mainNetaddr = 'ME7LnTc1rEdtiuSqJ2VivGJUWNPB7yS8fB'
  const testNetaddr = 'QSv2w3XpTPwSjZoQHjNxzebXXVH2Feaoke'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, LTC.base58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, LTC.base58Opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should validate DASH P2PKH', () => {
  const mainNetaddr = 'XuvPuKz7JPkyzWn8g7PNLjYVNdouedLc56'
  const testNetaddr = 'yh1csSCnZNRLqBgzHFUMVTHaW4TU74K28R'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, DASH.base58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, DASH.base58Opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should validate DASH P2SH', () => {
  const mainNetaddr = '7Z5BvydGVzgbX9xqWEb1JtF9TkToG8htcV'
  const testNetaddr = '8ik6MdU1RprCq6YtTsHNkg8biMxZUyXo8q'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, DASH.base58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, DASH.base58Opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should validate ZEC P2PKH', () => {
  const mainNetaddr = 't1ZYZS6ynUDbvht7vH3dMiM3rsAJ1p6EGWC'
  const testNetaddr = 'tmKBPqa8qqKA7vrGq1AaXHSAr9vqa3GczzK'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, ZEC.base58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, ZEC.base58Opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should validate ZEC P2SH', () => {
  const mainNetaddr = 't3f3T3nCWsEpzmD35VK62JgQfFig74dV8C9'
  const testNetaddr = 't295qeRQc3xhzgf7HQYLh3du7uWyrLmtQf6'
  const validatedMain = cryptoValidator.base58Validator('main', mainNetaddr, ZEC.base58Opts)
  const validatedTest = cryptoValidator.base58Validator('test', testNetaddr, ZEC.base58Opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should validate BTC bech32', () => {
  const mainNetaddr = 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq'
  const testNetaddr = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx'
  const validatedMain = cryptoValidator.bech32Validator('main', mainNetaddr, BTC.bech32Opts)
  const validatedTest = cryptoValidator.bech32Validator('test', testNetaddr, BTC.bech32Opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should validate LTC bech32', () => {
  const mainNetaddr = 'ltc1qnfu0fj4m528pt84jpxl8daz2mf7n0xdmxunm25'
  const testNetaddr = 'tltc1qfnpm6sdx9q6pse7rx9l3050fhrsevdg2mny4zg'
  const validatedMain = cryptoValidator.bech32Validator('main', mainNetaddr, LTC.bech32Opts)
  const validatedTest = cryptoValidator.bech32Validator('test', testNetaddr, LTC.bech32Opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should fail length validation', () => {
  const addr = '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
  const opts = BTC.base58Opts
  opts.bufferLength = 10
  const validated = cryptoValidator.base58Validator('main', addr, opts)
  expect(validated).toBe(false)
})

test('Should throw invalid address checksum exception', () => {
  const addr = '3J98t1WpEZ73CNmQviecrnyiWrnqRhWN'
  const validated = cryptoValidator.base58Validator('main', addr, BTC.base58Opts)
  expect(validated).toBe(false)
})

test('Should throw Non-base58 character exception', () => {
  const addr = '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN0'
  const validated = cryptoValidator.base58Validator('main', addr, BTC.base58Opts)
  expect(validated).toBe(false)
})
