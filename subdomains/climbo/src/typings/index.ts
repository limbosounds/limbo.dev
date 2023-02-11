import { contactTypes, languageProficiencies, pageFormats, pageOrientations } from "consts"

export type LanguageProficiency = typeof languageProficiencies[number]
export type ContactType = typeof contactTypes[number]
export type PageFormat = typeof pageFormats[number]
export type PageOrientation = typeof pageOrientations[number]