import React from "react"
import { createRoot } from "react-dom/client"
import { Router } from "react-router-dom"
import { createBrowserHistory } from "history"
import Provider from "Provider"

const root = createRoot(document.getElementById("__root")!)

const history = createBrowserHistory({})

root.render(
	<Router history={history}>
		<Provider />
	</Router>
)