import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/elements/languages/item"

import { ILanguage } from "models/Resume/elements/Languages"
import InlineSelect from "components/Forms/Selects/Inline"
import { createOptions } from "utils/select"
import { languageProficiencies, languageProficienciesLabels } from "consts"
import ContentEditable from "components/ContentEditable"

export interface LanguageItemProps {
	model: ILanguage
}

export interface LanguageItemState {

}

@observer
export default
class LanguageItem
extends React.Component<LanguageItemProps, LanguageItemState> {
	render() {
		const { model } = this.props
		return <>
			<div className="c-language-item">
				<i className="fas fa-chevron-right" />
				<h3>
					<ContentEditable
						model={model.language}
						autofocus
					/>
				</h3>
				<InlineSelect
					element="span"
					elementProps={{
						className: "li-proficiency"
					}}
					options={createOptions(languageProficiencies, languageProficienciesLabels)}
					onSelect={model.updateProficiency}
					selected={model.proficiency}
				>
					{value => languageProficienciesLabels[value]}
				</InlineSelect>
			</div>
		</>
	}
}