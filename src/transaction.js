/* eslint-disable no-console */
/* eslint-disable max-len */
const bitcoin = require('bitcoinjs-lib');
const { postRequest } = require('./helper');

async function generateTestAccounts() {
  const { error, response: keyPair1 } = await postRequest({ url: 'http://api.blockcypher.com/v1/btc/test3/addrs' });

  if (error) {
    return { error };
  }

  console.log(keyPair1.data);

  return { response: keyPair1.data };
}

async function signAndSendTransaction({
  fromAddress, toAddress, value, privateKeyWIF,
}) {
  const keys = bitcoin.ECPair.fromWIF(privateKeyWIF, bitcoin.networks.testnet);

  const data = { inputs: [ { addresses: [ fromAddress ] } ], outputs: [ { addresses: [ toAddress ], value } ] };

  const { error, response } = await postRequest({ url: 'http://api.blockcypher.com/v1/btc/test3/txs/new', data: JSON.stringify(data) });

  if (error) {
    return { error: 'Insufficient funds.' };
  }

  const tmptx = response.data;

  tmptx.pubkeys = [];

  tmptx.signatures = tmptx.tosign.map((tosign, n) => {
    tmptx.pubkeys.push(keys.publicKey.toString('hex'));
    const signature = keys.sign(Buffer.from(tosign, 'hex'));

    const encodedSignature = bitcoin.script.signature.encode(signature, bitcoin.Transaction.SIGHASH_ALL);
    const hexStr = encodedSignature.toString('hex').slice(0, -2);

    return hexStr;
  });

  const { error: err, response: resp } = await postRequest({ url: 'https://api.blockcypher.com/v1/btc/test3/txs/send', data: JSON.stringify(tmptx) });

  if (err) {
    return { error: 'Incorrect private Key.' };
  }

  console.log('Transaction Hash : ', resp.data.tx.hash);

  return { response: resp.data.tx.hash };
}

module.exports = { signAndSendTransaction, generateTestAccounts };
