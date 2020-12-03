import {atomFamily, selectorFamily, useRecoilState} from "recoil"
import {IDLE, PROCESSING, SUCCESS, ERROR, IDLE_DELAY} from "../global/constants"
import {isAccountInitialized} from "../flow/is-account-initialized.script"
import {initializeAccount} from "../flow/initialize-account.tx"
import {sleep} from "../util/sleep"
import {useFlowBalance} from "./use-flow-balance.hook"
import {useKibblesBalance} from "./use-kibbles-balance.hook"

export const initializedAtom = atomFamily({
  key: "initialized::state",
  default: selectorFamily({
    key: "initialized::default",
    get: address => async () => isAccountInitialized(address),
  }),
})

export const statusAtom = atomFamily({
  key: "initialized::status",
  default: IDLE,
})

export function useInitialized(address) {
  const [, , flowTools] = useFlowBalance(address)
  const [, , kibblesTools] = useKibblesBalance(address)
  const [init, setInit] = useRecoilState(initializedAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  const tools = {
    recheck: async () => {
      await isAccountInitialized(address).then(setInit)
    },
    init: async () => {
      initializeAccount(address, {
        onStart: () => setStatus(PROCESSING),
        onSuccess: async () => {
          await tools.recheck()
          flowTools.refresh()
          kibblesTools.refresh()
          setStatus(SUCCESS)
        },
        onError: () => setStatus(ERROR),
        onComplete: async () => {
          await sleep(IDLE_DELAY)
          setStatus(IDLE)
        },
      })
    },
  }

  return [init, status, tools]
}
