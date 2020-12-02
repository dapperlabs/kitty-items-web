import {useEffect} from "react"
import {config} from "@onflow/fcl"

export function Config() {
  useEffect(() => {
    // prettier-ignore
    config()
      .put("env", "testnet")
      .put("accessNode.api", "https://access-testnet.onflow.org")
      .put("challenge.handshake", "https://fcl-discovery.vercel.app/testnet/authn")
      .put("0xFungibleToken", "0x9a0766d93b6608b7")
      .put("0xDietKibbles", "0x06f65a4f32bba850")
  }, [])
  return null
}
