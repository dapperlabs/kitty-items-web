import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
  import FungibleToken from 0xFungibleToken

  pub fun main(address: Address): UFix64? {
    let cap = getAccount(address)
      .getCapability<&{FungibleToken.Balance}>(/public/KibbleBalance)!

    if let vault = cap.borrow() {
      return vault.balance
    }

    return nil
  }
`

export function fetchKibblesBalance(address) {
  if (address == null) return Promise.resolve(false)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
