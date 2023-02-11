import { contactTypes, languageProficiencies } from "consts"

export type LanguageProficiency = typeof languageProficiencies[number]
export type ContactType = typeof contactTypes[number]