import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/elements/header"

import { IEditableString } from "models/Resume/components/EditableString"

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
				
			</header>
		</>
	}
}