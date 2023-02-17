import { resumeElements, resumeLayouts } from "consts/resume"
import { ContactsElementModel, IContactsElement } from "models/Resume/elements/Contacts"
import { ILanguagesElement, LanguagesElementModel } from "models/Resume/elements/Languages"
import { ITileElement, TileElementModel } from "models/Resume/elements/Tile"

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

export type ResumeElementModel =
	| typeof TileElementModel
	| typeof LanguagesElementModel
	| typeof ContactsElementModel

export type ResumeElementInstance =
	| ITileElement
	| ILanguagesElement
	| IContactsElement