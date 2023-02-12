import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/page"

import { PageFormat } from "typings"

import { IResume } from "models/Resume"
import { ITemplate } from "models/Template"

import PageSection from "./Section"

export interface PageProps {
	resume: IResume
	template: ITemplate
}

export interface PageState {

}

@observer
export default
class Page
extends React.Component<PageProps, PageState> {
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
		const { template, resume } = this.props
		const { format, layout, orientation } = template
		const { measure, size } = this.sizes[format]
		const [ width, height ] = orientation == "landscape" ? size.reverse() : size

		return <>
			<section
				className={`c-resume-page ${layout}`}
				style={{
					width: `${width}${measure}`,
					minHeight: `${height}${measure}`,
				}}
			>
				{resume.sections.map((section, i) => {
					return <PageSection
						key={i}
						resume={resume}
						section={section}
					/>
				})}
			</section>
		</>
	}
}