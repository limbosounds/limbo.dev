import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/elements/tile"
import { ITileElement } from "models/Resume/elements/Tile"
import ElementHeader from "../Header"
import ElementWrapper from "../Wrapper"
import TileElementItem from "./Item"
import TileElementAdd from "./Add"
import { cast } from "mobx-state-tree"

export interface TileElementProps {
	model: ITileElement
	onRemove: () => void
}

export interface TileElementState {

}

@observer
export default
class TileElement
extends React.Component<TileElementProps, TileElementState> {
	render() {
		const { model } = this.props
		const creator = () => model.add(cast({ value: "" }))
		
		return <>
			<ElementWrapper
				info="Tile element"
				onRemove={this.props.onRemove}
			>
				<div className="c-tile-element">
					<ElementHeader
						model={model.title}
					/>
					<div className="te-list">
						{model.items.map((item, i) => {
							return <TileElementItem
								key={i}
								model={item}
								creator={creator}
								onRemove={() => model.remove(item)}
							/>
						})}
						<TileElementAdd
							onClick={creator}
						/>
					</div>
				</div>
			</ElementWrapper>
		</>
	}
}