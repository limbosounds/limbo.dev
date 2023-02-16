import React from "react"
import ReactDOM from "react-dom"
import { observer } from "mobx-react"

import "styles/views/editor/components/element-creator"

import { Coordinates2D } from "typings"
import { isEventFiredInsideElement } from "utils/dom"

export interface ElementCreatorProps {

}

export interface ElementCreatorState {
	isMenuShown: boolean
}

@observer
export default
class ElementCreator
extends React.Component<ElementCreatorProps, ElementCreatorState> {
	state
		: ElementCreatorState
		= {
			isMenuShown: false,
		}

	clickCoords
		: Coordinates2D
		= {
			x: 0,
			y: 0,
		}

	componentDidMount() {
		window.addEventListener("resize", this.hideMenu)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.hideMenu)
	}

	handleClick = (
		event: React.MouseEvent
	) => {
		const { clientX: x, clientY: y } = event
		this.clickCoords = { x, y }
		this.showMenu()
	}

	toggleMenu = () => {
		this.setState({
			isMenuShown: !this.state.isMenuShown,
		})
	}

	showMenu = () => {
		this.setState({
			isMenuShown: true,
		})
	}

	hideMenu = () => {
		this.setState({
			isMenuShown: false,
		})
	}

	render() {
		const { isMenuShown } = this.state
		return <>
			<div
				className={`c-element-creator __no-print ${isMenuShown ? "menu-shown" : ""}`}
				onClick={this.handleClick}
			>
				<i className="fas fa-plus" />
				<span>
					Add element
				</span>
			</div>
			{isMenuShown && ReactDOM.createPortal(
				<ElementCreatorMenu
					position={this.clickCoords}
					onOutsideClick={this.hideMenu}
				/>,
				document.body
			)}
		</>
	}
}

interface ElementCreatorMenuProps {
	position: Coordinates2D
	onOutsideClick?: () => void
}

interface ElementCreatorMenuState {

}

@observer
class ElementCreatorMenu
extends React.Component<ElementCreatorMenuProps, ElementCreatorMenuState> {
	wrapper
		: HTMLDivElement

	isAbleToHide
		: boolean
		= false

	componentDidMount() {
		document.addEventListener("click", this.handleOutsideClick)
		setTimeout(() => {
			this.isAbleToHide = true
		}, 300)
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.handleOutsideClick)
	}

	handleOutsideClick = (
		event: MouseEvent
	) => {
		if (!this.isAbleToHide)
			return

		if (!isEventFiredInsideElement(event.target, this.wrapper))
			this.props.onOutsideClick?.()
	}

	render() {
		const { x, y } = this.props.position

		return <>
			<div
				ref={r => this.wrapper = r!}
				className="c-element-creator-menu __temp"
				style={{
					top: y,
					left: x,
				}}
			>
				Content Here :)
			</div>
		</>
	}
}