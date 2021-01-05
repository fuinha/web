import { IUser } from '#types/models/user'
import { IPet } from '#types/models/pet'

export const user: IUser = {
	fullName: 'Cameron Wilson',
	pets: [],
}

export const pet: IPet = {
	name: 'Milo',
	contacts: [],
	reminders: [],
	vaccinations: [],
	isLost: false,
	isServiceAnimal: false,
	breed: 'Weimaraner',
	species: 'Dog',
	allergies: {
		value: '',
		visible: true,
	},
	specialNeeds: {
		value: '',
		visible: true,
	},
	temperament: 'Friendly',
	color: 'Gray',
	birthdate: new Date('2010-01-01'),
	vet: {
		name: {
			value: '',
			visible: true,
		},
		phoneNumber: {
			value: '',
			visible: true,
		},
	},
}
