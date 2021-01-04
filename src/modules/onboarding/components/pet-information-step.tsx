import React from 'react'
import Head from 'next/head'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import DatePicker from 'react-datepicker'
import { Formik, Form, Field } from 'formik'

import * as Yup from 'yup'
import OnboardingContainer from './onboarding-container'
import OnboardingInput from './onboarding-input'
import OnboardingSelect, { OnboardingCreatable } from './onboarding-select'
import BaseButton from '#components/base-button'
import UnifiedErrorMessage from '#components/unified-error-message'

import useOnboarding from '../hooks/index'
import { onboardingActions } from '../reducers/index'

import { DOG_BREEDS, CAT_BREEDS } from '#data/breeds'

import 'react-datepicker/dist/react-datepicker.min.css'

const PetInformationSchema = Yup.object().shape({
	name: Yup.string().label('Pet name').required(),
	species: Yup.string().label('Species').required(),
	breed: Yup.string().label('Breed').required(),
	birthdate: Yup.date()
		.nullable()
		.label('Birthday')
		.test(
			'Date is in the past',
			"Your pet's birthday must be in the past",
			function (value) {
				if (value === null) return false
				return (value as Date) < new Date()
			}
		)
		.required(),
	color: Yup.string().label('Color').required(),
	temperament: Yup.string().label('Temperament').required(),
	isServiceAnimal: Yup.boolean().nullable().label('Service Animal').required(),
})

const PetInformationStep: React.FC = () => {
	const [state, dispatch] = useOnboarding()

	return (
		<>
			<Head>
				<title>PetCode - Pet Information</title>
			</Head>
			<Formik
				initialValues={state.petInfo}
				validationSchema={PetInformationSchema}
				onSubmit={(values) => {
					dispatch(onboardingActions.setPetInformation(values))
					dispatch(onboardingActions.setStep('primary-owner-information'))
				}}>
				{({ errors, touched, handleSubmit, setFieldValue, values }) => {
					let breedOptions: string[] = []
					if (values.species === 'Dog') breedOptions = DOG_BREEDS
					else if (values.species === 'Cat') breedOptions = CAT_BREEDS

					return (
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
									Pet Information
								</Text>
								<Text fontSize="lg" color="petcode.neutral.600">
									Connect your tag to your pet’s information
								</Text>
							</Flex>
							<Form>
								<Stack spacing={6}>
									<Field
										as={OnboardingInput}
										name="name"
										placeholder="Pet Name"
									/>
									<Stack isInline spacing={6}>
										<Box flexBasis="50%">
											<OnboardingSelect
												options={['Dog', 'Cat', 'Other'].map((option) => ({
													label: option,
													value: option,
												}))}
												value={
													values.species
														? {
																label: values.species,
																value: values.species,
														  }
														: null
												}
												onChange={(newValue: any) => {
													setFieldValue('species', newValue.value)
													setFieldValue('breed', '')
												}}
												placeholder="Species"
												fontSize="lg"
											/>
										</Box>
										<Box flexBasis="50%">
											<OnboardingCreatable
												options={breedOptions.map((breedOption) => ({
													label: breedOption,
													value: breedOption,
												}))}
												value={
													values.breed
														? {
																label: values.breed,
																value: values.breed,
														  }
														: null
												}
												onChange={(newValue: any) =>
													setFieldValue('breed', newValue.value)
												}
												placeholder="Breed"
												fontSize="lg"
											/>
										</Box>
									</Stack>
									<Stack isInline spacing={6}>
										<Box flexBasis="50%">
											<DatePicker
												selected={values.birthdate}
												showPopperArrow={false}
												onChange={(date) => setFieldValue('birthdate', date)}
												placeholderText="Birthday"
												customInput={<OnboardingInput />}
											/>
										</Box>
										<Box flexBasis="50%">
											<Field
												as={OnboardingInput}
												name="color"
												placeholder="Color"
											/>
										</Box>
									</Stack>
									<Field
										as={OnboardingInput}
										name="temperament"
										placeholder="Temperament"
									/>
									<OnboardingSelect
										options={['Yes', 'No'].map((option) => ({
											label: option,
											value: option,
										}))}
										value={
											values.isServiceAnimal != null
												? {
														label: values.isServiceAnimal ? 'Yes' : 'No',
														value: values.isServiceAnimal ? 'Yes' : 'No',
												  }
												: null
										}
										onChange={(newValue: any) =>
											setFieldValue('isServiceAnimal', newValue.value === 'Yes')
										}
										placeholder="Service Animal"
										fontSize="lg"
									/>
									<UnifiedErrorMessage touched={touched} errors={errors} />
									<BaseButton
										alignSelf="end"
										type="submit"
										colorScheme="petcode.blue"
										onClick={handleSubmit as any}>
										<Text textTransform="uppercase" letterSpacing="0.07em">
											Next Step
										</Text>
										<ChevronRightIcon boxSize="24px" />
									</BaseButton>
								</Stack>
							</Form>
							<Box flexGrow={1} />
						</OnboardingContainer>
					)
				}}
			</Formik>
		</>
	)
}

export default PetInformationStep
