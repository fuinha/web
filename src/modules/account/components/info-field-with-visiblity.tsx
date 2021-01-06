import React from 'react'

import { Box, Checkbox, Flex, Text } from '@chakra-ui/react'
import { Field, ErrorMessage, useFormikContext } from 'formik'

import _ from 'lodash'
import AccountInput from './account-input'

type InfoFieldWithVisibilityProps = {
	isEditable: boolean
	formikKey: string
	label: string
	inputComponent?: React.ReactNode
}

const InfoFieldWithVisibility: React.FC<InfoFieldWithVisibilityProps> = ({
	isEditable,
	formikKey,
	label,
	inputComponent,
}) => {
	const { values, setFieldValue } = useFormikContext()

	return (
		<Flex direction="row" justifyContent="space-between">
			<Box flexBasis="60%">
				{isEditable ? (
					inputComponent || (
						<Field
							as={AccountInput}
							variant="flushed"
							name={`${formikKey}.value`}
							placeholder={label}
						/>
					)
				) : (
					<Text textStyle="info-field-text">
						{_.get(values, `${formikKey}.value`)}
					</Text>
				)}
				<Text textStyle="info-field-label">
					{label}
					<ErrorMessage name={`${formikKey}.value`}>
						{(error) => (
							<Text as="span" color="red.400">
								{' '}
								- {error}
							</Text>
						)}
					</ErrorMessage>
				</Text>
			</Box>
			<Checkbox
				colorScheme="petcode.yellow"
				variant="petcode"
				isChecked={_.get(values, `${formikKey}.visible`)}
				isDisabled={!isEditable}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setFieldValue(`${formikKey}.visible`, e.target.checked)
				}
			/>
		</Flex>
	)
}

export default InfoFieldWithVisibility
