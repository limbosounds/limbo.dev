import React from "react"
import { observer } from "mobx-react"

import { EditableEditorProps } from "components/Editable"
import SimpleInput from "components/Forms/Inputs/Simple"
import { createEscHandler } from "utils/dom"
import { IEditableString } from "models/Resume/components/EditableString"
import SimpleButton from "components/Buttons/Simple"

export interface HeaderEditorProps
extends EditableEditorProps {
	model: IEditableString
}

export interface HeaderEditorState {

}

@observer
export default
class HeaderEditor
extends React.Component<HeaderEditorProps, HeaderEditorState> {
	componentDidMount() {
		document.addEventListener("keydown", createEscHandler(this.quit))
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", createEscHandler(this.quit))
	}

	quit = () => {
		this.props.model.setBuffer(this.props.model.value)
		this.props.onEditEnd()
	}

	saveAndQuit = () => {
		this.props.model.updateValue()
		this.props.onEditEnd()
	}

	handleKeyDown = (
		event: React.KeyboardEvent
	) => {
		if (event.key == "Enter" && this.props.model.isBufferValid)
			this.saveAndQuit()
	}

	render() {
		const { model } = this.props
		return <>
			<div className="u-flex">
				<SimpleInput
					defaultValue={model.value}
					onChange={model.setBuffer}
					autofocus
					onKeyDown={this.handleKeyDown}
				/>
				<SimpleButton
					box
					disabled={!model.isBufferValid}
					onClick={this.saveAndQuit}
				>
					<i className="edit fas fa-check" />
				</SimpleButton>
			</div>
		</>
	}
}