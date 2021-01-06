import React, { useState } from 'react'

import {
	Box,
	Flex,
	FlexProps,
	Icon,
	SimpleGrid,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Formik, Field } from 'formik'
import DatePicker from 'react-datepicker'
import {
	HiOutlinePencil,
	HiCheck,
	HiOutlineClock,
	HiOutlinePhone,
	HiOutlineClipboardList,
} from 'react-icons/hi'
import { MdPalette } from 'react-icons/md'
import { FaPaw } from 'react-icons/fa'
import moment from 'moment'
import * as Yup from 'yup'
import { DogIcon, ServiceAnimalIcon } from '#theme/icons'

import ExpandButton from './components/expand-button'
import AccountPageTemplate from './components/account-page-template'
import AccountInput from './components/account-input'
import AccountSelect, { AccountCreatable } from './components/account-select'

import { DOG_BREEDS, CAT_BREEDS } from '#data/breeds'
import { pet } from './data/mock'

import 'react-datepicker/dist/react-datepicker.min.css'

const PetInfoCard: React.FC<FlexProps> = ({ ...props }) => (
	<Flex
		direction="row"
		alignItems="center"
		justifyContent="space-between"
		padding={6}
		boxSizing="content-box"
		layerStyle="card"
		{...props}
	/>
)

const InfoButton: React.FC<FlexProps> = (props) => (
	<Flex
		position="relative"
		direction="column"
		justifyContent="center"
		backgroundColor="petcode.yellow.400"
		cursor="pointer"
		width="250px"
		padding={6}
		layerStyle="card"
		{...props}
	/>
)

const PetInformationSchema = Yup.object().shape({
	species: Yup.string().label('Species').required(),
	breed: Yup.string().label('Breed').required(),
	birthdate: Yup.date().label('Birthdate').nullable().required(),
	color: Yup.string().label('Color'),
	temperament: Yup.string().label('Temperament'),
	isServiceAnimal: Yup.boolean()
		.label('Is Service Animal')
		.nullable()
		.required(),
})

const PetInfo = () => {
	const [isEditable, setEditable] = useState(false)
	const toast = useToast()
	const router = useRouter()

	return (
		<AccountPageTemplate>
			<Formik
				initialValues={pet}
				validationSchema={PetInformationSchema}
				onSubmit={(values) => {
					// TODO: save new values
					console.log('Saving: ', values)
					toast({
						title: 'Pet information saved.',
						description: 'Your pet information was saved successfully.',
						status: 'success',
						duration: 5000,
						isClosable: true,
					})
					setEditable(false)
				}}>
				{({ handleSubmit, values, setFieldValue }) => {
					let breedOptions: string[] = []
					if (values.species === 'Dog') breedOptions = DOG_BREEDS
					else if (values.species === 'Cat') breedOptions = CAT_BREEDS

					return (
						<Stack
							position="relative"
							direction="column"
							flexGrow={1}
							paddingX={10}
							zIndex={1}
							spacing={10}>
							<Stack
								isInline
								alignItems="center"
								color="petcode.neutral.700"
								spacing={6}>
								<Box
									rounded="full"
									boxSize="150px"
									minWidth="150px"
									backgroundSize="cover"
									backgroundPosition="center"
									// backgroundImage={`url(${pet.profileUrl})`}
								/>
								<Flex position="relative" alignItems="center">
									<Icon
										as={FaPaw}
										position="absolute"
										top="50%"
										color="petcode.neutral.700"
										opacity={0.1}
										boxSize={120}
										transform="translateY(-50%) matrix(-0.9, -0.44, -0.44, 0.9, 0, 0);"
									/>
									<Text
										position="relative"
										fontSize="6xl"
										fontWeight="semibold"
										marginLeft={16}>
										Max
									</Text>
								</Flex>
								<Box flexGrow={1} />
								<InfoButton
									onClick={() => router.push('/account/contact-info')}>
									<Text position="relative" fontSize="3xl" zIndex={2}>
										Contact Information
									</Text>
									<Icon
										as={HiOutlinePhone}
										position="absolute"
										alignSelf="flex-end"
										boxSize="100px"
										opacity={0.1}
									/>
								</InfoButton>
								<InfoButton
									onClick={() => router.push('/account/medical-info')}>
									<Text position="relative" fontSize="3xl" zIndex={2}>
										Medical Information
									</Text>
									<Icon
										as={HiOutlineClipboardList}
										position="absolute"
										alignSelf="flex-end"
										boxSize="100px"
										opacity={0.1}
									/>
								</InfoButton>
							</Stack>
							<SimpleGrid columns={2} spacing={10}>
								<PetInfoCard>
									<Flex direction="column" minWidth="50%">
										{isEditable ? (
											<AccountSelect
												fontSize="4xl"
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
											/>
										) : (
											<Text textStyle="pet-card-text">{values.species}</Text>
										)}
										<Text textStyle="pet-card-label">Species</Text>
									</Flex>
									<DogIcon
										boxSize={120}
										color="petcode.neutral.700"
										opacity={0.1}
									/>
								</PetInfoCard>
								<PetInfoCard>
									<Flex direction="column" width="100%">
										{isEditable ? (
											<AccountCreatable
												fontSize="4xl"
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
											/>
										) : (
											<Text textStyle="pet-card-text">{values.breed}</Text>
										)}
										<Text textStyle="pet-card-label">Breed</Text>
									</Flex>
									<Icon
										as={FaPaw}
										color="petcode.neutral.700"
										opacity={0.1}
										boxSize={120}
										transform="matrix(-0.9, -0.44, -0.44, 0.9, 0, 0);"
									/>
								</PetInfoCard>
								<PetInfoCard>
									<Flex direction="column">
										{isEditable ? (
											<DatePicker
												selected={values.birthdate}
												showPopperArrow={false}
												onChange={(date) =>
													setFieldValue('birthdate', date as Date)
												}
												placeholderText="Reminder Begin Date"
												customInput={
													<AccountInput
														color="petcode.neutral.700"
														variant="flushed"
														fontSize="4xl"
													/>
												}
											/>
										) : (
											<Text textStyle="pet-card-text">
												{moment
													.duration(moment().diff(moment(values.birthdate)))
													.humanize()}
											</Text>
										)}
										<Text textStyle="pet-card-label">Age</Text>
									</Flex>
									<Icon
										as={HiOutlineClock}
										color="petcode.neutral.700"
										opacity={0.1}
										boxSize={120}
									/>
								</PetInfoCard>
								<PetInfoCard>
									<Flex direction="column">
										{isEditable ? (
											<Field
												color="petcode.neutral.700"
												variant="flushed"
												fontSize="4xl"
												as={AccountInput}
												name="color"
												placeholder="Color"
											/>
										) : (
											<Text textStyle="pet-card-text">{values.color}</Text>
										)}
										<Text textStyle="pet-card-label">Color</Text>
									</Flex>
									<Icon
										as={MdPalette}
										color="petcode.neutral.700"
										opacity={0.1}
										boxSize={120}
									/>
								</PetInfoCard>
								<PetInfoCard>
									<Flex direction="column">
										{isEditable ? (
											<Field
												color="petcode.neutral.700"
												variant="flushed"
												fontSize="4xl"
												as={AccountInput}
												name="temperament"
												placeholder="Temperament"
											/>
										) : (
											<Text textStyle="pet-card-text">
												{values.temperament}
											</Text>
										)}
										<Text textStyle="pet-card-label">Temperament</Text>
									</Flex>
									<Icon
										as={FaPaw}
										color="petcode.neutral.700"
										opacity={0.1}
										boxSize={120}
										transform="matrix(-0.9, -0.44, -0.44, 0.9, 0, 0);"
									/>
								</PetInfoCard>
								<PetInfoCard>
									<Flex direction="column" minWidth="50%">
										{isEditable ? (
											<AccountSelect
												fontSize="4xl"
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
													setFieldValue(
														'isServiceAnimal',
														newValue.value === 'Yes'
													)
												}
												placeholder="Service Animal"
											/>
										) : (
											<Text textStyle="pet-card-text">
												{values.isServiceAnimal ? 'Yes' : 'No'}
											</Text>
										)}
										<Text textStyle="pet-card-label">Service Animal</Text>
									</Flex>
									<ServiceAnimalIcon
										boxSize={120}
										color="petcode.neutral.700"
										opacity={0.1}
									/>
								</PetInfoCard>
							</SimpleGrid>
							<ExpandButton
								position="fixed"
								bottom={5}
								right={5}
								rounded="full"
								color="petcode.neutral.700"
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
								<Icon
									as={isEditable ? HiCheck : HiOutlinePencil}
									boxSize="30px"
								/>
							</ExpandButton>
						</Stack>
					)
				}}
			</Formik>
		</AccountPageTemplate>
	)
}

export default PetInfo
