import React from 'react'

import { Flex, Image, useTheme } from '@chakra-ui/react'

import AccountSidebar from './account-sidebar'

import { PetCodeTheme } from '#theme/index'

const AccountPageTemplate: React.FC = ({ children }) => {
	const theme = useTheme() as PetCodeTheme

	return (
		<Flex
			minHeight="100vh"
			direction="row"
			backgroundColor="petcode.neutral.100"
			padding={6}>
			<svg
				style={{ position: 'absolute', top: 0, left: 0, height: 375 }}
				viewBox="0 0 942 481"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M416 215C138 274.901 24 415 -2 481V-1H942C887.333 45 705.6 152.6 416 215Z"
					fill={theme.colors.petcode.blue[400]}
				/>
			</svg>
			<svg
				style={{ position: 'absolute', top: 0, left: 0, height: 450 }}
				viewBox="0 0 1062 580"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M418 214C192.4 250.8 44 473.333 -2 580V0H1062C922 90 700 168 418 214Z"
					fill={theme.colors.petcode.blue[400]}
					opacity={0.4}
				/>
			</svg>
			<AccountSidebar />
			{children}
			<Image
				position="absolute"
				left={0}
				bottom={0}
				maxHeight="100vh"
				userSelect="none"
				src="/media/paw-print-background-rtl-down.svg"
			/>
			<Image
				position="absolute"
				right={0}
				top={0}
				maxHeight="100vh"
				userSelect="none"
				src="/media/paw-print-background-rtl-down.svg"
			/>
		</Flex>
	)
}

export default AccountPageTemplate
