import React from 'react'

import { Box, Flex, Icon, Stack, Text, useTheme } from '@chakra-ui/react'
import QRCode from 'qrcode.react'
import { FaPaw } from 'react-icons/fa'

import AccountPageTemplate from './components/account-page-template'
import ReminderItem from './components/reminder-item'

import { PetCodeTheme } from '#theme/index'
import useAuth from '#auth/hooks/index'
import { user, pet } from './data/mock'

const Dashboard: React.FC = () => {
	const theme = useTheme() as PetCodeTheme
	const auth = useAuth()

	return (
		<AccountPageTemplate>
			{() => (
				<Stack
					position="relative"
					flexGrow={1}
					paddingX={10}
					spacing={5}
					zIndex={1}>
					<Flex
						position="relative"
						direction="row"
						overflow="hidden"
						layerStyle="card">
						<Icon
							as={FaPaw}
							position="absolute"
							left={16}
							top="50%"
							color="petcode.neutral.700"
							opacity={0.05}
							boxSize={150}
							transform="translateY(-50%) matrix(-0.98, 0.2, 0.2, 0.98, 0, 0);"
						/>
						<Stack
							flexBasis="65%"
							backgroundColor="petcode.yellow.400"
							roundedLeft="lg"
							padding={12}
							paddingLeft={32}>
							<Text
								color="petcode.neutral.700"
								fontSize="5xl"
								lineHeight="none">
								{pet.name}
							</Text>
							<Text
								color="petcode.neutral.600"
								fontSize="2xl"
								fontWeight="thin">
								{pet.breed} &middot; {pet.contacts[0].name.value}
							</Text>
						</Stack>
						<Box position="relative">
							<svg
								height="100%"
								style={{ position: 'absolute' }}
								viewBox="15 0 131 220"
								fill={theme.colors.petcode.yellow[400]}
								xmlns="http://www.w3.org/2000/svg">
								<path
									opacity="0.3"
									d="M131 0H0.5V247.5H33C32.8333 220 32 155 67 116C102 77 128 21 131 0Z"
								/>
								<path d="M58.2 128.488C97 75 102.533 27.6613 103 0H12V253C12.9333 224.664 19.4 181.976 58.2 128.488Z" />
							</svg>
						</Box>
						<Box
							height="100%"
							flexGrow={1}
							// backgroundImage={`url(${pet.profileUrl})`}
							backgroundSize="cover"
							backgroundPosition="center"
							roundedRight="lg"
						/>
					</Flex>
					<Stack isInline justifyContent="space-between" spacing={5}>
						<Flex direction="row" flexBasis="50%" padding={6} layerStyle="card">
							<Flex direction="column" marginRight={4}>
								<Text
									color="petcode.neutral.700"
									fontSize="3xl"
									fontWeight="semibold">
									{pet.name}'s Code
								</Text>
								<Text
									color="petcode.neutral.500"
									fontSize="xl"
									fontWeight="thin">
									Scan this code to view your pet's public profile.
								</Text>
							</Flex>
							<Box alignSelf="center">
								<QRCode
									value="https://petcodeusa.com"
									size={200}
									fgColor={theme.colors.petcode.blue[400]}
								/>
							</Box>
						</Flex>
						<Flex
							direction="column"
							flexBasis="50%"
							padding={6}
							layerStyle="card">
							<Text
								color="petcode.neutral.700"
								fontSize="3xl"
								fontWeight="semibold"
								marginBottom={3}>
								Account Information
							</Text>
							<Box>
								<Text textStyle="info-field-text">{auth.user.displayName}</Text>
								<Text textStyle="info-field-label">Name</Text>
							</Box>
							<Box>
								<Text textStyle="info-field-text">{auth.user.email}</Text>
								<Text textStyle="info-field-label">Email</Text>
							</Box>
							<Box>
								<Text textStyle="info-field-text">*******</Text>
								<Text textStyle="info-field-label">Password</Text>
							</Box>
							<Box>
								<Text textStyle="info-field-text">{pet.name}</Text>
								<Text textStyle="info-field-label">Pet Name</Text>
							</Box>
						</Flex>
					</Stack>
					{pet.reminders.length > 0 && (
						<Stack padding={6} layerStyle="card">
							<Text
								color="petcode.neutral.700"
								fontSize="3xl"
								fontWeight="semibold"
								marginBottom={3}>
								Upcoming Reminders
							</Text>
							{pet.reminders.map((reminder: any, idx: number) => (
								<ReminderItem key={idx} reminder={reminder} />
							))}
						</Stack>
					)}
				</Stack>
			)}
		</AccountPageTemplate>
	)
}

export default Dashboard
