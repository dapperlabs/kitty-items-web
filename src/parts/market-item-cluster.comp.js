import {Suspense} from "react"
import {Loading} from "../parts/loading.comp"
import {useMarketItem} from "../hooks/use-market-item.hook"
import {useAccountItem} from "../hooks/use-account-item.hook"
import {Bar, Label, Button} from "../display/bar.comp"
import {IDLE} from "../global/constants"

export function MarketItemCluster({address, id}) {
  const item = useAccountItem(address, id)
  const list = useMarketItem(address, id)

  const BUSY = item.status !== IDLE || list.status !== IDLE

  if (address == null) return null
  if (id == null) return null

  return (
    <li>
      <Bar>
        <Button disabled={BUSY} onClick={list.buy}>
          Buy
        </Button>
        <Button disabled={BUSY} onClick={list.cancelListing}>
          Remove
        </Button>
        <Label strong>Id:</Label>
        <Label>{item.id}</Label>
        <Label strong>Type:</Label>
        <Label>{item.type}</Label>
        <Label strong>Price:</Label>
        <Label>{list.price}</Label>
        {BUSY && <Loading label="PROCESSING" />}
      </Bar>
    </li>
  )
}

export default function WrappedMarketItemCluster(props) {
  return (
    <Suspense fallback={<Loading label="Fetching Listing" />}>
      <MarketItemCluster {...props} />
    </Suspense>
  )
}
