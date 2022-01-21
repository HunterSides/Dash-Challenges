import { config, user } from '@dash-incubator/dapp-sdk'

import { alert, state } from '../../ui/components'
import { dom, emitter } from '../../ui/lib'

let initialized = false

export const init = async () => {
  if (initialized) {
    return
  }

  await user.init()

  let loading = dom.ref('anchor.loading'),
    wallet = await user.wallet.read()

  if (wallet.balance.confirmed > 0) {
    console.log(
      'tDash found, all relevant contract information cached, welcome to the demo!'
    )
    alert.deactivate.error()
    alert.success(
      'tDash found, all relevant contract information cached, welcome to the demo!',
      8
    )

    if (loading) {
      state.deactivate(loading.element)
    }

    emitter.dispatch('user.init')
  } else {
    alert.error(`Deposit tDash in <b>${wallet.address}</b> to continue`)

    setTimeout(init, 1000 * 45)

    initialized = true
  }
}

emitter.once('components.mounted', init)