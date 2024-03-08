const _ = require('lodash/fp')

const detector = require('../../built/plugins/detector')

test('Should match all addresses', () => {
  const expected = [
    {
      address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
      matches: [
        {
          cryptoCode: 'BTC',
          addressType: 'P2PKH/P2SH (legacy)',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address: 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn',
      matches: [
        {
          cryptoCode: 'BTC',
          addressType: 'P2PKH/P2SH (legacy)',
          isValid: true,
          network: 'test'
        },
        {
          cryptoCode: 'LTC',
          addressType: 'P2PKH/PS2H',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      matches: [
        {
          cryptoCode: 'BTC',
          addressType: 'P2PKH/P2SH (legacy)',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address: '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc',
      matches: [
        {
          cryptoCode: 'BTC',
          addressType: 'P2PKH/P2SH (legacy)',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address: 'LVdPgVLae4mTeAdywWqmwWkJypAGcRkHy3',
      matches: [
        {
          cryptoCode: 'LTC',
          addressType: 'P2PKH/PS2H',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address: 'mhLpXMH9EGV7xFRg5gjKXFpoxaer7ehEeW',
      matches: [
        {
          cryptoCode: 'BTC',
          addressType: 'P2PKH/P2SH (legacy)',
          isValid: true,
          network: 'test'
        },
        {
          cryptoCode: 'LTC',
          addressType: 'P2PKH/PS2H',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address: 'ME7LnTc1rEdtiuSqJ2VivGJUWNPB7yS8fB',
      matches: [
        {
          cryptoCode: 'LTC',
          addressType: 'P2PKH/PS2H',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address: 'QSv2w3XpTPwSjZoQHjNxzebXXVH2Feaoke',
      matches: [
        {
          cryptoCode: 'LTC',
          addressType: 'P2PKH/PS2H',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address: 'XuvPuKz7JPkyzWn8g7PNLjYVNdouedLc56',
      matches: [
        {
          cryptoCode: 'DASH',
          addressType: 'P2PKH/P2SH',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address: 'yh1csSCnZNRLqBgzHFUMVTHaW4TU74K28R',
      matches: [
        {
          cryptoCode: 'DASH',
          addressType: 'P2PKH/P2SH',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address: '7Z5BvydGVzgbX9xqWEb1JtF9TkToG8htcV',
      matches: [
        {
          cryptoCode: 'DASH',
          addressType: 'P2PKH/P2SH',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address: '8ik6MdU1RprCq6YtTsHNkg8biMxZUyXo8q',
      matches: [
        {
          cryptoCode: 'DASH',
          addressType: 'P2PKH/P2SH',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address: 't1ZYZS6ynUDbvht7vH3dMiM3rsAJ1p6EGWC',
      matches: [
        {
          cryptoCode: 'ZEC',
          addressType: 'Transparent',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address: 'tmKBPqa8qqKA7vrGq1AaXHSAr9vqa3GczzK',
      matches: [
        {
          cryptoCode: 'ZEC',
          addressType: 'Transparent',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address: 't3f3T3nCWsEpzmD35VK62JgQfFig74dV8C9',
      matches: [
        {
          cryptoCode: 'ZEC',
          addressType: 'Transparent',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address: 't295qeRQc3xhzgf7HQYLh3du7uWyrLmtQf6',
      matches: [
        {
          cryptoCode: 'ZEC',
          addressType: 'Transparent',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      matches: [
        {
          cryptoCode: 'BTC',
          addressType: 'Native SegWit',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address: 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx',
      matches: [
        {
          cryptoCode: 'BTC',
          addressType: 'Native SegWit',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address: 'bc1p0xlxvlhemja6c4dqv22uapctqupfhlxm9h8z3k2e72q4k9hcz7vqzk5jj0',
      matches: [
        {
          cryptoCode: 'BTC',
          addressType: 'P2TR',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address: 'tb1pqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesf3hn0c',
      matches: [
        {
          cryptoCode: 'BTC',
          addressType: 'P2TR',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address: 'ltc1qnfu0fj4m528pt84jpxl8daz2mf7n0xdmxunm25',
      matches: [
        {
          cryptoCode: 'LTC',
          addressType: 'SegWit',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address: 'tltc1qfnpm6sdx9q6pse7rx9l3050fhrsevdg2mny4zg',
      matches: [
        {
          cryptoCode: 'LTC',
          addressType: 'SegWit',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address:
        'zs1kpat3qseujnnukms9yjkx7w3kgzev7jxhauc6cy2s3mupmvsvkvw04u3s35sffmv57leznctn5h',
      matches: [
        {
          cryptoCode: 'ZEC',
          addressType: 'Shielded',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address:
        'ztestsapling1kdp74adyfsmm9838jaupgfyx3npgw8ut63stjjx757pc248cuc0ymzphqeux60c64qe5qt68ygh',
      matches: [
        {
          cryptoCode: 'ZEC',
          addressType: 'Shielded',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address:
        '48AUrdCdtDSQ5szeyrKg2Efha5x43uYQgbe1De8nk3WheKxLRiZ1K8YMy4j1sJPoMbVZfXp8GiSNggRV8bnGfr6x9bLdWJL',
      matches: [
        {
          cryptoCode: 'XMR',
          addressType: 'Regular',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address:
        '9ydhoBD4fKt3Drnuwsh7kD4duNCRXw6Yk8DAZKGCsqDR1iRYbjshL1C6hxrH5urrXKPYoRKc49uAsfkDDucrFhutCKqPGY1',
      matches: [
        {
          cryptoCode: 'XMR',
          addressType: 'Regular',
          isValid: true,
          network: 'test'
        }
      ]
    },
    {
      address:
        'u1d32rw7pl54duptrfn462jkhd0y5lsvjgpx7kx9hggma70gmkzya0whex6twl0kt2d6ga4yxht5x5sxtvpu60yr2wsf6eklxxx0lggpz3davc5xxq8lt8en25zzmgc0ms472vjswfg2rfs6v03pavaz3n7a92r77fw5a32zza0e4vfgqn9p7epzvmkn8w6scj0rjky0u36w4wwcayykw',
      matches: [
        {
          cryptoCode: 'ZEC',
          addressType: 'Unified',
          isValid: true,
          network: 'main'
        }
      ]
    },
    {
      address:
        'utest1rkfkugmd87wtn3rqrzx5agp8rhzf7hnz4tkfuzn0kvsrdhq38jrkyy4t098m54rjulrw54r26am7jn2mhctdczvanr08tayaklu6jm38hzf3gyl6wut8gmd6445eph5gztg2z20g6r4retdcf65ufsklsrec8vuvul23h5mz2dnyx0p4q09t624ajt3wyckx4caykft09z30ygl2tf9',
      matches: [
        {
          cryptoCode: 'ZEC',
          addressType: 'Unified',
          isValid: true,
          network: 'test'
        }
      ]
    }
  ]

  const addresses = _.map(it => it.address, expected)
  const result = _.map(it => detector.getSupportedCoinsForAddress(it), addresses)

  expect(result).toStrictEqual(expected)
})
