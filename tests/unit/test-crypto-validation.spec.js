const cryptoValidator = require('../../built/plugins/validators')
const BTC = require('../../built/plugins/btc')
const LTC = require('../../built/plugins/ltc')
const DASH = require('../../built/plugins/dash')
const XMR = require('../../built/plugins/xmr')
const ZEC = require('../../built/plugins/zec')

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

test('Should validate BTC bech32m', () => {
  const mainNetaddr = 'bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqzk5jj0'
  const testNetaddr = 'tb1pqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesf3hn0c'
  const validatedMain = cryptoValidator.bech32mValidator('main', mainNetaddr, BTC.bech32Opts)
  const validatedTest = cryptoValidator.bech32mValidator('test', testNetaddr, BTC.bech32Opts)
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

test('Should validate ZEC bech32', () => {
  const mainNetaddr = 'zs1kpat3qseujnnukms9yjkx7w3kgzev7jxhauc6cy2s3mupmvsvkvw04u3s35sffmv57leznctn5h'
  const testNetaddr = 'ztestsapling1kdp74adyfsmm9838jaupgfyx3npgw8ut63stjjx757pc248cuc0ymzphqeux60c64qe5qt68ygh'
  const validatedMain = cryptoValidator.zecBech32Validator('main', mainNetaddr, ZEC.bech32Opts)
  const validatedTest = cryptoValidator.zecBech32Validator('test', testNetaddr, ZEC.bech32Opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should validate XMR address', () => {
  const mainNetaddr = '48AUrdCdtDSQ5szeyrKg2Efha5x43uYQgbe1De8nk3WheKxLRiZ1K8YMy4j1sJPoMbVZfXp8GiSNggRV8bnGfr6x9bLdWJL'
  const testNetaddr = '9ydhoBD4fKt3Drnuwsh7kD4duNCRXw6Yk8DAZKGCsqDR1iRYbjshL1C6hxrH5urrXKPYoRKc49uAsfkDDucrFhutCKqPGY1'
  const validatedMain = cryptoValidator.xmrValidator('main', mainNetaddr, XMR.opts)
  const validatedTest = cryptoValidator.xmrValidator('test', testNetaddr, XMR.opts)
  expect(validatedMain).toBe(true)
  expect(validatedTest).toBe(true)
})

test('Should validate ZEC bech32m', () => {
  const mainNetaddr = 'u1d32rw7pl54duptrfn462jkhd0y5lsvjgpx7kx9hggma70gmkzya0whex6twl0kt2d6ga4yxht5x5sxtvpu60yr2wsf6eklxxx0lggpz3davc5xxq8lt8en25zzmgc0ms472vjswfg2rfs6v03pavaz3n7a92r77fw5a32zza0e4vfgqn9p7epzvmkn8w6scj0rjky0u36w4wwcayykw'
  const testNetaddr = 'utest1rkfkugmd87wtn3rqrzx5agp8rhzf7hnz4tkfuzn0kvsrdhq38jrkyy4t098m54rjulrw54r26am7jn2mhctdczvanr08tayaklu6jm38hzf3gyl6wut8gmd6445eph5gztg2z20g6r4retdcf65ufsklsrec8vuvul23h5mz2dnyx0p4q09t624ajt3wyckx4caykft09z30ygl2tf9'
  const validatedMain = cryptoValidator.zecBech32mValidator('main', mainNetaddr, ZEC.bech32mOpts)
  const validatedTest = cryptoValidator.zecBech32mValidator('test', testNetaddr, ZEC.bech32mOpts)
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
