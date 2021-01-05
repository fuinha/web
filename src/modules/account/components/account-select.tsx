import React from 'react'
import {
	useTheme,
	css,
	SelectProps as ChakraSelectProps,
} from '@chakra-ui/react'
import Select, { Props as SelectProps } from 'react-select'
import Creatable, { Props as CreatableProps } from 'react-select/creatable'
import { makeAsyncSelect } from 'react-select/async'
import { PetCodeTheme } from '#theme/index'

// waiting on https://github.com/JedWatson/react-select/issues/4206 to be able to use makeCreatableSelect
const makeStyles = (theme: any): SelectProps['styles'] => ({
	control: (provided, { isFocused }) => ({
		...provided,
		...css({
			'&:hover': { borderColor: 'petcode.blue.400' },
			borderColor: isFocused ? 'petcode.blue.400' : provided.borderColor,
			boxShadow: 'none',
			borderWidth: '0 0 1px 0',
			borderRadius: 0,
		})(theme),
	}),
	valueContainer: (provided, { selectProps: { color, fontSize } }) => ({
		...provided,
		...css({
			color,
			fontSize,
		})(theme),
	}),
	singleValue: (provided, { selectProps: { color } }) => ({
		...provided,
		...css({
			color,
		})(theme),
	}),
	option: (provided, { isSelected }) => ({
		...provided,
		...css({
			color: 'petcode.neutral.700',
			'&:hover': {
				backgroundColor: 'petcode.blue.400',
				color: 'white',
			},
			backgroundColor: isSelected
				? 'petcode.blue.400'
				: provided.backgroundColor,
		})(theme),
	}),
})

const AccountSelect: React.FC<SelectProps & ChakraSelectProps> = (props) => {
	const theme = useTheme() as PetCodeTheme

	return <Select styles={makeStyles(theme)} {...props} />
}

export const AccountCreatable: React.FC<
	CreatableProps<{ label: string; value: string }, false> & ChakraSelectProps
> = (props) => {
	const theme = useTheme() as PetCodeTheme

	return <Creatable styles={makeStyles(theme)} {...props} />
}

export const AccountAsync = makeAsyncSelect(AccountSelect)

export default AccountSelect
