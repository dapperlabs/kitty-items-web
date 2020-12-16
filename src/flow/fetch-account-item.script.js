import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address, UInt64} from "@onflow/types"

const CODE = cdc`
  import NonFungibleToken from 0xNonFungibleToken
  import KittyItems from 0xKittyItems
  
  pub struct Item {
    pub let id: UInt64
    pub let type: UInt64

    init(id: UInt64, type: UInt64) {
      self.id = id
      self.type = type
    }
  }

  pub fun main(address: Address, id: UInt64): Item? {
    let cap = getAccount(address)
      .getCapability<&{NonFungibleToken.CollectionPublic}>(/public/KittyItemsCollection)!

    return Item(id: id, type: 0)

    // Waiting on future contract deployment
    // if let collection = cap.borrow() {
    //   if let item = collection.borrowKittyItem(id: id) {
    //     return Item(owner: collection?.owner?.address, id: id, type: item.typeID)
    //   } else {
    //     return nil
    //   }
    // } else {
    //   return nil
    // }
  }
`

export function fetchAccountItem(address, id) {
  if (address == null) return Promise.resolve(null)
  if (id == null) return Promise.resolve(null)

  // prettier-ignore
  return send([
    script(CODE),
    args([
      arg(address, Address),
      arg(Number(id), UInt64),
    ]),
  ]).then(decode)
}
