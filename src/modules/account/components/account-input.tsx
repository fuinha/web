import { chakra, Input } from '@chakra-ui/react'

const AccountInput = chakra(Input, {
	baseStyle: {
		height: 'auto',
		color: 'petcode.blue.400',
		fontSize: 'xl',
		borderColor: 'petcode.neutral.400',
		_focus: { borderColor: 'petcode.blue.400' },
	},
})

export default AccountInput
