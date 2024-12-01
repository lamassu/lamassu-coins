const _ = require('lodash/fp')
const blakejs = require('blakejs')

const MIN_LENGTH = 48
const MAX_LENGTH = 4194368
const ELL_H = 64

const xor = (l, r) => {
  return _.map(([a, b]) => a ^ b, _.zip(l, r))
}

const G = (i, m, ellR) => {
  const aux = _.reduce(
    (acc, value) => {
      const personal = new Uint8Array([
        ...new Uint8Array(Buffer.from(`UA_F4Jumble_G`)),
        ...new Uint8Array(Buffer.from([i, value & 0xFF, value >> 8]))
      ])
      return new Uint8Array([...acc, ...blakejs.blake2b(m, null, null, '', personal)])
    },
    new Uint8Array([]),
    _.range(0, Math.floor((ellR + ELL_H - 1) / ELL_H))
  )

  return _.slice(0, ellR, aux)
}

const H = (i, m, ellL) => {
  const personal = new Uint8Array([
    ...new Uint8Array(Buffer.from(`UA_F4Jumble_H`)),
    ...new Uint8Array(Buffer.from([i, 0, 0]))
  ])
  return blakejs.blake2b(m, null, ellL, '', personal)
}

const f4Jumble = input => {
  const ellM = _.size(input)
  const ellL = _.min([ELL_H, Math.floor(ellM / 2)])
  const ellR = ellM - ellL

  const a = new Uint8Array(_.slice(0, ellL, input))
  const b = new Uint8Array(_.slice(ellL, ellM, input))
  const x = xor(b, G(0, new Uint8Array(a), ellR))
  const y = xor(a, H(0, new Uint8Array(x), ellL))
  const d = xor(x, G(1, new Uint8Array(y), ellR))
  const c = xor(y, H(1, new Uint8Array(d), ellL))
  return new Uint8Array(_.concat(c, d))
}

const f4Unjumble = input => {
  const ellM = _.size(input)
  const ellL = _.min([ELL_H, Math.floor(ellM / 2)])
  const ellR = ellM - ellL

  const c = new Uint8Array(_.slice(0, ellL, input))
  const d = new Uint8Array(_.slice(ellL, ellM, input))
  const y = xor(c, H(1, new Uint8Array(d), ellL))
  const x = xor(d, G(1, new Uint8Array(y), ellR))
  const a = xor(y, H(0, new Uint8Array(x), ellL))
  const b = xor(x, G(0, new Uint8Array(a), ellR))
  return new Uint8Array(_.concat(a, b))
}

module.exports = { f4Jumble, f4Unjumble }
