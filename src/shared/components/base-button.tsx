import React from 'react'

import { Button } from '@chakra-ui/react'

const BaseButton: React.FC<React.ComponentProps<typeof Button>> = ({
	...props
}) => (
	<Button
		rounded="full"
		size="lg"
		variant="solid"
		whileHover={{
			scale: 1.05,
		}}
		transition={{
			duration: '0.2',
		}}
		{...props}
	/>
)

export default BaseButton
