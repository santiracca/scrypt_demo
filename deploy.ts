import { HelloWorld } from './src/contracts/hello_world'
import { getDefaultSigner } from './tests/utils/txHelper'
import { toByteString, sha256 } from 'scrypt-ts'
;(async () => {
    const message = toByteString('hello world', true)
    await HelloWorld.compile()
    const instance = new HelloWorld(sha256(message))
    await instance.connect(getDefaultSigner())

    const deployTx = await instance.deploy(42)
    console.log('HelloWorld contract deployed: ', deployTx.id)

    const { tx: callTx } = await instance.methods.unlock(message)
    console.log('HelloWorld contract unlocked: ', callTx.id)
})()
