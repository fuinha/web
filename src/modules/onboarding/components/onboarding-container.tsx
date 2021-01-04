import React from 'react'
import { Stack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionStack = motion.custom(Stack)

type OnboardingContainerProps = React.ComponentProps<typeof MotionStack>

const OnboardingContainer: React.FC<OnboardingContainerProps> = (props) => (
	<MotionStack
		initial={{ x: 50, opacity: 0 }}
		animate={{ x: 0, opacity: 1 }}
		padding={8}
		spacing={6}
		color="petcode.neutral.700"
		boxSizing="content-box"
		flexGrow={1}
		flexBasis="800px"
		{...props}
	/>
)

export default OnboardingContainer
