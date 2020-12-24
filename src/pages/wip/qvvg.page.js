import {Base} from "../../parts/base.comp"
import {Stack} from "../../display/stack.comp"
import {AuthCluster} from "../../parts/auth-cluster.comp"
import {useCurrentUser} from "../../hooks/use-current-user.hook"
import InitCluster from "../../parts/init-cluster.comp"
import ContractsCluster from "../../parts/contracts-cluster.comp"
import FlowBalanceCluster from "../../parts/flow-balance-cluster.comp"
import KibblesBalanceCluster from "../../parts/kibbles-balance-cluster.comp"
import AccountItemsCluster from "../../parts/account-items-cluster.comp"
import MarketItemsCluster from "../../parts/market-items-cluster.comp"

export function Page() {
  const [user] = useCurrentUser()
  return (
    <Base>
      <Stack>
        <ContractsCluster />
        <AuthCluster />
        <FlowBalanceCluster address={user.addr} />
        <KibblesBalanceCluster address={user.addr} />
        <InitCluster address={user.addr} />
        <AccountItemsCluster address={user.addr} />
        <MarketItemsCluster address={user.addr} />
      </Stack>
    </Base>
  )
}
