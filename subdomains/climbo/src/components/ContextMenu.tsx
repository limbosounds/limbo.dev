import React from "react"
import ReactDOM from "react-dom"
import { observer } from "mobx-react"

import "styles/components/context-menu"
import { isEventFiredInsideElement } from "utils/dom"
import { Coordinates2D } from "typings"

export interface ContextMenuChildrenProps {
	className: string
	ref: (
		r: HTMLElement | null
	) => void
	onClick: (
		event: React.MouseEvent<HTMLElement>
	) => void
}

export interface ContextMenuProps<T extends string | number> {
	items: readonly T[]
	renderItem?: (
		value: T
	) => React.ReactNode
	onSelect: (
		value: T
	) => void
	children: (
		props: ContextMenuChildrenProps
	) => React.ReactNode
}

export interface ContextMenuState {
	isShown: boolean
}

@observer
export default 
class ContextMenu<T extends string | number>
extends React.Component<ContextMenuProps<T>, ContextMenuState> {
	state
		: ContextMenuState
		= {
			isShown: false,
		}

	trigger
		: HTMLElement | null

	isAbleToHide
		: boolean
		= false

	position
		: Coordinates2D
		= {
			x: 0,
			y: 0,
		}

	componentDidMount() {
		document.addEventListener("click", this.handleOutsideClick)
		document.addEventListener("scroll", this.hide)
		window.addEventListener("resize", this.hide)
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.handleOutsideClick)
		document.removeEventListener("scroll", this.hide)
		window.removeEventListener("resize", this.hide)
	}

	handleOutsideClick = (
		event: MouseEvent
	) => {
		if (!this.trigger || !this.isAbleToHide)
			return

		if (!isEventFiredInsideElement(event.target, this.trigger))
			this.hide()
	}

	show = (
		event: React.MouseEvent<HTMLElement>
	) => {
		this.position.x = event.clientX
		this.position.y = event.clientY
		setTimeout(() => this.isAbleToHide = true, 100)

		this.setState({
			isShown: true,
		})
	}

	hide = () => {
		this.isAbleToHide = false
		this.setState({
			isShown: false,
		})
	}

	render() {
		const {
			items,
			onSelect,
			children,
			renderItem = value => value,
		} = this.props

		const {
			isShown,
		} = this.state

		return <>
			{children({
				className: isShown ? "u-ignore-pointer" : "",
				ref: r => this.trigger = r,
				onClick: this.show,
			})}

			{isShown &&
				ReactDOM.createPortal(
					<div
						className="c-context-menu u-fancy-scale-in"
						style={{
							top: this.position.y,
							left: this.position.x,
						}}
					>
						{items.map(item => {
							return <div
								key={item}
								className="u-list-item"
								onClick={() => onSelect(item)}
							>
								{renderItem(item)}
							</div>
						})}
					</div>,
					document.body,
				)
			}
		</>
	}
}