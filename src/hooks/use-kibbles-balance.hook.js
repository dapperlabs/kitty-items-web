import {atomFamily, selectorFamily, useRecoilState} from "recoil"
import {fetchKibblesBalance} from "../flow/fetch-kibbles-balance.script"
import {mintKibbles} from "../flow/mint-kibbles.tx"
import {IDLE, PROCESSING, SUCCESS, ERROR, IDLE_DELAY} from "../global/constants"
import {sleep} from "../util/sleep"
import {useFlowBalance} from "./use-flow-balance.hook"

export const valueAtom = atomFamily({
  key: "kibbles-balance::state",
  default: selectorFamily({
    key: "kibbles-balance::default",
    get: address => async () => fetchKibblesBalance(address),
  }),
})

export const statusAtom = atomFamily({
  key: "kibbles-balance::status",
  default: IDLE,
})

export function useKibblesBalance(address) {
  const flow = useFlowBalance(address)
  const [balance, setBalance] = useRecoilState(valueAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))

  async function refresh() {
    setStatus(PROCESSING)
    await fetchKibblesBalance(address).then(setBalance)
    setStatus(IDLE)
  }

  return {
    balance,
    status,
    refresh,
    /* async mint() {
      mintKibbles(address, {
        onStart() {
          setStatus(PROCESSING)
        },
        onSuccess() {
          fetchKibblesBalance(address).then(setBalance)
          flow.refresh()
          setStatus(SUCCESS)
        },
        onError() {
          setStatus(ERROR)
        },
        async onComplete() {
          await sleep(IDLE_DELAY)
          setStatus(IDLE)
        },
      })
    }, */
  }
}
