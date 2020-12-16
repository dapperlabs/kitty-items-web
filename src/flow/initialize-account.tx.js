// prettier-ignore
import {transaction, limit, proposer, payer, authorizations, authz, cdc} from "@onflow/fcl"
import {invariant} from "@onflow/util-invariant"
import {tx} from "./util/tx"

const CODE = cdc`
  import FungibleToken from 0xFungibleToken
  import NonFungibleToken from 0xNonFungibleToken
  import Kibble from 0xKibble
  import KittyItems from 0xKittyItems
  import KittyItemsMarket from 0xKittyItemsMarket

  transaction {
    prepare(acct: AuthAccount) {
      // Kibble
      if acct.borrow<&Kibble.Vault>(from: /storage/KibbleVault) == nil {
        let privatePath = /storage/KibbleVault
        let receiverPath = /public/KibbleReceiver
        let balancePath = /public/KibbleBalance

        acct.save(<-Kibble.createEmptyVault(), to: privatePath)
        acct.link<&Kibble.Vault{FungibleToken.Receiver}>(receiverPath, target: privatePath)
        acct.link<&Kibble.Vault{FungibleToken.Balance}>(balancePath, target: privatePath)
      }

      // KittyItems
      if acct.borrow<&KittyItems.Collection>(from: /storage/KittyItemsCollection) == nil {
        let privatePath = /storage/KittyItemsCollection
        let providerPath = /private/KittyItemsCollectionProvider
        let collectionPath = /public/KittyItemsCollection

        acct.save(<-KittyItems.createEmptyCollection(), to: privatePath)
        acct.link<&KittyItems.Collection{NonFungibleToken.Provider}>(providerPath, target: privatePath)
        acct.link<&KittyItems.Collection{NonFungibleToken.CollectionPublic}>(collectionPath, target: privatePath)
      }

      // KittyItemsMarket
      if acct.borrow<&KittyItemsMarket.Collection>(from: /storage/KittyItemsMarketCollection) == nil {
        let privatePath = /storage/KittyItemsMarketCollection
        let collectionPath = /public/KittyItemsMarketCollection

        acct.save(<-KittyItemsMarket.createEmptyCollection(), to: privatePath)
        acct.link<&KittyItemsMarket.Collection{KittyItemsMarket.CollectionPublic}>(collectionPath, target: privatePath)
      }
    }
  }
`

export async function initializeAccount(address, opts = {}) {
  // prettier-ignore
  invariant(address != null, "Tried to initialize an account but no address was supplied")

  return tx(
    [
      transaction(CODE),
      limit(45),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
    ],
    opts
  )
}
