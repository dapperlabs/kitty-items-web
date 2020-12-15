import {useEffect} from "react"
import {atomFamily, useRecoilState} from "recoil"

var kitties = {}

export const kittyAtom = atomFamily({
  key: "KITTY",
  default: { image: null, items: [] },
})

const getKitty = (address, ACCOUNT, itemId) => {
  if(kitties.itemId == null) kitties.itemId = { image: "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/1673366.svg", items: [] }
  return kitties.itemId
}

export function useKitty(address, ACCOUNT, kittyId) {
  const [kitty, setKitty] = useRecoilState(kittyAtom(kittyId))
  useEffect(() => setKitty(getKitty(address, ACCOUNT, kittyId)), [setKitty])
  return [kitty, setKitty]
}