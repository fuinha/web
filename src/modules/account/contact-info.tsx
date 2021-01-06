import React, { useState } from 'react'

import { Flex, FlexProps, Icon, Stack, Text, useToast } from '@chakra-ui/react'
import { Formik, useFormikContext } from 'formik'
import { HiOutlinePencil, HiCheck } from 'react-icons/hi'

import * as Yup from 'yup'
import ExpandButton from './components/expand-button'
import AccountPageTemplate from './components/account-page-template'
import InfoFieldWithVisibility from './components/info-field-with-visiblity'

import { pet } from './data/mock'
import { IPet } from '#types/models/pet'

import 'yup-phone'

const ContactInformationSchema = Yup.object().shape({
	contacts: Yup.array().of(
		Yup.object().shape({
			name: Yup.object().shape({
				value: Yup.string().label('Name').required(),
				visible: Yup.boolean(),
			}),
			email: Yup.object().shape({
				value: Yup.string().label('Email address').email().required(),
				visible: Yup.boolean(),
			}),
			phoneNumber: Yup.object().shape({
				value: Yup.string().label('Phone number').phone('US', true).required(),
				visible: Yup.boolean(),
			}),
			address: Yup.object().shape({
				value: Yup.string().label('Address').required(),
				visible: Yup.boolean(),
			}),
		})
	),
})

type ContactInfoCardProps = {
	index: number
	isEditable: boolean
} & FlexProps

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
	index,
	isEditable,
	...props
}) => {
	const { values } = useFormikContext<IPet>()
	const contact = values.contacts[index].level
	return (
		<Flex direction="column" padding={6} layerStyle="card" {...props}>
			<Flex
				direction="row"
				justifyContent="space-between"
				fontSize="2xl"
				marginBottom={3}>
				<Text color="petcode.neutral.700">
					{contact.charAt(0).toUpperCase().concat(contact.substr(1))} Contact
					Information
				</Text>
				<Text color="petcode.neutral.400">Visibility</Text>
			</Flex>
			<InfoFieldWithVisibility
				isEditable={isEditable}
				formikKey={`contacts[${index}].name`}
				label="Name"
			/>
			<InfoFieldWithVisibility
				isEditable={isEditable}
				formikKey={`contacts[${index}].address`}
				label="Address"
			/>
			<InfoFieldWithVisibility
				isEditable={isEditable}
				formikKey={`contacts[${index}].phoneNumber`}
				label="Phone Number"
			/>
			<InfoFieldWithVisibility
				isEditable={isEditable}
				formikKey={`contacts[${index}].email`}
				label="Email"
			/>
		</Flex>
	)
}

const ContactInfoPage = () => {
	const [isEditable, setEditable] = useState(false)
	const toast = useToast()

	return (
		<AccountPageTemplate>
			<Formik
				initialValues={pet}
				validationSchema={ContactInformationSchema}
				onSubmit={(values) => {
					// TODO: save new values
					console.log('Saving: ', values)
					toast({
						title: 'Contact information saved.',
						description: 'Your contact information was saved successfully.',
						status: 'success',
						duration: 5000,
						isClosable: true,
					})
					setEditable(false)
				}}>
				{({ values, handleSubmit }) => (
					<Stack
						position="relative"
						flexGrow={1}
						paddingX={10}
						spacing={5}
						zIndex={1}>
						{values.contacts.map((_: any, idx: number) => (
							<ContactInfoCard key={idx} index={idx} isEditable={isEditable} />
						))}
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
				)}
			</Formik>
		</AccountPageTemplate>
	)
}

export default ContactInfoPage
