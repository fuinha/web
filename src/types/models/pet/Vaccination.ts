import { AsInterface } from '#types/util'

export interface IVaccination {
	name: string
	date: Date
	expirationDate: Date
}

export class Vaccination implements IVaccination, AsInterface<IVaccination> {
	name: string

	date: Date

	expirationDate: Date

	constructor(vacc: IVaccination) {
		Object.assign(this, vacc)
	}

	asInterface(): IVaccination {
		return this as Pick<this, keyof IVaccination>
	}
}
