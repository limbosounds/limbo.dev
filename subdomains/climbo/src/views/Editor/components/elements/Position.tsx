import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/elements/position"

import { HorizontalAlignment } from "typings/Template"

import { IEditableString } from "models/Resume/components/EditableString"

import ContentEditable from "components/ContentEditable"

export interface PositionElementProps {
	alignment?: HorizontalAlignment
	model: IEditableString
}

export interface PositionElementState {

}

@observer
export default
class PositionElement
extends React.Component<PositionElementProps, PositionElementState> {
	render() {
		const { alignment = "center" } = this.props
		return <>
			<h2 className={`c-resume-position align-${alignment}`}>
				<ContentEditable
					model={this.props.model}
				/>
			</h2>
		</>
	}
}