import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/element-creator"

import { ResumeElementInstance, ResumeElementType } from "typings/Resume"
import { resumeElements } from "consts/resume"
import { TileElementModel } from "models/Resume/elements/Tile"
import { LanguagesElementModel } from "models/Resume/elements/Languages"
import AddButton from "components/Buttons/Add"
import { ContactsElementModel } from "models/Resume/elements/Contacts"
import ContextMenu from "components/ContextMenu"

export interface ElementCreatorProps {
	onSelect: (
		item: ResumeElementInstance
	) => void
}

export interface ElementCreatorState {
	
}

@observer
export default
class ElementCreator
extends React.Component<ElementCreatorProps, ElementCreatorState> {
	elementTypesContent
		: {
			[key in ResumeElementType]: {
				title: string
				description: string
			}
		}
		= {
			tile: {
				title: "Tile",
				description: "Typically used for short listing your skills",
			},
			contacts: {
				title: "Contacts",
				description: "List of your contacts/socials",
			},
			languages: {
				title: "Languages",
				description: "List of languages and your proficiencies",
			},
		}

	handleSelect = (
		type: ResumeElementType
	) => {
		let modelInstance: ResumeElementInstance | undefined = undefined

		switch (type) {
			case "tile":
				modelInstance = TileElementModel.create({
					type: "tile",
					items: [
						{ value: "Tile item", },
					],
				})
				break
			case "languages":
				modelInstance = LanguagesElementModel.create({
					type: "languages",
					items: [
						{
							language: { value: "Language" },
						}
					]
				})
				break
			case "contacts":
				modelInstance = ContactsElementModel.create({
					type: "contacts",
					items: [
						{
							type: "location",
							value: "location",
						},
						{
							type: "email",
							value: "email",
						},
					]
				})
		}

		if (typeof modelInstance == "undefined")
			return

		this.props.onSelect(modelInstance)
	}

	render() {
		return <ContextMenu
			items={resumeElements}
			onSelect={this.handleSelect}
			renderItem={item => {
				const content = this.elementTypesContent[item]
				return <div
					key={item}
					className="c-element-creator-item"
				>
					<i className="fas fa-file-image" />
					<h4>
						{content.title}
					</h4>
					<p>
						{content.description}
					</p>
				</div>
			}}
		>
			{props => {
				return <AddButton
					className={`c-element-creator __no-print ab__iph ${props.className || ""}`}
					onClick={props.onClick}
					getRef={props.ref}
				>
					Add Element
				</AddButton>
			}}
		</ContextMenu>
	}
}