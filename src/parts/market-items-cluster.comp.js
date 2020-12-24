import {Suspense} from "react"
import {Bar, Label, Button} from "../display/bar.comp"
import {Loading} from "../parts/loading.comp"
import {useMarketItems} from "../hooks/use-market-items.hook"
import {IDLE} from "../global/constants"

export function MarketItemsCluster({address}) {
  const items = useMarketItems(address)

  if (address == null) return null

  return (
    <div>
      <Bar>
        <Label good={items.ids.length > 0} bad={items.ids.length <= 0}>
          {items.ids.length}
        </Label>
        <Label strong>Market Items for {address}</Label>
        <Button disabled={items.status !== IDLE} onClick={items.refresh}>
          Refresh
        </Button>
        {items.status !== IDLE && <Loading label={items.status} />}
      </Bar>
      {items.ids.length > 0 && (
        <ul>
          {items.ids.map(id => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function WrappedMarketItemsCluster({address}) {
  return (
    <Suspense
      fallback={
        <Bar>
          <Loading label="Fetching Items" />
        </Bar>
      }
    >
      <MarketItemsCluster address={address} />
    </Suspense>
  )
}
