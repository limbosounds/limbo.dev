import React from "react"
import { observer } from "mobx-react"

import "styles/components/buttons/simple"

export type SimpleButtonStyle =
	| "default"

export interface SimpleButtonProps {
	box?: boolean
	style?: SimpleButtonStyle
	disabled?: boolean
	onClick?: () => void
	children: React.ReactNode
}

export interface SimpleButtonState {

}

@observer
export default
class SimpleButton
extends React.Component<SimpleButtonProps, SimpleButtonState> {
	render() {
		const { box, style = "default", onClick } = this.props
		return <>
			<button
				className={`c-simple-button ${style} ${box ? "box" : ""}`}
				disabled={this.props.disabled}
				onClick={onClick}
			>
				<div className="sb-inner-wrapper">
					{this.props.children}
				</div>
			</button>
		</>
	}
}