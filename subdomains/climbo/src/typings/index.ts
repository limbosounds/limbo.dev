import { contactTypes, languageProficiencies, pageFormats, pageOrientations } from "consts"

export type LanguageProficiency = typeof languageProficiencies[number]
export type ContactType = typeof contactTypes[number]
export type PageFormat = typeof pageFormats[number]
export type PageOrientation = typeof pageOrientations[number]

export type Coordinates2D = {
	x: number
	y: number
}

export type Coordinates3D = {
	z: number
} & Coordinates2D