import React from "react"
import {RecoilRoot} from "recoil"
import {HashRouter as Router} from "react-router-dom"

export function Providers({children}) {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <Router>{children}</Router>
      </RecoilRoot>
    </React.StrictMode>
  )
}
