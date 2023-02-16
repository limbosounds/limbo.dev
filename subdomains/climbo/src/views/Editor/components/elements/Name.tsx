import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/elements/name"

import { HorizontalAlignment } from "typings/Template"

import { IEditableString } from "models/Resume/components/EditableString"

import ContentEditable from "components/ContentEditable"

export interface NameElementProps {
	alignment?: HorizontalAlignment
	model: IEditableString
}

export interface NameElementState {

}

@observer
export default
class NameElement
extends React.Component<NameElementProps, NameElementState> {
	render() {
		const { alignment = "center" } = this.props
		return <>
			<h1 className={`c-resume-name align-${alignment}`}>
				<ContentEditable
					model={this.props.model}
				/>
			</h1>
		</>
	}
}