with import (fetchTarball {
  name = "nixpkgs-21808d22b1cda1898b71cf1a1beb524a97add2c4";
  url = "https://github.com/NixOS/nixpkgs/archive/21808d22b1cda1898b71cf1a1beb524a97add2c4.tar.gz";
  sha256 = "0v2z6jphhbk1ik7fqhlfnihcyff5np9wb3pv19j9qb9mpildx0cg";
}) {};

stdenv.mkDerivation {
  name = "node";
  buildInputs = [
    nodejs_22
  ];
  shellHook = ''
    export PATH="$PWD/node_modules/.bin/:$PATH"
  '';
}