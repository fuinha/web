import { VisibleValue } from '#types/util/'

export interface IVet {
	phoneNumber: VisibleValue<string>
	name: VisibleValue<string>
}

export class Vet implements IVet {
	phoneNumber: VisibleValue<string>

	name: VisibleValue<string>

	constructor(vet: IVet) {
		Object.assign(this, vet)
	}
}
