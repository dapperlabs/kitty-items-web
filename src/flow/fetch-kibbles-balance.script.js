import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
  import DietKibbles from 0xDietKibbles

  pub fun main(address: Address): UFix64? {
    return DietKibbles.fetchBalance(address)
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
