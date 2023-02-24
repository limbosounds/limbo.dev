import React from "react"
import { observer } from "mobx-react"
import { Element as Tooltip } from "@sounds.of.limbo/tooltip"

import "styles/views/editor/components/elements/languages/item"

import { ILanguage } from "models/Resume/elements/Languages"
import InlineSelect from "components/Forms/Selects/Inline"
import { createOptions } from "utils/select"
import { languageProficiencies, languageProficienciesLabels } from "consts"
import ContentEditable from "components/ContentEditable"

export interface LanguageItemProps {
	model: ILanguage
	onRemove: () => void
}

export interface LanguageItemState {
	isHovered: boolean
}

@observer
export default
class LanguageItem
extends React.Component<LanguageItemProps, LanguageItemState> {
	state
		: LanguageItemState
		= {
			isHovered: false
		}

	hover = () => {
		this.setState({
			isHovered: true,
		})
	}

	unhover = () => {
		this.setState({
			isHovered: false,
		})
	}

	render() {
		const { model } = this.props
		const { isHovered } = this.state
		return <>
			<div
				className="c-language-item"
				onMouseEnter={this.hover}
				onMouseLeave={this.unhover}
			>
				<Tooltip
					element="i"
					elementProps={{
						className: `fas fa-${isHovered ? "trash-alt" : "globe"}`,
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