import React, { useEffect, useState } from 'react'

import {
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
import { HiOutlinePlus } from 'react-icons/hi'
import { Formik, Form, Field } from 'formik'

import * as Yup from 'yup'
import AccountPageTemplate from './components/account-page-template'
import ReminderItem from './components/reminder-item'
import BaseButton from '#components/base-button'
import ExpandButton from './components/expand-button'
import AccountInput from './components/account-input'
import AccountSelect from './components/account-select'

import { IReminder } from '#types/models/pet/Reminder'
import { pet } from './data/mock'

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

type AddReminderModalProps = {
	isShown: boolean
	setShown: (b: boolean) => void
	onCreate: (v: IReminder) => void
}

const AddReminderModal: React.FC<AddReminderModalProps> = ({
	isShown,
	setShown,
	onCreate,
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
					<Text>Create Reminder</Text>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Formik
						initialValues={{
							name: '',
							date: null,
							frequency: '' as IReminder['frequency'],
							notificationMethod: '' as IReminder['notificationMethod'],
							time: '',
							enabled: true,
						}}
						validationSchema={RemindersSchema}
						onSubmit={(values) => {
							setShown(false)
							onCreate(values)
							toast({
								title: 'Reminder created.',
								description: 'Your reminder was created successfully.',
								status: 'success',
								duration: 5000,
								isClosable: true,
							})
						}}>
						{({ handleSubmit, setFieldValue, values }) => (
							<Form>
								<Field
									variant="flushed"
									placeholder="Reminder Name"
									as={AccountInput}
									name="name"
								/>
								<Text textStyle="info-field-label">Reminder Name</Text>
								<DatePicker
									selected={values.date}
									showPopperArrow={false}
									onChange={(date) => setFieldValue('date', date as Date)}
									placeholderText="Reminder Date"
									customInput={<AccountInput variant="flushed" />}
								/>
								<Text textStyle="info-field-label">Reminder Date</Text>
								<Field
									variant="flushed"
									type="time"
									as={AccountInput}
									name="time"
								/>
								<Text textStyle="info-field-label">Reminder Time</Text>
								<AccountSelect
									fontSize="1rem"
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
								/>
								<Text textStyle="info-field-label">Reminder Frequency</Text>
								<AccountSelect
									fontSize="1rem"
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
								/>
								<Text textStyle="info-field-label">
									Reminder Notification Method
								</Text>
								<BaseButton
									colorScheme="petcode.blue"
									color="white"
									marginTop={3}
									onClick={handleSubmit as any}>
									<Text>Save</Text>
								</BaseButton>
							</Form>
						)}
					</Formik>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}

type OverlaysProps = {
	setModalShown: (a: boolean) => void
}

const Overlays: React.FC<OverlaysProps> = ({ setModalShown }) => (
	<ExpandButton
		rounded="full"
		bottom={5}
		right={5}
		position="fixed"
		padding={4}
		backgroundColor="petcode.yellow.400"
		onClick={() => setModalShown(true)}
		expandChildren={
			<Text
				fontSize="xl"
				fontWeight="thin"
				textTransform="uppercase"
				marginRight={2}>
				Add Reminder
			</Text>
		}>
		<Icon as={HiOutlinePlus} boxSize="30px" />
	</ExpandButton>
)

const Reminders = () => {
	const [isModalShown, setModalShown] = useState(false)

	const [reminders, setReminders] = useState<IReminder[]>(pet.reminders)

	useEffect(() => {
		console.log('New reminders', reminders)
	}, [reminders])

	return (
		<AccountPageTemplate>
			<Stack
				position="relative"
				flexGrow={1}
				paddingX={10}
				zIndex={1}
				spacing={6}>
				<Text color="white" fontSize="3xl" marginBottom={3}>
					Reminders
				</Text>
				{reminders.map((reminder, idx) => (
					<ReminderItem
						marginLeft={3}
						key={idx}
						reminder={reminder}
						isEditable
						onSave={async (newReminder) => {
							// EDIT REMINDER
							setReminders([
								...reminders.slice(0, idx),
								newReminder,
								...reminders.slice(idx + 1),
							])
						}}
						onDelete={async () => {
							// DELETE REMINDER
							setReminders([
								...reminders.slice(0, idx),
								...reminders.slice(idx + 1),
							])
						}}
					/>
				))}
				<Overlays setModalShown={setModalShown} />
				<AddReminderModal
					isShown={isModalShown}
					setShown={setModalShown}
					onCreate={(reminder) => setReminders([...reminders, reminder])}
				/>
			</Stack>
		</AccountPageTemplate>
	)
}

export default Reminders
