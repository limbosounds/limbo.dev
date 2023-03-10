import { ContactType, LanguageProficiency } from "typings"

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

export const languageProficienciesIcons: {
	[key in LanguageProficiency]: string
} = {
	beginner: "angle-double-down",
	elementary: "angle-down",
	lower_intermediate: "minus",
	upper_intermediate: "equals",
	advanced: "angle-up",
	fluent: "angle-double-up",
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

export const contactIcons: {
	[key in ContactType]: string
} = {
	location: "fas fa-map-marker-alt",
	phone: "fas fa-phone",
	email: "fas fa-envelope",
	facebook: "fab fa-facebook",
	github: "fab fa-github",
	instagram: "fab fa-instagram",
	linkedin: "fab fa-linkedin",
	skype: "fab fa-skype",
	telegram: "fab fa-telegram",
	twitter: "fab fa-twitter",
	vk: "fab fa-vk",
}

export const contactNames: {
	[key in ContactType]: string
} = {
	location: "Location",
	phone: "Phone number",
	email: "Email",
	facebook: "Facebook",
	github: "GitHub",
	instagram: "Instagram",
	linkedin: "LinkedIn",
	skype: "Skype",
	telegram: "Telegram",
	twitter: "Twitter",
	vk: "VK",
}