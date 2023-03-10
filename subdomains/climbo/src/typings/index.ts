import { contactTypes, languageProficiencies } from "consts"

export type LanguageProficiency = typeof languageProficiencies[number]
export type ContactType = typeof contactTypes[number]

export type Coordinates2D = {
	x: number
	y: number
}

export type Coordinates3D = {
	z: number
} & Coordinates2D

export type Option<T extends string | number = string> = {
	value: T
	label: string
}