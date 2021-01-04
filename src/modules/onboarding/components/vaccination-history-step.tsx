import React, { useState } from 'react'
import Head from 'next/head'
import { Box, Flex, IconButton, Stack, Text, useToast } from '@chakra-ui/react'
import { AddIcon, ChevronRightIcon, DeleteIcon } from '@chakra-ui/icons'
import DatePicker from 'react-datepicker'
import Dropzone from 'react-dropzone'
import { Formik, Field } from 'formik'
import { motion } from 'framer-motion'

import * as Yup from 'yup'
import OnboardingContainer from './onboarding-container'
import OnboardingInput from './onboarding-input'
import BaseButton from '#components/base-button'
import UnifiedErrorMessage from '#components/unified-error-message'

import useOnboarding from '../hooks/index'
import { onboardingActions } from '../reducers/index'

import 'react-datepicker/dist/react-datepicker.min.css'

const VaccinationHistorySchema = Yup.object().shape({
	name: Yup.string().label('Vaccination name').required(),
	date: Yup.date().nullable().label('Date of vaccination').required(),
	expirationDate: Yup.date()
		.nullable()
		.label('Vaccination expiration date')
		.test(
			'Expiration date is later',
			'The vaccination expiration date must be later than the date of vaccation',
			function (value) {
				if (this.parent.date === null || value === null) return false
				return (value as Date) > this.parent.date
			}
		)
		.required(),
})

const MotionStack = motion.custom(Stack)

type VaccinationHistoryStepProps = {
	index: number
}

const VaccinationHistoryStep: React.FC<VaccinationHistoryStepProps> = ({
	index,
}) => {
	const [state, dispatch] = useOnboarding()
	const [isAddingVaccinations, setIsAddingVaccinations] = useState(false)

	// TODO: control and upload vaccination files
	const [files, setFiles] = useState([])

	const toast = useToast()

	return (
		<>
			<Head>
				<title>PetCode - Vaccination History</title>
			</Head>
			<Formik
				initialValues={
					state.vaccinations[index] ?? {
						name: '',
						date: null,
						expirationDate: null,
					}
				}
				validationSchema={VaccinationHistorySchema}
				onSubmit={(vaccination) => {
					dispatch(
						onboardingActions.setVaccinationAtIndex({
							index,
							vaccination,
						})
					)
					dispatch(
						onboardingActions.setStep(
							isAddingVaccinations
								? `vaccination-history-${index + 1}`
								: 'reminders'
						)
					)
				}}>
				{({
					errors,
					touched,
					handleSubmit,
					values: formValues,
					setFieldValue,
				}) => (
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
								Vaccination History
							</Text>
							<Text fontSize="lg" color="petcode.neutral.600">
								Add all your pet’s vaccinations here to connect with your QR
								tag. You can add multiple vaccinations by clicking “Add
								vaccination”.
							</Text>
						</Flex>
						<Field
							as={OnboardingInput}
							name="name"
							placeholder="Vaccination Name"
						/>
						<DatePicker
							selected={formValues.date}
							showPopperArrow={false}
							onChange={(date) => setFieldValue('date', date)}
							placeholderText="Date of Vaccination"
							customInput={<OnboardingInput />}
						/>
						<DatePicker
							selected={formValues.expirationDate}
							showPopperArrow={false}
							onChange={(date) => setFieldValue('expirationDate', date)}
							placeholderText="Vaccination Expiration Date"
							customInput={<OnboardingInput />}
						/>
						<Dropzone
							onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
							maxFiles={1}
							accept="image/*, application/pdf"
							onDropRejected={() =>
								toast({
									title: 'File error.',
									description:
										'You can only upload one PDF or image per vaccination.',
									status: 'error',
									duration: 5000,
									isClosable: true,
								})
							}>
							{({ getRootProps, getInputProps }) => (
								<Flex
									height={100}
									border="2px dashed"
									borderColor="petcode.neutral.500"
									_focus={{ borderColor: 'petcode.blue.400' }}
									rounded="md"
									alignItems="center"
									justifyContent="center"
									{...getRootProps()}>
									<input {...getInputProps()} />
									<Text>Upload your vaccination record here</Text>
								</Flex>
							)}
						</Dropzone>
						<Stack>
							{files.map((file, idx) => (
								<MotionStack
									key={file.name}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									isInline
									alignItems="center"
									fontSize="lg"
									backgroundColor="petcode.neutral.200"
									paddingX={4}
									paddingY={2}
									rounded="md">
									<Text color="petcode.blue.400">{file.name}</Text>
									<Box flexGrow={1} />
									<Text>{file.size} B</Text>
									<IconButton
										aria-label="Delete"
										onClick={() =>
											setFieldValue(
												'files',
												files
													.slice(0, idx)
													.concat(files.slice(idx + 1, files.length))
											)
										}
										colorScheme="red"
										icon={<DeleteIcon />}
										size="sm"
									/>
								</MotionStack>
							))}
						</Stack>
						<UnifiedErrorMessage touched={touched} errors={errors} />
						<Stack isInline justifyContent="flex-end" spacing={3}>
							<BaseButton
								colorScheme="petcode.yellow"
								onClick={(e) => {
									setIsAddingVaccinations(true)
									handleSubmit(e as any)
								}}>
								<Text textTransform="uppercase" letterSpacing="0.07em">
									Add Vaccination
								</Text>
								<AddIcon boxSize="14px" marginLeft={2} />
							</BaseButton>
							<BaseButton
								colorScheme="petcode.blue"
								onClick={() => {
									dispatch(onboardingActions.setStep('reminders'))
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
						<Box flexGrow={1} />
					</OnboardingContainer>
				)}
			</Formik>
		</>
	)
}

export default VaccinationHistoryStep
