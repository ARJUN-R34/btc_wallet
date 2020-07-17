# Bitcoin Transaction

This package can be used to generate Bech32 Bitcoin wallets and also transact on the Bitcoin testnet.

### Methods

1. generateP2PKH()
2. generateBECH32()
3. signAndSendTransaction()
4. generateTestAccounts()

### Installation

Install this package using,
```npm install --save btc-utils```

Import this package using,
```const bitcoin = require('btc-utils');```

### Usage

####  Generate P2PKH Wallet

```const p2pkhWallet = bitcoin.generateP2PKH();```

##### Response

- ```privateKey``` - Private Key of the wallet.
- ```publicKey``` - Public Key of the wallet.
- ```address``` - Address of the wallet.

#### Generate BECH32 Wallet

```const bech32Wallet = bitcoin.generateBECH32();```

##### Response

- ```privateKey``` - Private Key of the wallet.
- ```publicKey``` - Public Key of the wallet.
- ```privateKeyWIF``` - Private key in WIF (Wallet Import Format).
- ```address``` - Address of the wallet.

#### Generate Bitcoin Test Wallet

```const testWallet = bitcoin.generateTestAccounts();```

##### Response

- ```private``` - Private Key of the wallet.
- ```public``` - Public Key of the wallet.
- ```address``` - Address of the wallet.
- ```wif``` - Private key in WIF (Wallet Import Format).

#### Bitcoin Transaction (Testnet)

```const btcTx = bitcoin.signAndSendTransaction({ fromAddress, toAddress, value, privateKeyWIF });```

##### Parameters

- ```fromAddress``` - Address of the wallet to send the transaction from (sender).
- ```toAddress``` - Address of the wallet to send the transaction to (recepient).
- ```value``` - Amount of Bitcoins (in satoshis).
- ```privateKeyWIF``` - Private key of the sender in WIF (Wallet Import Format).

#### Success Response

```response: {transactionHash} - Transaction Hash of that particular transaction.```

#### Error Response

##### Insufficient balance

```error: 'Insufficient funds.'```

##### Incorrect private key

```error: 'Incorrect private Key.'```
