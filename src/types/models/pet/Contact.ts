import { VisibleValue, AsInterface } from '#types/util'
type ContactLevel = 'primary' | 'secondary'

export interface IContact {
	address: VisibleValue<string>
	email: VisibleValue<string>
	level: ContactLevel
	name: VisibleValue<string>
	phoneNumber: VisibleValue<string>
}

export class Contact implements IContact, AsInterface<IContact> {
	address: VisibleValue<string>

	email: VisibleValue<string>

	level: ContactLevel

	name: VisibleValue<string>

	phoneNumber: VisibleValue<string>

	constructor(contact: IContact) {
		Object.assign(this, contact)
	}

	public asInterface(): IContact {
		return {
			...this,
			level: this.level as string,
		} as IContact
	}
}
