import React from "react"
import { observer } from "mobx-react"
import { Route, RouteComponentProps, Switch } from "react-router-dom"

import "styles/main"
import "styles/uni"

import Editor from "views/Editor"
import Playground from "views/__Playground"

export interface AppProps
extends RouteComponentProps {

}

export interface AppState {

}

@observer
export default
class App
extends React.Component<AppProps, AppState> {
	render() {
		return <>
			<Switch>
				<Route
					path="/"
					exact
					component={Editor}
				/>
				<Route
					path="/__playground"
					exact
					component={Playground}
				/>
			</Switch>
		</>
	}
}