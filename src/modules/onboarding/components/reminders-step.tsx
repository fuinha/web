import React, { useState } from 'react'
import Head from 'next/head'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { AddIcon, ChevronRightIcon } from '@chakra-ui/icons'
import DatePicker from 'react-datepicker'
import { Formik, Form, Field } from 'formik'

import * as Yup from 'yup'
import OnboardingContainer from './onboarding-container'
import OnboardingInput from './onboarding-input'
import OnboardingSelect from './onboarding-select'
import BaseButton from '#components/base-button'
import UnifiedErrorMessage from '#components/unified-error-message'

import useOnboarding from '../hooks/index'
import { onboardingActions } from '../reducers/index'
import { IReminder } from '#types/models/pet/Reminder'

import 'react-datepicker/dist/react-datepicker.min.css'

const RemindersSchema = Yup.object().shape({
	name: Yup.string().label('Reminder name').required(),
	date: Yup.date().nullable().label('Reminder begin date').required(),
	frequency: Yup.string().label('Reminder frequency').required(),
	notificationMethod: Yup.string()
		.label('Reminder notification method')
		.required(),
	time: Yup.string().label('Reminder Time').required(),
})

type RemindersStepProps = {
	index: number
}

const RemindersStep: React.FC<RemindersStepProps> = ({ index }) => {
	const [state, dispatch] = useOnboarding()
	const [isAddingReminders, setIsAddingReminders] = useState(false)

	return (
		<>
			<Head>
				<title>PetCode - Reminders</title>
			</Head>
			<Formik
				initialValues={
					state.reminders[index] ?? {
						name: '',
						date: null,
						frequency: '' as IReminder['frequency'],
						notificationMethod: '' as IReminder['notificationMethod'],
						time: '',
						enabled: true,
					}
				}
				validationSchema={RemindersSchema}
				onSubmit={(reminder) => {
					dispatch(
						onboardingActions.setReminderAtIndex({
							index,
							reminder,
						})
					)
					dispatch(
						onboardingActions.setStep(
							isAddingReminders ? `reminders-${index + 1}` : 'complete'
						)
					)
				}}>
				{({ errors, touched, handleSubmit, values, setFieldValue }) => (
					<OnboardingContainer>
						<Box flexGrow={1} />
						<Flex direction="column">
							<Text fontWeight="bold" fontSize="2.5rem">
								Health Information:
							</Text>
							<Text
								fontWeight="bold"
								fontSize="2.5rem"
								color="petcode.blue.400">
								Reminders
							</Text>
							<Text fontSize="lg" color="petcode.neutral.600">
								If you’d like to set up reminders for your pet’s health needs,
								you can customize reminders here!
							</Text>
						</Flex>
						<Text
							fontSize="lg"
							fontWeight="semibold"
							color="petcode.neutral.600">
							Reminder #{index + 1}
						</Text>
						<Form>
							<Stack spacing={6}>
								<Field
									as={OnboardingInput}
									name="name"
									placeholder="Reminder Name"
								/>
								<Stack isInline spacing={6}>
									<Box flexBasis="50%">
										<DatePicker
											selected={values.date}
											showPopperArrow={false}
											onChange={(date) => setFieldValue('date', date)}
											placeholderText="Reminder Date"
											customInput={<OnboardingInput />}
										/>
									</Box>
									<Box flexBasis="50%">
										<Field
											as={OnboardingInput}
											type="time"
											name="time"
											placeholder="Reminder Time"
										/>
									</Box>
								</Stack>
								<OnboardingSelect
									options={['Weekly', 'Daily', 'Hourly'].map((option) => ({
										label: option,
										value: option.toLowerCase(),
									}))}
									value={
										values.frequency
											? {
													label: values.frequency
														.charAt(0)
														.toUpperCase()
														.concat(values.frequency.slice(1)),
													value: values.frequency,
											  }
											: null
									}
									onChange={(newValue: any) => {
										setFieldValue('frequency', newValue.value.toLowerCase())
									}}
									placeholder="Reminder Frequency"
									fontSize="lg"
								/>
								<OnboardingSelect
									options={['Email', 'Notification'].map((option) => ({
										label: option,
										value: option.toLowerCase(),
									}))}
									value={
										values.notificationMethod
											? {
													label: values.notificationMethod
														.charAt(0)
														.toUpperCase()
														.concat(values.notificationMethod.slice(1)),
													value: values.notificationMethod,
											  }
											: null
									}
									onChange={(newValue: any) => {
										setFieldValue('notificationMethod', newValue.value)
									}}
									placeholder="Reminder Notification Method"
									fontSize="lg"
								/>
								<UnifiedErrorMessage touched={touched} errors={errors} />
								<Stack isInline justifyContent="flex-end" spacing={3}>
									<BaseButton
										colorScheme="petcode.yellow"
										onClick={(e) => {
											setIsAddingReminders(true)
											handleSubmit(e as any)
										}}>
										<Text textTransform="uppercase" letterSpacing="0.07em">
											Add Reminder
										</Text>
										<AddIcon boxSize="14px" marginLeft={2} />
									</BaseButton>
									<BaseButton
										colorScheme="petcode.blue"
										onClick={() => {
											dispatch(onboardingActions.setStep('complete'))
										}}>
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

export default RemindersStep
