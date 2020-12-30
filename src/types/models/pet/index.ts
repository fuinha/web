import { Reminder, IReminder } from './Reminder'
import { IContact, Contact } from './Contact'
import { IVet, Vet } from './Vet'
import { VisibleValue, AsInterface } from '#types/util/'
import firebase from '#fire/client'
import { IVaccination, Vaccination } from './Vaccination'
import firebaseAdmin from '#fire/admin'

export interface IPet {
	contacts: Array<IContact>
	reminders: Array<IReminder>
	species: string
	vet: IVet
	specialNeeds: VisibleValue<string>
	temperament: string
	name: string
	isLost: boolean
	isServiceAnimal: boolean
	color: string
	breed: string
	birthdate: Date
	allergies: VisibleValue<string>
	vaccinations: Array<IVaccination>
}

export class Pet implements IPet, AsInterface<IPet> {
	id: string

	contacts: Contact[]

	reminders: Reminder[]

	species: string

	vet: Vet

	specialNeeds: VisibleValue<string>

	temperament: string

	name: string

	isLost: boolean

	isServiceAnimal: boolean

	color: string

	breed: string

	birthdate: Date

	allergies: VisibleValue<string>

	vaccinations: Array<Vaccination>

	constructor(id: string, _pet: IPet) {
		let pet: IPet

		Object.assign(pet, _pet)

		pet.vet = new Vet(pet.vet)
		pet.contacts = pet.contacts.map((x) => new Contact(x))
		pet.reminders = pet.reminders.map((x) => new Reminder(x))

		Object.assign(this, { ...pet, id })
	}

	asInterface(): IPet {
		return {
			...this,
			contacts: this.contacts.map((x) => x.asInterface()),
			reminders: this.reminders.map((x) => x.asInterface()),
			vaccinations: this.vaccinations.map((x) => x.asInterface()),
		} as Pick<this, keyof IPet>
	}

	public async syncFirebaseValue(): Promise<Pet> {
		const ref = firebase.firestore().collection('pets').doc(this.id)

		return ref.update(this.asInterface()).then(() => this)
	}

	public async syncFirebaseKey(key: keyof Pet): Promise<Pet> {
		const ref = firebase.firestore().collection('pets').doc(this.id)

		return ref.update({ [key]: this[key] }).then(() => this)
	}

	public static async get(id: string): Promise<Pet> {
		return firebaseAdmin
			.firestore()
			.doc(id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					return new Pet(id, doc.data() as IPet)
				}
				throw new Error(`Could not find user with ID [${id}].`)
			})
	}

	async getClient(id: string): Promise<Pet> {
		return firebase
			.firestore()
			.doc(id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					return new Pet(id, doc.data() as IPet)
				}
				throw new Error(`Could not find user with ID [${id}].`)
			})
	}
}
