export interface CryptoPlugin {
  buildUrl(addr: string): string;
  depositUrl(addr: string, amount: string, opts?: any): string;
  parseUrl(network: string, url: string, opts?: any, fromMachine?: any): string | never;
  getAddressType(addr: string, network: string): (string | null);

  //formatAddress
  //createWallet
  //base58Opts
  //bech32Opts
  //validate
  //lengthLimit
  //opts
  //bech32mOpts
}
