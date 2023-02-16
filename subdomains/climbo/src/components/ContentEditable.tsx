import React from "react"
import { observer } from "mobx-react"

import { IEditableString } from "models/Resume/components/EditableString"

export interface ContentEditableProps {
	multiline?: boolean
	model: IEditableString
}

export interface ContentEditableState {

}

@observer
export default
class ContentEditable
extends React.Component<ContentEditableProps, ContentEditableState> {
	key
		: number
		= 1

	content
		: HTMLDivElement

	handleChange = (
		event: React.FormEvent<HTMLDivElement>
	) => {
		let { innerText } = event.currentTarget
		if (!this.props.multiline)
			innerText = innerText.replace(/\r?\n/g, "")
		this.props.model.setBuffer(innerText)
	}

	update = () => {
		this.props.model.updateValue()
		this.props.model.setBuffer(this.props.model.value)
		this.key++
		this.forceUpdate()
	}

	handleKeyDown = (
		event: React.KeyboardEvent<HTMLDivElement>
	) => {
		switch (event.key) {
			case "Escape":
				this.props.model.setBuffer(this.props.model.value)
				this.content.blur()
				return
			case "Enter":
				if (!this.props.multiline || event.ctrlKey) {
					event.preventDefault()
					this.content.blur()
				}
		}
	}

	render() {
		return <>
			<div
				key={this.key}
				ref={r => this.content = r!}
				className={`${this.props.multiline ? "multiline" : ""}`}
				contentEditable
				suppressContentEditableWarning
				onBlur={this.update}
				onInput={this.handleChange}
				onKeyDown={this.handleKeyDown}
				dangerouslySetInnerHTML={{
					__html: this.props.model.value
				}}
			/>
		</>
	}
}