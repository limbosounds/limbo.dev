import React from "react"
import { observer } from "mobx-react"
import { Switch, Route } from "react-router-dom"
import { Helmet } from "react-helmet"

import App from "App"

export interface ProviderProps {

}

export interface ProviderState {

}

@observer
export default
class Provider
extends React.Component<ProviderProps, ProviderState> {
	render() {
		return <>
			<Helmet>
				<link 
					rel="stylesheet" 
					href="/static/shared/font-awesome/style.css"
				/>
				{/* <link
					rel="icon"
					type="image/png"
					href="/static/images/logos/favicon.png"
				/> */}
			</Helmet>
			<Switch>
				<Route
					path="/"
					component={App}
				/>
			</Switch>
		</>
	}
}