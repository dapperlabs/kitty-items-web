import {useEffect, useState} from "react"
import {atom, useRecoilState} from "recoil"
import * as fcl from "@onflow/fcl"
import {useConfig} from "./use-config.hook"
import {isAccountInitialized} from "../flow/is-account-initialized.script"
import {initializeAccount} from "../flow/initialize-account.tx"

const IDLE_DELAY = 2500

export const IDLE = "IDLE"
export const PROCESSING = "PROCESSING"
export const SUCCESS = "SUCCESS"
export const ERROR = "ERROR"

const memo = {}

export const key = address => {
  if (address == null) return "INITIALIZED[UNDEFINED]"
  return `INITIALIZED[${address}]`
}

export const initialized = address => {
  if (memo[address]) return memo[address]

  memo[address] = atom({
    key: key(address),
    default: null,
  })

  return memo[address]
}

export function useInitialized(address) {
  const [init, setInit] = useRecoilState(initialized(address))
  const [status, setStatus] = useState(IDLE)
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
        var txStatus = await fcl.tx(txId).onceExecuted()
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
        await new Promise(r => setTimeout(r, IDLE_DELAY))
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
