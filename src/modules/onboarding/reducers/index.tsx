import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IPet } from '#types/models/pet'
import { IVaccination } from '#types/models/pet/Vaccination'
import { IReminder } from '#types/models/pet/Reminder'

export interface IOnboardingState {
	step: string
	accountInfo: {
		fullName: string
		email: string
		phoneNumber: string
		password: string
		confirmPassword: string
	}
	tagInfo: {
		tagId: string
	}
	petInfo: Pick<
		IPet,
		| 'name'
		| 'species'
		| 'breed'
		| 'birthdate'
		| 'color'
		| 'temperament'
		| 'isServiceAnimal'
	>
	owners: {
		name: string
		email: string
		phoneNumber: string
		address: string
		level: string
	}[]
	medicalInfo: {
		vetName: string
		vetPhoneNumber: string
		allergies: string
		specialNeeds: string
	}
	vaccinations: IVaccination[]
	reminders: IReminder[]
}

export const INITIAL_ONBOARDING_STATE: IOnboardingState = {
	step: 'create-your-account',
	accountInfo: {
		fullName: '',
		email: '',
		phoneNumber: '',
		password: '',
		confirmPassword: '',
	},
	tagInfo: {
		tagId: '',
	},
	petInfo: {
		name: '',
		species: '',
		breed: '',
		birthdate: null,
		color: '',
		temperament: '',
		isServiceAnimal: null,
	},
	owners: [],
	medicalInfo: {
		vetName: '',
		vetPhoneNumber: '',
		allergies: '',
		specialNeeds: '',
	},
	vaccinations: [],
	reminders: [],
}

const onboardingSlice = createSlice({
	name: 'onboarding',
	initialState: INITIAL_ONBOARDING_STATE,
	reducers: {
		setStep: (state, action: PayloadAction<string>) => {
			state.step = action.payload
			return state
		},
		setAccountInformation: (
			state,
			action: PayloadAction<IOnboardingState['accountInfo']>
		) => {
			state.accountInfo = action.payload
			return state
		},
		setTagInformation: (
			state,
			action: PayloadAction<IOnboardingState['tagInfo']>
		) => {
			state.tagInfo = action.payload
			return state
		},
		setPetInformation: (
			state,
			action: PayloadAction<IOnboardingState['petInfo']>
		) => {
			state.petInfo = action.payload
			return state
		},
		setOwnerAtIndex: (
			state,
			action: PayloadAction<{
				index: number
				owner: IOnboardingState['owners'][number]
			}>
		) => {
			state.owners[action.payload.index] = action.payload.owner
			return state
		},
		setMedicalInformation: (
			state,
			action: PayloadAction<IOnboardingState['medicalInfo']>
		) => {
			state.medicalInfo = action.payload
			return state
		},
		setVaccinationAtIndex: (
			state,
			action: PayloadAction<{
				index: number
				vaccination: IVaccination
			}>
		) => {
			state.vaccinations[action.payload.index] = action.payload.vaccination
			return state
		},
		setReminderAtIndex: (
			state,
			action: PayloadAction<{
				index: number
				reminder: IReminder
			}>
		) => {
			state.reminders[action.payload.index] = action.payload.reminder
			return state
		},
	},
})

export const onboardingActions = onboardingSlice.actions
export default onboardingSlice.reducer
