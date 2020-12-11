import {useEffect} from "react"
import {atom, useRecoilState} from "recoil"
import * as fcl from "@onflow/fcl"
import { ToastBody } from "react-bootstrap"

export const item = atom({
  key: "ITEM",
  default: {image: null, highlighted: null, type: null},
})

const tools = {
  logIn: fcl.logIn,
  logOut: fcl.unauthenticate,
  signUp: fcl.signUp,
  changeUser: fcl.reauthenticate,
}
// in-progress
export function useKittyItem() {
  const [item, setItem] = useRecoilState(item)
  useEffect(() => todo(), [item])
  return [item]
}