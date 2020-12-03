import {Suspense} from "react"
import {useInitialized} from "../hooks/use-initialized.hook"
import {useKibblesBalance} from "../hooks/use-kibbles-balance.hook"
import {Bar, Label, Button} from "../display/bar.comp"
import {IDLE, PROCESSING} from "../global/constants"
import {Loading} from "../parts/loading.comp"
import {fmtKibbles} from "../util/fmt-kibbles"

export function KibblesBalanceCluster({address}) {
  const [isInit] = useInitialized(address)
  const [balance, status, tools] = useKibblesBalance(address)
  if (address == null || !isInit) return null

  return (
    <Bar>
      <Label>Kibbles Balance:</Label>
      <Label strong good={balance > 0} bad={balance <= 0}>
        {fmtKibbles(balance)}
      </Label>
      <Button disabled={status !== IDLE} onClick={tools.refresh}>
        {status === PROCESSING ? (
          <Loading seq={["•*• *•*", "*•* •*•"]} tick={500} />
        ) : (
          "Refresh"
        )}
      </Button>
      <Button disabled={status !== IDLE} onClick={tools.mint}>
        {status === PROCESSING ? (
          <Loading seq={["•*• *•* •*•", "*•* •*• *•*"]} tick={500} />
        ) : (
          "Mint Kibble"
        )}
      </Button>
    </Bar>
  )
}

export default function WrappedKibblesBalanceCluster({address}) {
  return (
    <Suspense
      fallback={
        <Bar>
          <Loading label="Fetching Kibbles Balance" />
        </Bar>
      }
    >
      <KibblesBalanceCluster address={address} />
    </Suspense>
  )
}
