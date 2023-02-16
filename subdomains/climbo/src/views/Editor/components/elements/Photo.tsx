import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/elements/photo"

import { HorizontalAlignment } from "typings/Template"

export interface PhotoElementProps {
	photo?: string
	alignment?: HorizontalAlignment
	onChange: (
		photo?: string
	) => void
}

export interface PhotoElementState {

}

@observer
export default
class PhotoElement
extends React.Component<PhotoElementProps, PhotoElementState> {
	filepicker
		: HTMLInputElement

	handleFileSelect = (
		event: React.FormEvent<HTMLInputElement>
	) => {
		const image = event.currentTarget.files?.item(0)
		if (image) {
			const reader = new FileReader()
			reader.addEventListener("load", _ => {
				if (typeof reader.result == "string")
					this.props.onChange(reader.result)
			})
			reader.readAsDataURL(image)
		}

		event.currentTarget.value = ""
	}

	removePhoto = () => {
		this.props.onChange()
	}

	openFilepicker = () => {
		this.filepicker.click()
	}

	render() {
		const { photo, alignment = "center" } = this.props

		return <>
			<div className={`c-photo-element align-${alignment} ${!photo ? "__no-print" : ""}`}>
				<input
					type="file"
					ref={r => this.filepicker = r!}
					style={{ display: "none" }}
					onChange={this.handleFileSelect}
					accept="image/*"
				/>
				<div className="pe-box">
					{!photo
						? <div
							className="pe-placeholder"
							onClick={this.openFilepicker}
						>
							<i className="fas fa-camera" />
							<span>
								Add photo
							</span>
						</div>
						: <div className="pe-photo">
							<img src={photo} />
							<div
								className="pe-remove"
								onClick={this.removePhoto}
							>
								<i className="fas fa-trash-alt" />
								<span>
									Remove
								</span>
							</div>
						</div>
					}
				</div>
			</div>
		</>
	}
}