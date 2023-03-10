import React from "react"
import { observer } from "mobx-react"

import "styles/components/orderable"

import { IOrderableArray } from "models/Resume/components/SortableArray"

export interface OrderableComponentProps {
	id: string
	index: number
	model: IOrderableArray<any>
	children?: React.ReactNode
}

export interface OrderableComponentState {
	
}

@observer
export default
class OrderableComponent
extends React.Component<OrderableComponentProps, OrderableComponentState> {
	handleDragStart = (
		event: React.DragEvent<HTMLElement>
	) => {
		this.props.model.setDragged(true)
		event.currentTarget.classList.add("__dragged")
	}

	handleDragEnd = (
		event: React.DragEvent<HTMLElement>
	) => {
		this.props.model.reorder(this.props.id)
		event.currentTarget.classList.remove("__dragged")
	}

	handleDragEnter = (
		_event: React.DragEvent<HTMLElement>
	) => {
		if (!this.props.model.isDragged)
			return

		this.props.model.setDropTo(this.props.index)
	}

	handleDragLeave = (
		_event: React.DragEvent<HTMLElement>
	) => {
		if (!this.props.model.isDragged || !_event.nativeEvent.relatedTarget)
			return

		this.props.model.setDropTo()
	}

	render() {
		const isDragOver = this.props.index === this.props.model.dropTo
		return <>
			<div
				draggable
				className={`c-orderable ${isDragOver ? "__drag-over" : ""}`}
				onDragStart={this.handleDragStart}
				onDragEnd={this.handleDragEnd}
				onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave}
			>
				{this.props.children}
			</div>
		</>
	}
}