import {useEffect} from "react"
import {atom, useRecoilState} from "recoil"
import * as fcl from "@onflow/fcl"
import {IDLE, PROCESSING, SUCCESS, ERROR, IDLE_DELAY} from "../global/constants"
import {useConfig} from "./use-config.hook"
import {isAccountInitialized} from "../flow/is-account-initialized.script"
import {initializeAccount} from "../flow/initialize-account.tx"
import {memo} from "../util/memo"
import {sleep} from "../util/sleep"

export const initializedAtom = memo(address =>
  atom({
    key: "initialized::" + address + "::state",
    default: null,
  })
)

export const statusAtom = memo(address =>
  atom({
    key: "initialized::" + address + "::status",
    default: IDLE,
  })
)

export function useInitialized(address) {
  const [init, setInit] = useRecoilState(initializedAtom(address))
  const [status, setStatus] = useRecoilState(statusAtom(address))
  const env = useConfig("env")

  const tools = {
    recheck: async () => {
      await isAccountInitialized(address).then(setInit)
    },
    init: async () => {
      try {
        setStatus(PROCESSING)
        var txId = await initializeAccount(address)
        console.info(
          `%cTX[${txId}]: ${fvsTx(env, txId)}`,
          "color:purple;font-weight:bold;font-family:monospace;"
        )
        var txStatus = await fcl.tx(txId).onceSealed()
        await tools.recheck()
        console.info(
          `%cTX[${txId}]: ${fvsTx(env, txId)}`,
          "color:green;font-weight:bold;font-family:monospace;"
        )
        setStatus(SUCCESS)
        return txStatus
      } catch (error) {
        console.error(`TX[${txId}]: ${fvsTx(env, txId)}`, error)
        setStatus(ERROR)
      } finally {
        await sleep(IDLE_DELAY)
        setStatus(IDLE)
      }
    },
  }

  useEffect(() => {
    isAccountInitialized(address).then(setInit)
  }, [setInit, address])

  return [init, status, tools]
}

function fvsTx(env, txId) {
  return `https://flow-view-source.com/${env}/tx/${txId}`
}
