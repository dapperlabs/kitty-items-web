import {Suspense} from "react"
import {Loading} from "../parts/loading.comp"
import {useAccountItem} from "../hooks/use-account-item.hook"
import {Bar, Label, Button} from "../display/bar.comp"
import {IDLE} from "../global/constants"

export function AccountItemCluster({address, id}) {
  const item = useAccountItem(address, id)
  if (address == null) return null
  if (id == null) return null

  return (
    <li>
      <Bar>
        <Label strong bad={item.forSale}>
          Id:
        </Label>
        <Label good={!item.forSale} bad={item.forSale}>
          {item.id}
        </Label>
        <Label strong bad={item.forSale}>
          Type:{" "}
        </Label>
        <Label good={!item.forSale} bad={item.forSale}>
          {item.type}
        </Label>
        <Button disabled={item.status !== IDLE} onClick={item.refresh}>
          Refetch
        </Button>
        {item.forSale || (
          <Button onClick={() => item.sell("10.0")}>
            Put on market for 10.0 Kibble
          </Button>
        )}
        {item.status !== IDLE && <Loading label={item.status} />}
      </Bar>
    </li>
  )
}

export default function WrappedAccountItemCluster(props) {
  return (
    <Suspense fallback={<Loading label="Fetching Item" />}>
      <AccountItemCluster {...props} />
    </Suspense>
  )
}
