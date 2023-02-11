import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/page"

import { PageFormat, PageOrientation } from "typings"
import { ResumeLayoutType } from "typings/Resume"
import { isMainSection, ResumeStore } from "stores/Resume"
import ResumeSectionComponent from "./Section"

export interface ResumePageProps<T extends ResumeLayoutType> {
	format: PageFormat
	orientation: PageOrientation
	store: ResumeStore<T>
}

export interface ResumePageState {

}

@observer
export default
class ResumePage<T extends ResumeLayoutType>
extends React.Component<ResumePageProps<T>, ResumePageState> {
	sizes
		: {
			[key in PageFormat]: {
				size: [number, number]
				measure: "mm" | "in"
			}
		}
		= {
			a4: {
				size: [210, 297],
				measure: "mm",
			},
			letter: {
				size: [8.5, 11],
				measure: "in",
			}
		}

	render() {
		const { format, orientation, store } = this.props
		const { measure, size } = this.sizes[format]
		const [ width, height ] = orientation == "landscape" ? size.reverse() : size

		return <>
			<section
				className={`c-resume-page ${store.layout}`}
				style={{
					width: `${width}${measure}`,
					minHeight: `${height}${measure}`,
				}}
			>
				{store.data.sections.map((section, i) => {
					return <ResumeSectionComponent
						key={i}
						isMain={isMainSection(section)}
						section={section}
					/>
				})}
			</section>
		</>
	}
}