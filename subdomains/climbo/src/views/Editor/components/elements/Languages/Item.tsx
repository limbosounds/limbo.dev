import React from "react"
import { observer } from "mobx-react"
import { Element as Tooltip } from "@sounds.of.limbo/tooltip"

import "styles/views/editor/components/elements/languages/item"

import { ILanguage } from "models/Resume/elements/Languages"
import InlineSelect from "components/Forms/Selects/Inline"
import { createOptions } from "utils/select"
import { languageProficiencies, languageProficienciesLabels } from "consts"
import ContentEditable from "components/ContentEditable"
import { DefaultElementProps } from "typings/Resume"

export interface LanguageItemProps
extends DefaultElementProps<ILanguage> {
	
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
				<i className="fas fa-globe" />
				<Tooltip
					element="i"
					elementProps={{
						className: `fas fa-trash-alt`,
						onClick: this.props.onRemove
					}}
					content="Remove language"
				/>
				<Tooltip
					element="h3"
					content="Click to edit"
				>
					<ContentEditable
						model={model.language}
						autofocus
					/>
				</Tooltip>
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