import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor"

import { ResumeModel } from "models/Resume"
import { TemplateModel } from "models/Template"

import Page from "./components/Page"

export interface EditorProps {

}

export interface EditorState {

}

@observer
export default
class Editor
extends React.Component<EditorProps, EditorState> {
	template = TemplateModel.create({
		format: "a4",
		layout: "column",
		orientation: "portrait",
	})

	resume = ResumeModel.create({
		sections: [ // TODO dependency from template layout
			{
				isMain: true,
			},
			{
				hasDescriptionSlot: true,
			}
		]
	})

	render() {
		return <>
			<main className="v-editor">
				<Page
					resume={this.resume}
					template={this.template}
				/>
			</main>
		</>
	}
}