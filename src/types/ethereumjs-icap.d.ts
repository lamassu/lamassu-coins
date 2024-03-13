declare module "ethereumjs-icap" {
  const toAddress: (iban: string) => string|never;
  export { toAddress }
}
