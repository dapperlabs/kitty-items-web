import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"

const CODE = cdc`
  import NonFungibleToken from 0xNonFungibleToken
  import KittyItems from 0xKittyItems

  pub fun main(address: Address): [UInt64] {
    let cap = getAccount(address)
      .getCapability<&{NonFungibleToken.CollectionPublic}>(/public/KittyItemsCollection)!

    if let collection = cap.borrow() {
      return collection.getIDs()
    }

    return []
  }
`

export function fetchAccountItems(address) {
  if (address == null) return Promise.resolve([])

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address)
    ]),
  ]).then(decode)
}
