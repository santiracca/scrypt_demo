/* eslint-disable @typescript-eslint/no-unused-vars */
import { SmartContract, method, prop, assert } from 'scrypt-ts'

class Equations extends SmartContract {
    @prop()
    sum: bigint

    @prop()
    diff: bigint

    constructor(sum: bigint, diff: bigint) {
        super(...arguments)
        this.sum = sum
        this.diff = diff
    }

    @method()
    public unlock(x: bigint, y: bigint) {
        assert(x + y === this.sum, 'sum is not correct')
        assert(x - y === this.diff, 'diff is not correct')
    }
}
