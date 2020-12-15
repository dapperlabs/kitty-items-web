import {useEffect} from "react"
import {atomFamily, useRecoilState} from "recoil"

export const itemAtom = atomFamily({
  key: "ITEM",
  default: { image: null },
})

const getKittyItem = (address, ACCOUNT, itemId) => {
  return { image: "/items/hat01.svg" }
}

export function useKittyItem(address, ACCOUNT, itemId) {
  const [item, setItem] = useRecoilState(itemAtom(itemId))
  useEffect(() => setItem(getKittyItem(address, ACCOUNT, itemId)), [setItem])
  return [item]
}