import React from "react"
import { observer } from "mobx-react"
import { Element as Tooltip } from "@sounds.of.limbo/tooltip"

import "styles/views/editor/components/elements/languages/item"

import { ILanguage } from "models/Resume/elements/Languages"
import InlineSelect from "components/Forms/Selects/Inline"
import { languageProficiencies, languageProficienciesIcons, languageProficienciesLabels } from "consts"
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
					options={languageProficiencies}
					onSelect={model.updateProficiency}
					selected={model.proficiency}
					renderOption={value => {
						return <div
							key={value}
							className="u-list-item-inner"
						>
							<i className={`fas fa-${languageProficienciesIcons[value]}`} />
							<span>
								{languageProficienciesLabels[value]}
							</span>
						</div>
					}}
				>
					{value => languageProficienciesLabels[value]}
				</InlineSelect>
			</div>
		</>
	}
}