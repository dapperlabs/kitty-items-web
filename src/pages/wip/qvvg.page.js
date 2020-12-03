import {Base} from "../../parts/base.comp"
import {Stack} from "../../display/stack.comp"
import {AuthCluster} from "../../parts/auth-cluster.comp"
import {useCurrentUser} from "../../hooks/use-current-user.hook"
import InitCluster from "../../parts/init-cluster.comp"
import FlowBalanceCluster from "../../parts/flow-balance-cluster.comp"
import KibblesBalanceCluster from "../../parts/kibbles-balance-cluster.comp"

export function Page() {
  const [user] = useCurrentUser()
  return (
    <Base>
      <Stack>
        <AuthCluster />
        <FlowBalanceCluster address={user.addr} />
        <KibblesBalanceCluster address={user.addr} />
        <InitCluster address={user.addr} />
      </Stack>
    </Base>
  )
}
