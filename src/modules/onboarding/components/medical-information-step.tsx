import React from 'react'
import Head from 'next/head'
import { Box, Flex, Text, Stack } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Formik, Form, Field } from 'formik'

import * as Yup from 'yup'
import OnboardingContainer from './onboarding-container'
import OnboardingInput from './onboarding-input'
import BaseButton from '#components/base-button'
import UnifiedErrorMessage from '#components/unified-error-message'

import useOnboarding from '../hooks/index'
import { onboardingActions } from '../reducers/index'

import 'yup-phone'

const MedicalInformationSchema = Yup.object().shape({
	allergies: Yup.string().label('Allergies'),
	specialNeeds: Yup.string().label('Special Needs'),
	vetName: Yup.string().label('Veterinarian Name'),
	vetPhoneNumber: Yup.lazy((value) =>
		!value
			? Yup.string()
			: Yup.string().label('Veterinarian Phone Number').phone('US', true)
	),
})

const MedicalInformationStep: React.FC = () => {
	const [state, dispatch] = useOnboarding()

	return (
		<>
			<Head>
				<title>PetCode - Connect Your Tag</title>
			</Head>
			<Formik
				initialValues={state.medicalInfo}
				validationSchema={MedicalInformationSchema}
				onSubmit={(values) => {
					dispatch(onboardingActions.setMedicalInformation(values))
					dispatch(onboardingActions.setStep('vaccination-history'))
				}}>
				{({ errors, touched, handleSubmit }) => (
					<OnboardingContainer>
						<Box flexGrow={1} />
						<Flex direction="column">
							<Text fontWeight="bold" fontSize="2.5rem">
								Setting Up Your Tag:
							</Text>
							<Text
								fontWeight="bold"
								fontSize="2.5rem"
								color="petcode.blue.400">
								Medical Information
							</Text>
							<Text fontSize="lg" color="petcode.neutral.600">
								If your pet has any allergies or special needs, input them here
								to sync them with your QR tag
							</Text>
						</Flex>
						<Form>
							<Stack spacing={6}>
								<Field
									as={OnboardingInput}
									name="allergies"
									placeholder="Allergies"
								/>
								<Field
									as={OnboardingInput}
									name="specialNeeds"
									placeholder="Special Needs"
								/>
								<Field
									as={OnboardingInput}
									name="vetName"
									placeholder="Vet Name"
								/>
								<Field
									as={OnboardingInput}
									name="vetPhoneNumber"
									placeholder="Vet Phone Number"
								/>
								<UnifiedErrorMessage touched={touched} errors={errors} />
								<Stack isInline justifyContent="flex-end" spacing={3}>
									<BaseButton
										type="submit"
										colorScheme="petcode.blue"
										onClick={handleSubmit as any}>
										<Text textTransform="uppercase" letterSpacing="0.07em">
											Skip
										</Text>
										<ChevronRightIcon boxSize="24px" />
									</BaseButton>
									<BaseButton
										type="submit"
										colorScheme="petcode.blue"
										onClick={handleSubmit as any}>
										<Text textTransform="uppercase" letterSpacing="0.07em">
											Next Step
										</Text>
										<ChevronRightIcon boxSize="24px" />
									</BaseButton>
								</Stack>
							</Stack>
						</Form>
						<Box flexGrow={1} />
					</OnboardingContainer>
				)}
			</Formik>
		</>
	)
}

export default MedicalInformationStep
