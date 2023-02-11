import { observable, makeObservable, computed } from "mobx"
import { Resume, ResumeLayoutType, ResumeLayoutTypeSectionsReferrence, ResumeMainSection, ResumeSection } from "typings/Resume"

export interface ResumeStoreDefaultData {
	name: string
	position: string
}

const getDefaultSections = <T extends ResumeLayoutType = ResumeLayoutType>(
	layout: T,
	defaultData: ResumeStoreDefaultData,
): ResumeLayoutTypeSectionsReferrence[T] => {
	const { name, position } = defaultData

	const getSection = (): ResumeSection => {
		return {
			elements: [],
		}
	}
	const mainSection: ResumeMainSection = {
		...getSection(),
		name,
		position,
		photo: undefined,
	}

	switch (layout) {
		case "column":
			return [mainSection, getSection()] as any
		case "reverse_column":
			return [getSection(), mainSection] as any
		case "solid":
			return [mainSection] as any
		case "triple":
			return [mainSection, getSection(), getSection()] as any
		default:
			return [] as any
	}
}

export class ResumeStore<T extends ResumeLayoutType> {
	@observable
	private _data
		: Resume<T>
		= {
			layout: this.layout,
			background: undefined,
			sections: getDefaultSections(this.layout, this.defaultData)
		}

	constructor(
		private readonly layout: T,
		private readonly defaultData: ResumeStoreDefaultData,
	) {
		makeObservable(this)
	}

	@computed
	get data(): Resume<T> {
		return this._data
	}
}