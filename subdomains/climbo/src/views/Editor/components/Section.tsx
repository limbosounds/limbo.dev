import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/section"

import { IResumeSection } from "models/Resume/Section"
import { IResume } from "models/Resume"

export interface PageSectionProps {
	section: IResumeSection
	resume: IResume
}

export interface PageSectionState {

}

@observer
export default
class PageSection
extends React.Component<PageSectionProps, PageSectionState> {
	render() {
		const { section, resume } = this.props
		const { isMain, hasDescriptionSlot } = section
		isMain
		hasDescriptionSlot
		resume
		return <>
			<div className="c-resume-section">

			</div>
		</>
	}
}