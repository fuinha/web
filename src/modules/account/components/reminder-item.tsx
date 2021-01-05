import React, { useState } from 'react'

import {
	Box,
	Divider,
	Flex,
	FlexProps,
	Icon,
	Stack,
	Text,
} from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import { HiOutlinePencil, HiOutlineTrash, HiCheck } from 'react-icons/hi'
import { OptionTypeBase } from 'react-select'

import moment from 'moment'

import AccountInput from './account-input'
import AccountSelect from './account-select'

import { IReminder } from '#types/models/pet/Reminder'

import 'react-datepicker/dist/react-datepicker.min.css'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

type ReminderItemProps = {
	reminder: IReminder
	isEditable?: boolean
	onSave?: (reminder: IReminder) => void
	onDelete?: () => void
} & FlexProps

const ReminderItem: React.FC<ReminderItemProps> = ({
	reminder,
	isEditable = false,
	onSave = noop,
	onDelete = noop,
	...props
}) => {
	const [editedReminder, setEditedReminder] = useState(reminder)
	const [isBeingEdited, setIsBeingEdited] = useState(false)

	return (
		<Flex
			direction="row"
			paddingX={6}
			paddingY={3}
			fontSize="xl"
			layerStyle="card"
			{...props}>
			<Box>
				<Text color="petcode.blue.400">{reminder.name}</Text>
				<Text color="petcode.neutral.400">
					Recurring :{' '}
					{isBeingEdited ? (
						<Box display="inline-block" width="150px">
							<AccountSelect
								fontSize="1rem"
								value={{
									label: editedReminder.frequency,
									value: editedReminder.frequency,
								}}
								onChange={(option) =>
									setEditedReminder({
										...editedReminder,
										frequency: (option as OptionTypeBase).value,
									})
								}
								options={['One-Time', 'Daily', 'Weekly', 'Monthly'].map(
									(option) => ({
										label: option,
										value: option,
									})
								)}
							/>
						</Box>
					) : (
						reminder.frequency
					)}
				</Text>
			</Box>
			<Box flexGrow={1} />
			<Flex
				direction="column"
				justifyContent="space-between"
				alignItems="flex-end">
				{isBeingEdited ? (
					<Box>
						<DatePicker
							selected={editedReminder.date}
							showPopperArrow={false}
							onChange={(date) =>
								setEditedReminder({ ...editedReminder, date: date as Date })
							}
							placeholderText="Reminder Begin Date"
							customInput={<AccountInput variant="flushed" />}
						/>
					</Box>
				) : (
					<Text color="petcode.blue.400">
						{moment(reminder.date).format('M/D')}
					</Text>
				)}
				{isBeingEdited ? (
					<Box>
						<AccountInput
							variant="flushed"
							type="time"
							color="petcode.yellow.400"
							fontSize="md"
							value={editedReminder.time}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setEditedReminder({ ...editedReminder, time: e.target.value })
							}
						/>
					</Box>
				) : (
					<Text color="petcode.yellow.400" fontSize="md">
						{moment(reminder.time, 'HH:mm').format('LT')}
					</Text>
				)}
			</Flex>
			{isEditable && (
				<Stack isInline alignItems="center" spacing={4}>
					<Divider
						alignSelf="stretch"
						orientation="vertical"
						color="petcode.neutral.300"
						borderLeftWidth={2}
						marginX={4}
						marginY={0}
					/>
					{!isBeingEdited ? (
						<Icon
							as={HiOutlinePencil}
							color="petcode.neutral.600"
							cursor="pointer"
							onClick={() => {
								setIsBeingEdited(true)
							}}
							boxSize="28px"
						/>
					) : (
						<Icon
							as={HiCheck}
							color="green.400"
							cursor="pointer"
							onClick={() => {
								setIsBeingEdited(false)
								onSave(editedReminder)
							}}
							boxSize="28px"
						/>
					)}
					<Icon
						as={HiOutlineTrash}
						color="red.400"
						cursor="pointer"
						boxSize="28px"
						onClick={onDelete}
					/>
				</Stack>
			)}
		</Flex>
	)
}

export default ReminderItem
