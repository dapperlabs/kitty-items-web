import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import {Switch, Route} from "react-router-dom"

import {Providers} from "./global/providers.comp"
import {Config} from "./global/config.comp"
import {Styles} from "./global/styles.comp"

import {Page as DangerousFood} from "./pages/wip/dangerousfood.page"
import {Page as Qvvg} from "./pages/wip/qvvg.page"
import {Page as Root} from "./pages/root.page"
import {Page as NotFound} from "./pages/not-found.page"

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

window.fcl = fcl
window.t = t

ReactDOM.render(
  <Providers>
    <Config />
    <Styles />
    <Switch>
      <Route exact path="/wip/dangerousfood" component={DangerousFood} />
      <Route exact path="/wip/qvvg" component={Qvvg} />
      <Route exact path="/" component={Root} />
      <Route component={NotFound} />
    </Switch>
  </Providers>,
  document.getElementById("root")
)

reportWebVitals()
