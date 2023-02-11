import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/section"

import { ResumeMainSection, ResumeSection } from "typings/Resume"

export interface ResumeSectionComponentProps<T extends boolean> {
	isMain: T
	section: T extends true ? ResumeMainSection : ResumeSection
}

export interface ResumeSectionComponentState {

}

@observer
export default
class ResumeSectionComponent<T extends boolean>
extends React.Component<ResumeSectionComponentProps<T>, ResumeSectionComponentState> {
	render() {
		return <>
			<div className="c-resume-section">

			</div>
		</>
	}
}