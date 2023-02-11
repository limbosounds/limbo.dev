import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/resume-page"

import { PageFormat, PageOrientation } from "typings"
import { Resume, ResumeLayoutType } from "typings/Resume"

export interface ResumePageProps<T extends ResumeLayoutType> {
	format: PageFormat
	orientation: PageOrientation
	layout: T
	data: Resume<T>
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
		const { format, orientation, layout, data } = this.props
		const { measure, size } = this.sizes[format]
		const [ width, height ] = orientation == "landscape" ? size.reverse() : size

		layout
		data
		
		return <>
			<section
				className="c-resume-page"
				style={{
					width: `${width}${measure}`,
					minHeight: `${height}${measure}`,
				}}
			>

			</section>
		</>
	}
}