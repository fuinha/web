import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex } from '@chakra-ui/react'

import OnboardingProvider from './context/index'
import useOnboarding from './hooks/index'
import { onboardingActions } from './reducers/index'

import OnboardingSidebar from './components/onboarding-sidebar'
import CreateYourAccountStep from './components/create-your-account-step'
import ConnectYourTagStep from './components/connect-your-tag-step'
import PetInformationStep from './components/pet-information-step'
import OwnerInformationStep from './components/owner-information-step'
import MedicalInformationStep from './components/medical-information-step'
import VaccinationHistoryStep from './components/vaccination-history-step'
import RemindersStep from './components/reminders-step'

const OnboardingStep: React.FC<{
	match: string | RegExp
	children: (match?: RegExpMatchArray) => React.ReactNode
}> = ({ match, children }) => {
	const [state] = useOnboarding()

	if (typeof match === 'string' && state.step === match) {
		return <>{children()}</>
	}
	if (match instanceof RegExp && match.test(state.step)) {
		return <>{children(state.step.match(match))}</>
	}

	return null
}

const Onboarding: React.FC = () => {
	const [state, dispatch] = useOnboarding()
	const router = useRouter()

	useEffect(() => {
		if (state.step === 'complete') {
			router.push('/onboarding/complete')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.step])

	useEffect(() => {
		// handle external hash changes (e.g. history navigation)
		const hashChangeHandler = () => {
			if (
				window.location.hash &&
				state.step !== window.location.hash.substr(1)
			) {
				dispatch(onboardingActions.setStep(window.location.hash.substr(1)))
			}
		}
		router.events.on('hashChangeComplete', hashChangeHandler)

		return () => router.events.off('hashChangeComplete', hashChangeHandler)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.step])

	useEffect(() => {
		// sync state w/ page hash
		router.push(`#${state.step}`, undefined, { shallow: true })

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.step])

	return (
		<Flex direction="row" minHeight="100vh">
			<OnboardingSidebar />
			<Box flexGrow={1} />
			<OnboardingStep match="create-your-account">
				{() => <CreateYourAccountStep />}
			</OnboardingStep>
			<OnboardingStep match="connect-your-tag">
				{() => <ConnectYourTagStep />}
			</OnboardingStep>
			<OnboardingStep match="pet-information">
				{() => <PetInformationStep />}
			</OnboardingStep>
			<OnboardingStep match={/^(primary|secondary)-owner-information$/}>
				{(match) => (
					<OwnerInformationStep
						key={match[1]}
						level={match[1] as 'primary' | 'secondary'}
					/>
				)}
			</OnboardingStep>
			<OnboardingStep match="medical-information">
				{() => <MedicalInformationStep />}
			</OnboardingStep>
			<OnboardingStep match={/^vaccination-history(?:-([0-9]))?$/}>
				{(match) => (
					<VaccinationHistoryStep
						key={match[1]}
						index={Number(match[1] ?? 0)}
					/>
				)}
			</OnboardingStep>
			<OnboardingStep match={/^reminders(?:-([0-9]))?$/}>
				{(match) => (
					<RemindersStep key={match[1]} index={Number(match[1] ?? 0)} />
				)}
			</OnboardingStep>
			<Box flexGrow={1} />
		</Flex>
	)
}

const OnboardingWithProvider: React.FC = () => (
	<OnboardingProvider>
		<Onboarding />
	</OnboardingProvider>
)

export default OnboardingWithProvider
