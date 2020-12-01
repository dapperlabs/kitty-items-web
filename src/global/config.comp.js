import {useEffect} from "react"
import {config} from "@onflow/fcl"

export function Config() {
  useEffect(() => {
    // prettier-ignore
    config()
      .put("accessNode.api", "https://access-testnet.onflow.org")
      .put("challenge.handshake", "https://fcl-discovery.vercel.app/testnet/authn")
  }, [])
  return null
}
