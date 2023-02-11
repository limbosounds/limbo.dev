import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor"
import { ResumeStore } from "stores/Resume"
import ResumePage from "./components/Page"

export interface EditorProps {

}

export interface EditorState {

}

@observer
export default
class Editor
extends React.Component<EditorProps, EditorState> {
	store = new ResumeStore("column", { name: "Kappa Pride", position: "Frontend Developer" })

	render() {
		return <>
			<main className="v-editor">
				<ResumePage
					store={this.store}
					format="a4"
					orientation="portrait"
				/>
			</main>
		</>
	}
}