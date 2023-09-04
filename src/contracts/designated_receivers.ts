/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ByteString,
    PubKeyHash,
    SmartContract,
    Utils,
    assert,
    hash256,
    method,
    prop,
} from 'scrypt-ts'

class DesignatedReceivers extends SmartContract {
    @prop()
    readonly alice: PubKeyHash

    @prop()
    readonly bob: PubKeyHash

    constructor(alice: PubKeyHash, bob: PubKeyHash) {
        super(...arguments)
        this.alice = alice
        this.bob = bob
    }

    @method()
    public payout() {
        const aliceOutput: ByteString = Utils.buildPublicKeyHashOutput(
            this.alice,
            1000n
        )
        const bobOutput: ByteString = Utils.buildPublicKeyHashOutput(
            this.bob,
            1000n
        )
        let outputs = aliceOutput + bobOutput
        outputs += this.buildChangeOutput()
        assert(this.ctx.hashOutputs == hash256(outputs), 'hashOutputs mismatch')
    }
}
