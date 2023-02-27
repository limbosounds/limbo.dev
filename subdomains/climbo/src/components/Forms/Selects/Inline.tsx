import React from "react"
import ReactDOM from "react-dom"
import { observer } from "mobx-react"

import "styles/components/forms/selects/inline"

import { Coordinates2D, Option } from "typings"
import { isEventFiredInsideElement } from "utils/dom"

export interface InlineSelectProps<
	T extends string | number = string,
	E extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap
> {
	element?: E
	elementProps?: React.HTMLAttributes<HTMLElementTagNameMap[E]>
	options: Option<T>[]
	block?: boolean
	selected: T
	onSelect: (
		value: T
	) => void
	children: (
		value: T
	) => React.ReactNode
}

export interface InlineSelectState {
	isShown: boolean
}

@observer
export default
class InlineSelect<
	T extends string | number = string,
	E extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap
> extends React.Component<InlineSelectProps<T, E>, InlineSelectState> {
	static defaultProps
		= {
			element: "span",
		}

	state
		: InlineSelectState
		= {
			isShown: false,
		}
	
	element?
		: HTMLElement

	get position(): Coordinates2D {
		if (!this.element)
			return { x: 0, y: 0 }
		
		const box = this.element.getBoundingClientRect()

		return {
			x: box.left,
			y: box.top + box.height,
		}
	}

	componentDidMount() {
		document.addEventListener("click", this.handleOutsideClick)
		document.addEventListener("scroll", this.update)
		window.addEventListener("resize", this.update)
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.handleOutsideClick)
		document.removeEventListener("scroll", this.update)
		window.removeEventListener("resize", this.update)
	}

	update = () => {
		this.forceUpdate()
	}

	handleOutsideClick = (
		event: MouseEvent
	) => {
		if (!this.element)
			return

		if (isEventFiredInsideElement(event.target, this.element))
			return

		this.hide()
	}

	hide = () => {
		this.setState({
			isShown: false,
		})
	}

	handleClick = (
		event: React.MouseEvent<HTMLElementTagNameMap[E]>
	) => {
		this.props.elementProps?.onClick?.(event)

		this.setState({
			isShown: !this.state.isShown,
		})
	}

	render() {
		const { elementProps = {}, block, selected } = this.props
		const { isShown } = this.state
		const Element = this.props.element! as React.ElementType

		return <>
			<Element
				{...elementProps}
				className={`c-inline-select-item ${
					block ? "block" : "" } ${
					elementProps.className || "" } ${
					isShown ? "shown" : "" }`
				}
				onClick={this.handleClick}
				ref={(r: HTMLElement | null) => this.element = r!}
			>
				<span className="isi-content">
					{this.props.children(selected)}
				</span>
				<i className={`fas fa-caret-${isShown ? "up" : "down"}`} />
			</Element>

			{isShown &&
				ReactDOM.createPortal(
					<div
						className="c-inline-select-list u-fancy-scale-in"
						style={{
							top: this.position.y,
							left: this.position.x,
						}}
					>
						{this.props.options.map(option => {
							const { value, label } = option
							const isSelected = value == selected
							return <div
								key={value}
								className={`isl-item ${isSelected ? "selected" : ""}`}
								onClick={() => {
									this.props.onSelect(value)
									this.hide()
								}}
							>
								<span className="isl-label">
									{label}
								</span>
								{isSelected &&
									<i className="fas fa-check" />
								}
							</div>
						})}
					</div>,
					document.body,
				)
			}
		</>
	}
}