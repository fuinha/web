import React, { useState } from 'react'

import { Flex, FlexProps } from '@chakra-ui/react'
import { motion, MotionProps } from 'framer-motion'

const MotionFlex = motion.custom(Flex)

type ExpandButtonProps = {
	expandChildren: React.ReactNode
} & FlexProps &
	MotionProps

const ExpandButton: React.FC<ExpandButtonProps> = ({
	children,
	expandChildren,
	...props
}) => {
	const [hovered, setHovered] = useState(false)

	return (
		<MotionFlex
			role="button"
			direction="row"
			alignItems="center"
			justifyContent="space-between"
			cursor="pointer"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			whileTap={{ scale: 1.05 }}
			{...props}>
			<motion.div layout>{hovered && expandChildren}</motion.div>
			{children}
		</MotionFlex>
	)
}

export default ExpandButton
