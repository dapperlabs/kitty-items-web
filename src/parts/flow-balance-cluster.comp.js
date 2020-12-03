import {Suspense} from "react"
import {useFlowBalance} from "../hooks/use-flow-balance.hook"
import {Bar, Label, Button} from "../display/bar.comp"
import {IDLE, PROCESSING} from "../global/constants"
import {Loading} from "../parts/loading.comp"
import {fmtFlow} from "../util/fmt-flow"

export function FlowBalanceCluster({address}) {
  const [balance, status, tools] = useFlowBalance(address)
  if (address == null) return null

  return (
    <Bar>
      <Label>Flow Balance:</Label>
      <Label strong good={balance > 0} bad={balance <= 0}>
        {fmtFlow(balance)}
      </Label>
      <Button disabled={status !== IDLE} onClick={tools.refresh}>
        {status === PROCESSING ? (
          <Loading seq={["•*• *•*", "*•* •*•"]} tick={500} />
        ) : (
          "Refresh"
        )}
      </Button>
    </Bar>
  )
}

export default function WrappedFlowBalanceCluster({address}) {
  return (
    <Suspense
      fallback={
        <Bar>
          <Loading label="Fetching Flow Balance" />
        </Bar>
      }
    >
      <FlowBalanceCluster address={address} />
    </Suspense>
  )
}
