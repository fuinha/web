import { IUser } from '#types/models/user'
import { IPet } from '#types/models/pet'

export const user: IUser = {
	fullName: 'Cameron Wilson',
	pets: [],
}

export const pet: IPet = {
	name: 'Milo',
	contacts: [
		{
			level: 'primary',
			name: {
				value: 'Cameron Wilson',
				visible: true,
			},
			address: {
				value: '123 Main Street, New York, NY 10030',
				visible: true,
			},
			phoneNumber: {
				value: '(555) 123 4567',
				visible: true,
			},
			email: {
				value: 'cameronwilson@gmail.com',
				visible: true,
			},
		},
		{
			level: 'secondary',
			name: {
				value: 'Aditya Patel',
				visible: true,
			},
			address: {
				value: '123 Main Street, New York, NY 10030',
				visible: true,
			},
			phoneNumber: {
				value: '(555) 765 4321',
				visible: true,
			},
			email: {
				value: 'adityapatel@gmail.com',
				visible: true,
			},
		},
	],
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
