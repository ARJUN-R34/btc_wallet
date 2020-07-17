/* eslint-disable new-cap */
/* eslint-disable no-console */
const secureRandom = require('secure-random');
const sha256 = require('js-sha256');
const base58 = require('bs58');
const ripemd160 = require('ripemd160');
const { ec } = require('elliptic');
const bitcoin = require('bitcoinjs-lib');

function generateP2PKH() {
  const max = Buffer.from('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140', 'hex');
  let isInvalid = true;
  let privateKey;

  while (isInvalid) {
    const pKey = secureRandom.randomBuffer(32);

    if (Buffer.compare(max, pKey) === 1) {
      isInvalid = false;
    }
    privateKey = pKey.toString('hex');
  }

  const ecdsa = new ec('secp256k1');
  const keys = ecdsa.keyFromPrivate(privateKey);
  const publicKey = keys.getPublic('hex');

  console.log('Private Key is : ', privateKey);
  console.log('Public Key is : ', publicKey);

  const hash = sha256(Buffer.from(publicKey, 'hex'));

  const publicKeyHash = new ripemd160().update(Buffer.from(hash, 'hex')).digest();

  const step1 = Buffer.from(`00${publicKeyHash.toString('hex')}`, 'hex');
  const step2 = sha256(step1);
  const step3 = sha256(Buffer.from(step2, 'hex'));
  const checksum = step3.substring(0, 8);
  const step4 = step1.toString('hex') + checksum;
  const address = base58.encode(Buffer.from(step4, 'hex'));

  console.log('P2PKH Address : ', address);

  return { response: { privateKey, publicKey, address } };
}

function generateBECH32() {
  const keyPair = bitcoin.ECPair.makeRandom();

  const publicKey = keyPair.publicKey.toString('hex');
  const privateKey = keyPair.privateKey.toString('hex');
  const privateKeyWIF = keyPair.toWIF();
  const { address } = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey });
  const bech32Address = address.toString('hex');

  console.log('Public Key : ', publicKey);
  console.log('Private Key : ', privateKey);
  console.log('Private Key WIF : ', privateKeyWIF);
  console.log('BECH32 Address : ', bech32Address);

  return {
    response: {
      privateKey, publicKey, privateKeyWIF, address: bech32Address,
    },
  };
}

module.exports = { generateP2PKH, generateBECH32 };
