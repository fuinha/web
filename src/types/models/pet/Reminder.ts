import { AsInterface } from '#types/util'
type ReminderFrequency = 'weekly' | 'daily' | 'hourly'
type ReminderNotificationMethod = 'email' | 'notification'

export interface IReminder {
	date: Date
	enabled: boolean
	frequency: ReminderFrequency
	notificationMethod: ReminderNotificationMethod
	time: string
}

export class Reminder implements IReminder, AsInterface<IReminder> {
	date: Date

	enabled: boolean

	frequency: ReminderFrequency

	notificationMethod: ReminderNotificationMethod

	time: string

	constructor(reminder: IReminder) {
		Object.assign(this, reminder)
	}

	public toggle(): boolean {
		this.enabled = !this.enabled
		return this.enabled
	}

	public asInterface() {
		return {
			...this,
			frequency: this.frequency as string,
			notificationMethod: this.notificationMethod as string,
		} as IReminder
	}
}
