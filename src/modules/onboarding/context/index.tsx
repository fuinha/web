import React, { Dispatch, useEffect, useReducer } from 'react'
import onboardingReducer, {
	INITIAL_ONBOARDING_STATE,
	IOnboardingState,
} from '../reducers/index'

export const OnboardingContext = React.createContext<
	[
		ReturnType<typeof onboardingReducer>,
		Dispatch<{
			type: string
			[key: string]: any
		}>
	]
>(null)

export const deserializeOnboardingState = (
	serializedState: Record<string, any>
): IOnboardingState => {
	serializedState.petInfo.birthdate = new Date(
		serializedState.petInfo.birthdate
	)
	serializedState.vaccinations.forEach((vaccination) => {
		vaccination.date = new Date(vaccination.date)
		vaccination.expirationDate = new Date(vaccination.expirationDate)
	})
	serializedState.reminders.forEach((reminder) => {
		reminder.date = new Date(reminder.date)
	})
	return serializedState as IOnboardingState
}

const OnboardingProvider: React.FC = ({ children }) => {
	// try to use local storage state from unless they're not navigating to a specific step
	const shouldUsePersistedState =
		typeof window !== 'undefined' &&
		window.location.hash &&
		localStorage.getItem('onboarding')
	const [state, dispatch] = useReducer<typeof onboardingReducer>(
		onboardingReducer,
		shouldUsePersistedState
			? deserializeOnboardingState(
					JSON.parse(localStorage.getItem('onboarding'))
			  )
			: INITIAL_ONBOARDING_STATE
	)

	useEffect(() => {
		if (!window.location.hash) {
			localStorage.removeItem('onboarding')
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('onboarding', JSON.stringify(state))
	}, [state])

	return (
		<OnboardingContext.Provider value={[state, dispatch]}>
			{children}
		</OnboardingContext.Provider>
	)
}

export default OnboardingProvider
