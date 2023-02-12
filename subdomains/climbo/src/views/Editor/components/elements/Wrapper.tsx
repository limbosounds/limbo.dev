import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/element-wrapper"

export interface ElementWrapperProps {
	info: string
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
			</div>
		</>
	}
}