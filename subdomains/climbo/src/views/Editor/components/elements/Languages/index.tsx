import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/elements/languages"

import { ILanguagesElement } from "models/Resume/elements/Languages"
import ElementWrapper from "../Wrapper"
import ElementHeader from "../Header"
import LanguageItem from "./Item"
import AddButton from "components/Buttons/Add"
import { cast } from "mobx-state-tree"
import { DefaultElementProps } from "typings/Resume"

export interface LanguagesElementProps
extends DefaultElementProps<ILanguagesElement> {
	
}

export interface LanguagesElementState {
	
}

@observer
export default
class LanguagesElement
extends React.Component<LanguagesElementProps, LanguagesElementState> {
	render() {
		const { model } = this.props
		return <>
			<ElementWrapper
				info="Languages element"
				onRemove={this.props.onRemove}
			>
				<div className="c-languages-element">
					<ElementHeader
						model={model.title}
					/>
					<div className="le-list">
						{model.items.map((item, i) => {
							return <LanguageItem
								key={i}
								model={item}
								onRemove={() => model.remove(item)}
							/>
						})}
					</div>
					<AddButton
						compact
						size="small"
						className="__no-print"
						tooltip="Add language"
						onClick={() => model.add(cast({
							language: { value: "Language" },
						}))}
					/>
				</div>
			</ElementWrapper>
		</>
	}
}