import { Client } from 'dash'
import { config, user } from '@dash-incubator/dapp-sdk'
//getDashAccount // creates wallet and returns confirmed/total balance // https://dashplatform.readme.io/docs/tutorial-create-and-fund-a-wallet //
export const getDashAccount = async (mnemonic) => {
  const client = new Client({
    network: 'testnet',
    wallet: {
      mnemonic,
      offlineMode: !mnemonic ? true : false,
    },
  })
  await user.wallet.read()
}
//used to register identity
export const registerIdentity = async (mnemonic) => {
  const client = new Client({
    network: 'testnet',
    wallet: {
      mnemonic,
      unsafeOptions: {
        skipSynchronizationBeforeHeight: 639373, // only sync from mid-2021
      },
    },
  })
  const account = await client.getWalletAccount()
  const identities = account.identities.getIdentityIds()
  let identity = (identities || [null])[0]
  if (!identity) {
    identity = await client.platform.identities
      .register()
      .then((d) => d.toJSON())
    identity = (identity || {}).id
  }
  return identity
}
