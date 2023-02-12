import { resumeElements, resumeLayouts } from "consts/resume"

export type ResumeLayoutType = typeof resumeLayouts[number]

export type ResumeTimelineSubtype =
	| "experience"
	| "education"
	| "custom"

export type ResumeElementDates = {
	from: string
	to?: string
}

export type ResumeElementType = typeof resumeElements[number]