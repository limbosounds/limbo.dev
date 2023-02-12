import React from "react"

export const isEventTargetNode = (
	eventTarget: EventTarget | null
): eventTarget is Node => {
	return eventTarget instanceof Node
}

export const isEventFiredInsideElement = (
	eventTarget: EventTarget | null,
	element: HTMLElement
) => {
	return eventTarget == element
		|| (isEventTargetNode(eventTarget) && element.contains(eventTarget))
}

export const createEscHandler = (
	handler: () => void
): (
	event: React.KeyboardEvent | KeyboardEvent
) => void => {
	return event => {
		if (event.key == "Escape")
			handler()
	}
}