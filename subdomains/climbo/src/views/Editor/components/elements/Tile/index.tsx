import React from "react"
import { cast } from "mobx-state-tree"
import { observer } from "mobx-react"

import "styles/views/editor/components/elements/tile"

import { ITileElement } from "models/Resume/elements/Tile"

import ElementHeader from "../Header"
import ElementWrapper from "../Wrapper"
import TileElementItem from "./Item"
import AddButton from "components/Buttons/Add"
import { DefaultElementProps } from "typings/Resume"
import OrderableComponent from "components/Orderable"

export interface TileElementProps
extends DefaultElementProps<ITileElement> {
	
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
					<div className={`te-list ${model.list.isDragged ? "__dragging" : ""}`}>
						{model.list.items.map((item, index) => {
							return <OrderableComponent
								key={item.id}
								id={item.id}
								index={index}
								model={model.list}
							>
								<TileElementItem
									model={item.data}
									creator={creator}
									onRemove={() => model.remove(item)}
								/>
							</OrderableComponent>
						})}
						<AddButton
							compact
							size="small"
							tooltip="Add item"
							className="__no-print"
							onClick={creator}
						/>
					</div>
				</div>
			</ElementWrapper>
		</>
	}
}