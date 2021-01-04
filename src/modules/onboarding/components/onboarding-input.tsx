import { chakra, Input } from '@chakra-ui/react'

const OnboardingInput = chakra(Input, {
	baseStyle: {
		height: '4rem',
		fontSize: 'lg',
		border: 'none',
		backgroundColor: 'petcode.neutral.100',
		fontWeight: 'semibold',
		paddingX: 6,
		color: 'petcode.neutral.700',
	},
})

export default OnboardingInput
