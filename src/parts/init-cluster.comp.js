import {useInitialized} from "../hooks/use-initialized.hook"
import {IDLE, PROCESSING} from "../global/constants"
import {Button, Bar, Label} from "../display/bar.comp"
import {Loading} from "../parts/loading.comp"

export function InitCluster({address}) {
  const [isInit, status, tools] = useInitialized(address)

  if (address == null) return null

  if (isInit == null)
    return (
      <Bar>
        <Label>Initialized?:</Label>
        <Loading label="Checking" />
      </Bar>
    )

  if (isInit)
    return (
      <Bar>
        <Label>Initialized?:</Label>
        <Label strong good>
          Account Ready
        </Label>
      </Bar>
    )

  return (
    <Bar>
      <Label>Initialized?:</Label>
      <Label strong bad>
        Not Initialized
      </Label>
      <Button disabled={status !== IDLE} onClick={tools.init}>
        {status !== PROCESSING ? (
          "Initialize Account!"
        ) : (
          <Loading
            tick={500}
            seq={["•*• •*• •*• •*• •*•", "*•* *•* *•* *•* *•*"]}
          />
        )}
      </Button>
      {status === IDLE ? (
        <Label muted small>
          (Transaction Requires 0.001 FLOW)
        </Label>
      ) : (
        <Label strong good={status === "SUCCESS"} bad={status === "ERROR"}>
          {status}
        </Label>
      )}
    </Bar>
  )
}
