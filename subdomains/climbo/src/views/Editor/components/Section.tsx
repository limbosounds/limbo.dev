import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/section"

import { IResumeSection } from "models/Resume/Section"
import { IResume } from "models/Resume"

import PhotoElement from "./elements/Photo"
import NameElement from "./elements/Name"
import PositionElement from "./elements/Position"
import ElementCreator from "./ElementCreator"
import TileElement from "./elements/Tile"

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
		hasDescriptionSlot
		resume
		return <>
			<div className="c-resume-section">
				{isMain &&
					<header className="rs-main-info">
						<PhotoElement
							photo={resume.photo}
							onChange={resume.setPhoto}
						/>
						<NameElement
							model={resume.name}
						/>
						<PositionElement
							model={resume.position}
						/>
					</header>
				}
				{section.elements.map((element, i) => {
					switch (element.type) {
						case "tile":
							return <TileElement
								key={i}
								model={element}
								onRemove={() => section.remove(element)}
							/>
						default:
							return null
					}
				})}
				<ElementCreator
					onSelect={instance => section.add(instance)}
				/>
			</div>
		</>
	}
}