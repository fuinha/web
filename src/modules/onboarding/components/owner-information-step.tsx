import React, { useState } from 'react'
import Head from 'next/head'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { AddIcon, ChevronRightIcon } from '@chakra-ui/icons'

import * as Yup from 'yup'
import OnboardingContainer from './onboarding-container'
import OnboardingInput from './onboarding-input'
import BaseButton from '#components/base-button'
import UnifiedErrorMessage from '#components/unified-error-message'

import useOnboarding from '../hooks/index'
import { onboardingActions } from '../reducers/index'

import 'yup-phone'

const OwnerInformationSchema = Yup.object().shape({
	name: Yup.string().label('Full name').required(),
	email: Yup.string().label('Email address').email().required(),
	phoneNumber: Yup.string().label('Phone number').phone('US', true).required(),
	address: Yup.string().label('Address').required(),
})

type OwnerInformationStepProps = {
	level: 'primary' | 'secondary'
}

const OwnerInformationStep: React.FC<OwnerInformationStepProps> = ({
	level,
}) => {
	const [state, dispatch] = useOnboarding()
	const [isAddingSecondaryOwner, setIsAddingSecondaryOwner] = useState(false)

	const isPrimary = level === 'primary'
	const index = isPrimary ? 0 : 1

	return (
		<>
			<Head>
				<title>PetCode - Owner Information</title>
			</Head>
			<Formik
				initialValues={
					state.owners[index] ?? {
						name: '',
						address: '',
						phoneNumber: '',
						email: '',
						level: isPrimary ? 'primary' : 'secondary',
					}
				}
				validationSchema={OwnerInformationSchema}
				onSubmit={(owner) => {
					dispatch(
						onboardingActions.setOwnerAtIndex({
							index,
							owner,
						})
					)
					dispatch(
						onboardingActions.setStep(
							isAddingSecondaryOwner
								? 'secondary-owner-information'
								: 'medical-information'
						)
					)
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
								Owner Information
							</Text>
							<Text fontSize="lg" color="petcode.neutral.600">
								Connect your tag to your contact information. Click “Add owner”
								if you would like multiple points of contact.
							</Text>
						</Flex>
						<Form>
							<Stack spacing={6}>
								<Field
									as={OnboardingInput}
									name="name"
									autoComplete="name"
									placeholder={`Full Name - Owner #${index + 1}`}
								/>
								<Field
									as={OnboardingInput}
									name="phoneNumber"
									autoComplete="tel"
									placeholder={`Phone Number - Owner #${index + 1}`}
								/>
								<Field
									as={OnboardingInput}
									name="email"
									autoComplete="email"
									placeholder={`Email Address - Owner #${index + 1}`}
								/>
								<Field
									as={OnboardingInput}
									name="address"
									autoComplete="name"
									placeholder={`Address - Owner #${index + 1}`}
								/>
								<UnifiedErrorMessage touched={touched} errors={errors} />
								<Stack isInline justifyContent="flex-end" spacing={3}>
									{isPrimary && (
										<BaseButton
											colorScheme="petcode.yellow"
											onClick={(e) => {
												setIsAddingSecondaryOwner(true)
												handleSubmit(e as any)
											}}>
											<Text textTransform="uppercase" letterSpacing="0.07em">
												Add Owner
											</Text>
											<AddIcon boxSize="14px" marginLeft={2} />
										</BaseButton>
									)}
									<BaseButton
										type="submit"
										colorScheme="petcode.blue"
										onClick={(e) => {
											handleSubmit(e as any)
										}}>
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

export default OwnerInformationStep
