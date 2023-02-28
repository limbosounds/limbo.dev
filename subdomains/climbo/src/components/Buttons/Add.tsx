import React from "react"
import { Element as Tooltip } from "@sounds.of.limbo/tooltip"

import "styles/components/buttons/add"

export type AddButtonSize =
	| "default"
	| "small"

export interface AddButtonProps {
	compact?: boolean
	size?: AddButtonSize
	children?: React.ReactNode
	className?: string
	tooltip?: React.ReactNode
	getRef?: (
		r: HTMLDivElement
	) => void
	onClick?: (
		event: React.MouseEvent<HTMLDivElement>
	) => void
}

export interface AddButtonState {

}

export default
class AddButton
extends React.Component<AddButtonProps, AddButtonState> {
	render() {
		const {
			compact = false,
			size = "default",
			className = "",
		} = this.props

		return <>
			<Tooltip
				element="div"
				elementProps={{
					className: `c-add-button ${compact ? "compact" : ""} ${size} ${className}`,
					onClick: this.props.onClick,
					ref: this.props.getRef
				} as React.HTMLAttributes<HTMLDivElement> & { [key: string]: any }}
				content={this.props.tooltip}
			>
				<i className="fas fa-plus" />
				{!compact &&
					<span>
						{this.props.children}
					</span>
				}
			</Tooltip>
		</>
	}
}