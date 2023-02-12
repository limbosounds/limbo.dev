import React from "react"

import "styles/components/forms/inputs/simple"

export interface SimpleInputProps {
	defaultValue?: string | number
	placeholder?: string
	autofocus?: boolean
	onChange?: (
		value: string
	) => void
	onKeyDown?: (
		event: React.KeyboardEvent
	) => void
}

export interface SimpleInputState {

}

export default
class SimpleInput
extends React.Component<SimpleInputProps, SimpleInputState> {
	render() {
		const { defaultValue = "" } = this.props
		return <>
			<div className="c-simple-input">
				<input
					type="text"
					defaultValue={`${defaultValue}`}
					placeholder={this.props.placeholder}
					autoFocus={this.props.autofocus}
					onChange={event => {
						this.props.onChange?.(event.currentTarget.value)
					}}
					onKeyDown={this.props.onKeyDown}
				/>
			</div>
		</>
	}
}