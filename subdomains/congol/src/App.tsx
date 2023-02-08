import Canvas from "components/Canvas"
import React from "react"
import { Congol } from "stores/Congol"
import Drawer from "stores/Drawer"

export interface AppProps {

}

export interface AppState {

}

export default
class App
extends React.Component<AppProps, AppState> {
	congol
		: Congol

	componentDidMount() {
		this.congol = new Congol(Drawer.draw)
		this.congol.clear()

		document.addEventListener("click", this.congol.start)
	}

	render() {
		return <>
			<Canvas
				onMount={Drawer.init}
				onResize={Drawer.resize}
			/>
		</>
	}
}