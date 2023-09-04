import { bsv } from 'scrypt-ts'

// GENERATE PRIVATE KEY
const privKey = bsv.PrivateKey.fromRandom(bsv.Networks.testnet)
// GENERATE PUBLIC KEY
const pubKey = privKey.toPublicKey()
// GENERATE ADDRESS
console.log(privKey.toAddress())

console.log(pubKey.toAddress())

// HASH FUNCTIONS
const hashString = bsv.crypto.Hash.sha256(
    Buffer.from('this is the data I want to hash')
).toString('hex')
console.log(hashString)
// f88eec7ecabf88f9a64c4100cac1e0c0c4581100492137d1b656ea626cad63e3

let tx = new bsv.Transaction()

tx.from({
    txId: 'f50b8c6dedea6a4371d17040a9e8d2ea73d369177737fb9f47177fbda7d4d387',
    outputIndex: 0,
    script: bsv.Script.fromASM(
        'OP_DUP OP_HASH160 fde69facc20be6eee5ebf5f0ae96444106a0053f OP_EQUALVERIFY OP_CHECKSIG'
    ).toHex(),
    satoshis: 99904,
})

tx.addOutput(
    new bsv.Transaction.Output({
        script: bsv.Script.buildPublicKeyHashOut(
            'mxXPxaRvFE3178Cr6KK7nrQ76gxjvBQ4UQ'
        ),
        satoshis: 99804,
    })
)

tx.change('n4fTXc2kaKXHyaxmuH5FTKiJ8Tr4fCPHFy')
tx.feePerKb(50)
tx = tx.seal().sign('cNSb8V7pRt6r5HrPTETq2Li2EWYEjA7EcQ1E8V2aGdd6UzN9EuMw')
console.log(tx.serialize())
