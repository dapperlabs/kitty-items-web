import {atomFamily, selectorFamily, useRecoilState} from "recoil"
import {fetchAccountItem} from "../flow/fetch-account-item.script"
import {IDLE, PROCESSING} from "../global/constants"

function expand(key) {
  return key.split("|")
}

function comp(address, id) {
  return [address, id].join("|")
}

export const $state = atomFamily({
  key: "account-item::state",
  default: selectorFamily({
    key: "account-item::default",
    get: key => async () => fetchAccountItem(...expand(key)),
  }),
})

export const $status = atomFamily({
  key: "account-item::status",
  default: IDLE,
})

export function useAccountItem(address, id) {
  const key = comp(address, id)
  const [item, setItem] = useRecoilState($state(key))
  const [status, setStatus] = useRecoilState($status(key))

  return {
    ...item,
    status,
    async refresh() {
      setStatus(PROCESSING)
      await fetchAccountItem(...expand(key)).then(setItem)
      setStatus(IDLE)
    },
  }
}
