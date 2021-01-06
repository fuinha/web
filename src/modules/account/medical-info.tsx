import React, { useState } from 'react'

import {
	Box,
	Flex,
	Icon,
	Modal,
	ModalOverlay,
	ModalCloseButton,
	ModalContent,
	ModalBody,
	ModalHeader,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import { Formik, Field, useFormikContext } from 'formik'
import { HiOutlinePencil, HiCheck, HiOutlinePlus } from 'react-icons/hi'

import * as Yup from 'yup'
import moment from 'moment'
import AccountPageTemplate from './components/account-page-template'
import BaseButton from '#components/base-button'
import ExpandButton from './components/expand-button'
import AccountInput from './components/account-input'
import InfoFieldWithVisibility from './components/info-field-with-visiblity'
import UnifiedErrorMessage from '#components/unified-error-message'

import { pet } from './data/mock'
import { IVaccination } from '#types/models/pet/Vaccination'

import 'yup-phone'

import 'react-datepicker/dist/react-datepicker.min.css'

const MedicalInformationSchema = Yup.object().shape({
	allergies: Yup.object().shape({
		value: Yup.string().label('Allergies').required(),
		visible: Yup.boolean(),
	}),
	specialNeeds: Yup.object().shape({
		value: Yup.string().label('Special Needs').required(),
		visible: Yup.boolean(),
	}),
	vet: Yup.object().shape({
		name: Yup.object().shape({
			value: Yup.string().label('Veterinarian Name').required(),
			visible: Yup.boolean(),
		}),
		phoneNumber: Yup.object().shape({
			value: Yup.string()
				.label('Veterinarian Phone Number')
				.phone('US', true)
				.required(),
			visible: Yup.boolean(),
		}),
	}),
})

const VaccinationSchema = Yup.object().shape({
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

type AddVaccinationModalProps = {
	isShown: boolean
	setShown: (b: boolean) => void
}

const AddVaccinationModal: React.FC<AddVaccinationModalProps> = ({
	isShown,
	setShown,
}) => {
	const toast = useToast()

	return (
		<Modal isOpen={isShown} onClose={() => setShown(false)} isCentered>
			<ModalOverlay />
			<ModalContent rounded="lg">
				<ModalHeader
					color="petcode.neutral.700"
					fontSize="3xl"
					fontWeight="normal">
					<Text>Add Vaccination</Text>
				</ModalHeader>
				<ModalCloseButton />
				<Formik
					initialValues={
						{
							name: '',
							date: null,
							expirationDate: null,
						} as IVaccination
					}
					validationSchema={VaccinationSchema}
					onSubmit={(values) => {
						// TODO: create new vaccination
						console.log('Creating ', values)
						setShown(false)
						toast({
							title: 'Vaccination added.',
							description: 'Your vaccination was added successfully.',
							status: 'success',
							duration: 5000,
							isClosable: true,
						})
					}}>
					{({ errors, values, setFieldValue, handleSubmit, touched }) => (
						<ModalBody>
							<Field
								variant="flushed"
								placeholder="Vaccination Name"
								as={AccountInput}
								name="name"
							/>
							<Text textStyle="info-field-label">Vaccination Name</Text>
							<DatePicker
								selected={values.date}
								showPopperArrow={false}
								onChange={(date) => setFieldValue('date', date)}
								placeholderText="Vaccination Date"
								customInput={<AccountInput variant="flushed" />}
							/>
							<Text textStyle="info-field-label">Vaccination Date</Text>
							<DatePicker
								selected={values.expirationDate}
								showPopperArrow={false}
								onChange={(date) => setFieldValue('expirationDate', date)}
								placeholderText="Vaccination Expiration Date"
								customInput={<AccountInput variant="flushed" />}
							/>
							<Text textStyle="info-field-label">
								Vaccination Expiration Date
							</Text>
							<UnifiedErrorMessage errors={errors} touched={touched} />
							<BaseButton
								colorScheme="petcode.blue"
								color="white"
								marginTop={3}
								onClick={handleSubmit as any}>
								<Text>Save</Text>
							</BaseButton>
						</ModalBody>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	)
}

type OverlaysProps = {
	isEditable: boolean
	setEditable: (a: boolean) => void
	setModalShown: (a: boolean) => void
}

const Overlays: React.FC<OverlaysProps> = ({
	isEditable,
	setEditable,
	setModalShown,
}) => {
	const { handleSubmit } = useFormikContext()

	return (
		<Stack
			alignItems="flex-end"
			spacing={2}
			position="fixed"
			bottom={5}
			right={5}
			color="petcode.neutral.700">
			<ExpandButton
				rounded="full"
				padding={4}
				backgroundColor="petcode.yellow.400"
				onClick={(e) => {
					if (isEditable) {
						handleSubmit(e as any)
					} else {
						setEditable(true)
					}
				}}
				expandChildren={
					<Text
						fontSize="xl"
						fontWeight="thin"
						textTransform="uppercase"
						marginRight={2}>
						{isEditable ? 'Save' : 'Edit'}
					</Text>
				}>
				<Icon as={isEditable ? HiCheck : HiOutlinePencil} boxSize="30px" />
			</ExpandButton>
			<ExpandButton
				rounded="full"
				padding={4}
				backgroundColor="petcode.yellow.400"
				onClick={() => setModalShown(true)}
				expandChildren={
					<Text
						fontSize="xl"
						fontWeight="thin"
						textTransform="uppercase"
						marginRight={2}>
						Add Vaccination
					</Text>
				}>
				<Icon as={HiOutlinePlus} boxSize="30px" />
			</ExpandButton>
		</Stack>
	)
}

const MedicalInfo = () => {
	const [isEditable, setEditable] = useState(false)
	const [isModalShown, setModalShown] = useState(false)

	const toast = useToast()

	return (
		<AccountPageTemplate>
			<Formik
				initialValues={pet}
				validationSchema={MedicalInformationSchema}
				onSubmit={(values) => {
					// TODO: save new values
					console.log('Saving: ', values)
					toast({
						title: 'Medical information saved.',
						description: 'Your medical information was saved successfully.',
						status: 'success',
						duration: 5000,
						isClosable: true,
					})
					setEditable(false)
				}}>
				{() => (
					<Stack
						position="relative"
						flexGrow={1}
						paddingX={10}
						spacing={5}
						zIndex={1}>
						<Flex direction="column" padding={6} layerStyle="card">
							<Flex
								direction="row"
								justifyContent="space-between"
								fontSize="2xl"
								marginBottom={3}>
								<Text color="petcode.neutral.700">
									General Medical Information
								</Text>
								<Text color="petcode.neutral.400">Visibility</Text>
							</Flex>
							<InfoFieldWithVisibility
								isEditable={isEditable}
								formikKey="specialNeeds"
								label="Special Needs"
							/>
							<InfoFieldWithVisibility
								isEditable={isEditable}
								formikKey="allergies"
								label="Allergies"
							/>
							<InfoFieldWithVisibility
								isEditable={isEditable}
								formikKey="vet.name"
								label="Veterinarian Name"
							/>
							<InfoFieldWithVisibility
								isEditable={isEditable}
								formikKey="vet.phoneNumber"
								label="Veterinarian Phone Number"
							/>
						</Flex>
						<Flex direction="column" padding={6} layerStyle="card">
							<Text color="petcode.neutral.700" fontSize="2xl" marginBottom={3}>
								Vaccination History
							</Text>
							{pet.vaccinations
								// .sort((a: { date: string }, b: {date: string}) => b.date.localeCompare(a.date))
								.map((vaccination: any, idx: number) => (
									<Box key={idx}>
										<Text textStyle="info-field-text">{vaccination.name}</Text>
										<Text textStyle="info-field-label">
											{moment(vaccination.date).format('MM/DD/YY')}
										</Text>
									</Box>
								))}
						</Flex>
						<Overlays
							isEditable={isEditable}
							setEditable={setEditable}
							setModalShown={setModalShown}
						/>
						<AddVaccinationModal
							isShown={isModalShown}
							setShown={setModalShown}
						/>
					</Stack>
				)}
			</Formik>
		</AccountPageTemplate>
	)
}

export default MedicalInfo
