import {Suspense} from "react"
import {useInitialized} from "../hooks/use-initialized.hook"
import {IDLE, PROCESSING} from "../global/constants"
import {Button, Bar, Label} from "../display/bar.comp"
import {Loading} from "../parts/loading.comp"

const fmtBool = bool => (bool ? "Yes" : "No")

export function InitCluster({address}) {
  const init = useInitialized(address)
  if (address == null) return null

  return (
    <div>
      <Bar>
        <Label strong>Initialized</Label>
        {init.status === IDLE || <Loading label={init.status} />}
      </Bar>
      <ul>
        <li>Kibble: {fmtBool(init.Kibble)}</li>
        <li>KittyItems: {fmtBool(init.KittyItems)}</li>
        <li>KittyItemsMarket: {fmtBool(init.KittyItemsMarket)}</li>
      </ul>
      {!init.isInitialized && (
        <Bar>
          <Button disabled={init.status !== IDLE} onClick={init.initialize}>
            Initialize {address}
          </Button>
        </Bar>
      )}
    </div>
  )
}

export default function WrappedInitCluster({address}) {
  return (
    <Suspense
      fallback={
        <Bar>
          <Loading label="Checking if Account is Initialized..." />
        </Bar>
      }
    >
      <InitCluster address={address} />
    </Suspense>
  )
}
