import React from "react"
import { observer } from "mobx-react"

import "styles/views/__playground"

import SimpleInput from "components/Forms/Inputs/Simple"
import { EditableStringModel } from "models/Resume/components/EditableString"
import ElementHeader from "views/Editor/components/elements/Header"

export interface PlaygroundProps {

}

export interface PlaygroundState {

}

@observer
export default
class Playground
extends React.Component<PlaygroundProps, PlaygroundState> {
	store = EditableStringModel.create({
		value: "Kappa header"
	})

	render() {
		return <>
			<main className="v-playground">
				<div className="u-paper">
					<SimpleInput
						placeholder="Kappa placeholder"
					/>
					<ElementHeader
						model={this.store}
					/>
				</div>

				
			</main>
		</>
	}
}