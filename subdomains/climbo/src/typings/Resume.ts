import { ContactType, LanguageProficiency } from "typings"

export type ResumeLayoutTypeSectionsReferrence = {
	solid: [ResumeMainSection]
	column: [ResumeMainSection, ResumeSection]
	reverse_column: [ResumeSection, ResumeMainSection]
	triple: [ResumeMainSection, ResumeSection, ResumeSection]
}

export type ResumeLayoutType = keyof ResumeLayoutTypeSectionsReferrence

export type ResumeTimelineSubtype =
	| "experience"
	| "education"
	| "custom"

export type ResumeElementDates = {
	from: string
	to?: string
}

export type ResumeElementTypeDataReferrence = {
	desciption: string
	tile: {
		items: string[]
	}
	languages: {
		items: {
			language: string
			proficiency: LanguageProficiency
		}[]
	}
	timeline: {
		subtype: ResumeTimelineSubtype
		items: {
			title: string
			subtitle: string
			caption: string
			dates: ResumeElementDates
		}[]
	}
	list: {
		items: {
			title: string
			caption?: string
			dates?: ResumeElementDates
		}
	}
	progress_list: {
		items: {
			label: string
			progress: number
		}[]
	}
	contacts: {
		items: {
			type: ContactType
			value: string
		}
	}
}

export type ResumeElementType = keyof ResumeElementTypeDataReferrence

export type ResumeSectionElement<T extends ResumeElementType = ResumeElementType> = {
	type: T
	data: ResumeElementTypeDataReferrence[T]
}

export interface ResumeSection {
	elements: ResumeSectionElement[]
}

export interface ResumeMainSection
extends ResumeSection {
	name: string
	position: string
	photo?: string
}

export interface Resume<T extends ResumeLayoutType = ResumeLayoutType> {
	layout: T
	background?: string
	sections: ResumeLayoutTypeSectionsReferrence[T]
}