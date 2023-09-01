const BTC = require('../../plugins/btc')
const LTC = require('../../plugins/ltc')
const DASH = require('../../plugins/dash')
const ZEC = require('../../plugins/zec')
const ETH = require('../../plugins/eth')
const BCH = require('../../plugins/bch')
const TRX = require('../../plugins/trx')

test('Should parse BTC address', () => {
  const addr = '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
  const parsed = BTC.parseUrl('main', addr)
  expect(addr).toBe(parsed)
})

test('Should throw for invalid BTC address', () => {
  const addr = '1BvBMSEYstWetqTgn5Au4m4GFg2xJaNVN4'
  const spy = jest.spyOn(BTC, 'parseUrl')
  try {
    spy('main', addr)
  } catch (error) { }
  expect(spy).toThrow()
})

test('Should parse LTC address', () => {
  const addr = 'LVdPgVLae4mTeAdywWqmwWkJypAGcRkHy3'
  const parsed = LTC.parseUrl('main', addr)
  expect(addr).toBe(parsed)
})

test('Should throw for invalid LTC address', () => {
  const addr = 'LVddgVL4e4mTeAdywWqmwWkJypAGcRkHd3'
  const spy = jest.spyOn(LTC, 'parseUrl')
  try {
    spy('main', addr)
  } catch (error) { }
  expect(spy).toThrow()
})

test('Should parse DASH address', () => {
  const addr = 'XuvPuKz7JPkyzWn8g7PNLjYVNdouedLc56'
  const parsed = DASH.parseUrl('main', addr)
  expect(addr).toBe(parsed)
})

test('Should throw for invalid DASH address', () => {
  const addr = 'XuvPuKz7JPkyzWn8g7PNLjYVN3ouedsc56'
  const spy = jest.spyOn(DASH, 'parseUrl')
  try {
    spy('main', addr)
  } catch (error) { }
  expect(spy).toThrow()
})

test('Should parse ZEC address', () => {
  const addr = 't1ZYZS6ynUDbvht7vH3dMiM3rsAJ1p6EGWC'
  const parsed = ZEC.parseUrl('main', addr)
  expect(addr).toBe(parsed)
})

test('Should throw for invalid ZEC address', () => {
  const addr = 't1ZYZS6ynUDbvht7vH3dMi23rs3J1p6dGWC'
  const spy = jest.spyOn(ZEC, 'parseUrl')
  try {
    spy('main', addr)
  } catch (error) { }
  expect(spy).toThrow()
})

test('Should parse ETH address', () => {
  const addr1 = '71E23708793f83Cf8Aa72e26D31E9cd75B5691B5'
  const addr2 = '0xe6C61C463b441CA6585EF1D5974389B360D503F6'
  const parsed1 = ETH.parseUrl('main', addr1)
  const parsed2 = ETH.parseUrl('main', `ethereum:${addr2}@1`)
  expect(addr1).toBe(parsed1)
  expect(addr2).toBe(parsed2)
})

test('Should throw for invalid ETH address', () => {
  const addr = '71E23708793f83Cf8Aa72e26D31E9cd75B5691B5'
  const spy = jest.spyOn(ETH, 'parseUrl')
  try {
    spy('main', addr)
  } catch (error) { }
  expect(spy).toThrow()
})

test('Should parse TRX address', () => {
  const addr = 'TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL'
  const parsed = TRX.parseUrl('main', addr)
  expect(addr).toBe(parsed)
})

test('Should throw for invalid TRX address', () => {
  const addr = 'TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqe2'
  const spy = jest.spyOn(TRX, 'parseUrl')
  try {
    spy('main', addr)
  } catch (error) { }
  expect(spy).toThrow()
})
