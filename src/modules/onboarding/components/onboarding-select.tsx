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

// see https://github.com/JedWatson/react-select/issues/4206
const makeStyles = (theme: any): SelectProps['styles'] => ({
	control: (provided) => ({
		...provided,
		...css({
			backgroundColor: 'petcode.neutral.100',
			paddingX: 6,
			height: '4rem',
			border: 'none',
		})(theme),
	}),
	valueContainer: (provided, { selectProps: { fontSize } }) => ({
		...provided,
		...css({
			fontSize,
			fontWeight: 'semibold',
			color: 'petcode.neutral.700',
			padding: 0,
			_placeholder: {
				color: 'petcode.neutral.500',
			},
		})(theme),
	}),
	placeholder: (provided) => ({
		...provided,
		...css({
			color: 'petcode.neutral.500',
			opacity: 0.5,
		})(theme),
	}),
	option: (provided, { isSelected }) => ({
		...provided,
		...css({
			color: 'petcode.neutral.600',
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

const OnboardingSelect: React.FC<SelectProps & ChakraSelectProps> = (props) => {
	const theme = useTheme() as PetCodeTheme

	return <Select styles={makeStyles(theme)} {...props} />
}

export const OnboardingCreatable: React.FC<
	CreatableProps<{ label: string; value: string }, false> & ChakraSelectProps
> = (props) => {
	const theme = useTheme() as PetCodeTheme

	return <Creatable styles={makeStyles(theme)} {...props} />
}

export const OnboardingAsync = makeAsyncSelect(OnboardingSelect)

export default OnboardingSelect
