import React from "react"
import { observer } from "mobx-react"
import { Element as Tooltip } from "@sounds.of.limbo/tooltip"

import "styles/views/editor/components/elements/wrapper"

export interface ElementWrapperProps {
	info: string
	onRemove: () => void
	children: React.ReactNode
}

export interface ElementWrapperState {

}

@observer
export default
class ElementWrapper
extends React.Component<ElementWrapperProps, ElementWrapperState> {
	render() {
		return <>
			<div
				className="c-resume-element-wrapper"
				data-info={`${this.props.info}`}
			>
				{this.props.children}
				<Tooltip
					element="span"
					elementProps={{
						className: "rew-remove",
						onClick: this.props.onRemove
					}}
					content="Remove this element"
				>
					<i className="fas fa-trash-alt" />
				</Tooltip>
			</div>
		</>
	}
}