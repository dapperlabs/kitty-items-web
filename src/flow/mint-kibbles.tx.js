// prettier-ignore
import {transaction, limit, proposer, payer, authorizations, authz, cdc} from "@onflow/fcl"
import {invariant} from "@onflow/util-invariant"
import {tx} from "./util/tx"

const CODE = cdc`
  import DietKibbles from 0xDietKibbles
  import FungibleToken from 0xFungibleToken

  transaction {
    prepare(to: AuthAccount) {
      getAccount(to.address)
        .getCapability<&{FungibleToken.Receiver}>(DietKibbles.publicPath)!
        .borrow()!
        .deposit(from: <- DietKibbles.mintTenDietKibbles())
    }
  }
`

export async function mintKibbles(address, opts = {}) {
  // prettier-ignore
  invariant(address != null, "Need an account to send the minted kibbles to...")

  return tx(
    [
      transaction(CODE),
      limit(25),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
    ],
    opts
  )
}
