import { Client } from 'dash'
//getDashAccount // creates wallet and returns confirmed/total balance // https://dashplatform.readme.io/docs/tutorial-create-and-fund-a-wallet //
export const getDashAccount = async (mnemonic) => {
  const client = new Client({
    network: 'testnet',
    wallet: {
      mnemonic,
      offlineMode: !mnemonic ? true : false,
    },
  })
  const account = await client.getWalletAccount()
  return {
    address: account.getUnusedAddress().address,
    balance: {
      confirmed: account.getConfirmedBalance(),
      total: account.getTotalBalance(),
    },
    mnemonic: client.wallet.exportWallet(),
  }
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
