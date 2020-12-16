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
        <Label strong>Id:</Label>
        <Label good>{item.id}</Label>
        <Label strong>Type: </Label>
        <Label good>{item.type}</Label>
        <Button disabled={item.status !== IDLE} onClick={item.refresh}>
          Refetch
        </Button>
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
