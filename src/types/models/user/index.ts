import firebaseAdmin from '#fire/admin'
import { AsInterface } from '#types/util/'
import firebase from '#fire/client'

export interface IUser {
	fullName: string
	pets: Array<string>
}

export class User implements IUser, AsInterface<IUser> {
	id: string

	fullName: string

	pets: string[]

	constructor(id: string, user: IUser) {
		Object.assign(this, { ...user, id })
	}

	asInterface(): IUser {
		return this as Pick<this, keyof IUser>
	}

	public static async get(id: string): Promise<User> {
		return firebaseAdmin
			.firestore()
			.collection('users')
			.doc(id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					return new User(id, doc.data() as IUser)
				}
				throw new Error(`Could not find user with ID [${id}].`)
			})
	}

	async getClient(id: string): Promise<User> {
		return firebase
			.firestore()
			.collection('users')
			.doc(id)
			.get()
			.then((doc) => {
				if (doc.exists) {
					return new User(id, doc.data() as IUser)
				}
				throw new Error(`Could not find user with ID [${id}].`)
			})
	}
}
