import {useEffect} from "react"
import {config} from "@onflow/fcl"

const CONTRACTS = "0xfcceff21d9532b58"

export function Config() {
  useEffect(() => {
    // prettier-ignore
    config()
      .put("env", "testnet")
      .put("accessNode.api", "https://access-testnet.onflow.org")
      .put("challenge.handshake", "https://fcl-discovery.vercel.app/testnet/authn")
      .put("0xFungibleToken", "0x9a0766d93b6608b7")
      .put("0xNonFungibleToken", "0x631e88ae7f1d7c20")
      .put("0xKibble", CONTRACTS)
      .put("0xKittyItems", CONTRACTS)
      .put("0xKittyItemsMarket", CONTRACTS)
  }, [])
  return null
}
