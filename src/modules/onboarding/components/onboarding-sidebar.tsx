import React from 'react'
import { Box, Flex, Image, Stack, Text, useTheme } from '@chakra-ui/react'

import { PetCodeTheme } from '#theme/index'

const OnboardingSidebar: React.FC = () => {
	const theme = useTheme() as PetCodeTheme

	return (
		<Flex direction="row" marginRight="calc(50% * 153 / 1024)">
			<Stack
				backgroundColor="petcode.blue.400"
				alignItems="center"
				color="white"
				padding={8}
				paddingLeft={16}
				boxSizing="content-box"
				width="325px">
				<Box flexGrow={1} />
				<Image src="/media/petcode-logo-with-qr-code.png" height="4rem" />
				<Box flexGrow={1} />
				<Text fontWeight="bold" fontSize="2.5rem">
					One step closer to getting your pet safer.
				</Text>
				<Text fontSize="lg">One easy set-up to be safer in seconds.</Text>
				<Box flexGrow={1} />
				<Image src="/media/welcome-image.png" width="275px" />
				<Box flexGrow={2} />
			</Stack>
			<Flex position="relative">
				<svg
					height="100%"
					style={{ position: 'absolute' }}
					viewBox="470.484 0 153 1024"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M509.299 549.118C423.459 829.211 571.719 981.095 663.764 1062.71L470.484 1029.27L470.484 -13.5539L548.612 -4.76491C559.178 94.8489 587.233 294.826 509.299 549.118Z"
						fill={theme.colors.petcode.blue[400]}
						opacity={0.4}
					/>
					<path
						d="M517.161 530.239C439.631 856.533 532.98 989.865 590.697 1054.08L470.484 1028.55L470.484 -42.6674C500.363 3.91947 597.17 193.508 517.161 530.239Z"
						fill={theme.colors.petcode.blue[400]}
					/>
				</svg>
			</Flex>
		</Flex>
	)
}

export default OnboardingSidebar
