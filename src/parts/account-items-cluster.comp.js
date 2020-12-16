import {Suspense} from "react"
import {Bar, Label, Button} from "../display/bar.comp"
import {Loading} from "../parts/loading.comp"
import {useAccountItems} from "../hooks/use-account-items.hook"
import {IDLE} from "../global/constants"
import Item from "./account-item-cluster.comp"

export function AccountItemsCluster({address}) {
  const items = useAccountItems(address)

  if (address == null) return null

  return (
    <div>
      <Bar>
        <Label good={items.ids.length > 0} bad={items.ids.length <= 0}>
          {items.ids.length}
        </Label>
        <Label strong>Items for {address}</Label>
        <Button disabled={items.status !== IDLE} onClick={items.refresh}>
          Refresh
        </Button>
        {items.status !== IDLE && <Loading label={items.status} />}
      </Bar>
      {items.ids.length > 0 && (
        <ul>
          {items.ids.map(id => (
            <Item key={id} id={id} address={address} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default function WrappedAccountItemsCluster({address}) {
  return (
    <Suspense
      fallback={
        <Bar>
          <Loading label="Fetching Items" />
        </Bar>
      }
    >
      <AccountItemsCluster address={address} />
    </Suspense>
  )
}
