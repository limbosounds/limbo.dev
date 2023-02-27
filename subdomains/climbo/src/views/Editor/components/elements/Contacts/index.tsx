import React from "react"
import { observer } from "mobx-react"

import "styles/views/editor/components/elements/contacts"

import { DefaultElementProps } from "typings/Resume"

import { IContactsElement } from "models/Resume/elements/Contacts"

import ElementWrapper from "../Wrapper"
import ElementHeader from "../Header"
import ContactItem from "./Item"
import AddButton from "components/Buttons/Add"
import InlineSelect from "components/Forms/Selects/Inline"
import { cast } from "mobx-state-tree"

export interface ContactsElementProps
extends DefaultElementProps<IContactsElement> {

}

export interface ContactsElementState {

}

@observer
export default
class ContactsElement
extends React.Component<ContactsElementProps, ContactsElementState> {
	render() {
		const { model } = this.props
		return <>
			<ElementWrapper
				info="Contacts element"
				onRemove={this.props.onRemove}
			>
				<div className="c-contacts-element">
					<ElementHeader
						model={model.title}
					/>
					<div className="ce-list">
						{model.items.map((item, i) => {
							return <ContactItem
								key={i}
								model={item}
								onRemove={() => model.remove(item)}
							/>
						})}
					</div>
					<InlineSelect
						options={model.availableContactTypes.map(value => {
							return { label: value, value }
						})}
						selected={undefined as any}
						onSelect={value => model.add(cast({
							type: value,
							value: value,
						}))}
					>
						{() => (
							<AddButton
								compact
								size="small"
								className="__no-print"
								tooltip="Add language"
								// onClick={() => model.add(cast({
								// 	language: { value: "Language" },
								// }))}
							/>
						)}
					</InlineSelect>
				</div>
			</ElementWrapper>
		</>
	}
}