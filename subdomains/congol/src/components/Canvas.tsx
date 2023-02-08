import React from "react"

export interface CanvasProps {
	onMount?: (
		element: HTMLCanvasElement
	) => void
	onResize?: (
		element: HTMLCanvasElement
	) => void
}

export interface CanvasState {

}

export default
class Canvas
extends React.Component<CanvasProps, CanvasState> {
	private element
		: HTMLCanvasElement | null

	private setSize = (
		event?: Event
	) => {
		if (!this.element)
			return

		this.element.width = window.innerWidth
		this.element.height = window.innerHeight

		if (typeof event != "undefined")
			this.props.onResize?.(this.element)
	}

	componentDidMount() {
		if (!this.element)
			return

		this.setSize()
		this.props.onMount?.(this.element)

		window.addEventListener("resize", this.setSize)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.setSize)
	}

	render() {
		return <>
			<canvas
				ref={r => this.element = r}
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					width: "100%",
					height: "100%",
				}}
			/>
		</>
	}
}