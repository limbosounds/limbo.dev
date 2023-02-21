import { LanguageProficiency } from "typings"

export const languageProficiencies = [
	"beginner",
	"elementary",
	"lower_intermediate",
	"upper_intermediate",
	"advanced",
	"fluent",
] as const

export const languageProficienciesLabels: {
	[key in LanguageProficiency]: string
} = {
	beginner: "A1 / Beginner",
	elementary: "A2 / Elementary",
	lower_intermediate: "B1 / Lower intermediate",
	upper_intermediate: "B2 / Upper intermediate",
	advanced: "C1 / Advanced",
	fluent: "C2 / Fluent",
}

export const contactTypes = [
	"email",
	"phone",
	"location",
	"github",
	"linkedin",
	"skype",
	"facebook",
	"vk",
	"instagram",
	"telegram",
	"twitter",
] as const

export const pageFormats = [
	"a4",
	"letter",
] as const

export const pageOrientations = [
	"portrait",
	"landscape",
] as const