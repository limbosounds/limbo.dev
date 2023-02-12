import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/elements/header"

import { IEditableString } from "models/Resume/components/EditableString"

import Editable, { EditableViewerProps } from "components/Editable"
import HeaderEditor from "../editors/Header"

export interface ElementHeaderProps {
	model: IEditableString
}

export interface ElementHeaderState {

}

interface ElementHeaderViewerProps
extends EditableViewerProps {

}

@observer
export default
class ElementHeader
extends React.Component<ElementHeaderProps, ElementHeaderState> {
	render() {
		const { model } = this.props
		return <>
			<header className="c-element-header">
				<Editable
					editor={[
						HeaderEditor,
						{ model },
					]}
					viewer={[
						(props: ElementHeaderViewerProps) => {
							return <>
								<h2>
									{model.value}
								</h2>
								<i
									className="fas fa-pen no-print"
									onClick={props.onEditStart}
								/>
							</>
						},
						{}
					]}
				/>
			</header>
		</>
	}
}