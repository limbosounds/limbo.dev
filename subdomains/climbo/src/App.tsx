import React from "react"
import { observer } from "mobx-react"
import { RouteComponentProps } from "react-router-dom"

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
			<h1>Hello, app</h1>
		</>
	}
}