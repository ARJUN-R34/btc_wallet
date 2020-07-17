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

```privateKey```
```publicKey```
```address```

#### Generate BECH32 Wallet

```const bech32Wallet = bitcoin.generateBECH32();```

##### Response

```privateKey```
```publicKey```
```privateKeyWIF```
```address```

#### Generate Bitcoin Test Wallet

```const testWallet = bitcoin.generateTestAccounts();```

##### Response

```private```
```public```
```address```
```wif```

#### Bitcoin Transaction (Testnet)

```const btcTx = bitcoin.signAndSendTransaction({ fromAddress, toAddress, value, privateKeyWIF });```

#### Success Response

```response: {transactionHash} - Transaction Hash of that particular transaction.```

#### Error Response

##### Insufficient balance

```error: 'Insufficient funds.'```

##### Incorrect private key

```error: 'Incorrect private Key.'```
