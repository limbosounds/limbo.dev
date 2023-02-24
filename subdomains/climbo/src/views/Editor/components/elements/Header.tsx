import React from "react"
import { observer } from "mobx-react"
import { Element as Tooltip } from "@sounds.of.limbo/tooltip"

import "styles/views/editor/components/elements/header"

import { IEditableString } from "models/Resume/components/EditableString"
import ContentEditable from "components/ContentEditable"

export interface ElementHeaderProps {
	model: IEditableString
}

export interface ElementHeaderState {

}

@observer
export default
class ElementHeader
extends React.Component<ElementHeaderProps, ElementHeaderState> {
	render() {
		return <>
			<header className="c-element-header">
				<Tooltip
					element="h2"
					content="Click to edit"
				>
					<ContentEditable
						model={this.props.model}
					/>
				</Tooltip>
			</header>
		</>
	}
}