import React, { useEffect } from 'react'
import Head from 'next/head'
import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react'

import { deserializeOnboardingState } from './context/index'
import firebase from '#fire/client'

const OnboardingCompletePage = () => {
	// TODO: error handling
	useEffect(() => {
		(async () => {
			const state = deserializeOnboardingState(
				JSON.parse(localStorage.getItem('onboarding'))
			)
			localStorage.removeItem('onboarding')

			const {
				accountInfo,
				tagInfo,
				petInfo,
				owners,
				medicalInfo,
				vaccinations,
				reminders,
			} = state
			await firebase
				.firestore()
				.collection('pets')
				.doc(tagInfo.tagId)
				.set({
					...petInfo,
					birthdate: firebase.firestore.Timestamp.fromDate(petInfo.birthdate),
					specialNeeds: {
						visible: true,
						value: medicalInfo.specialNeeds,
					},
					isLost: false,
					allergies: {
						value: medicalInfo.allergies,
						visible: true,
					},
					contacts: owners.map((owner) =>
						Object.fromEntries(
							Object.entries(owner).map(([key, value]) => [
								key,
								{
									value,
									visible: true,
								},
							])
						)
					),
					reminders: reminders.map((reminder) => ({
						...reminder,
						date: firebase.firestore.Timestamp.fromDate(reminder.date),
					})),
					vaccinations: vaccinations.map((vaccination) => ({
						...vaccination,
						date: firebase.firestore.Timestamp.fromDate(vaccination.date),
						expirationDate: firebase.firestore.Timestamp.fromDate(
							vaccination.expirationDate
						),
					})),
					vet: {
						name: {
							value: medicalInfo.vetName,
							visible: true,
						},
						phoneNumber: {
							value: medicalInfo.vetPhoneNumber,
							visible: true,
						},
					},
				})

			const { user } = await firebase
				.auth()
				.createUserWithEmailAndPassword(accountInfo.email, accountInfo.password)

			if (user) {
				await user.updateProfile({
					displayName: accountInfo.fullName,
				})
				await firebase
					.firestore()
					.collection('users')
					.doc(user.uid)
					.set({
						fullName: accountInfo.fullName,
						pets: [tagInfo.tagId],
					})
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Head>
				<title>PetCode - Welcome!</title>
			</Head>
			<Flex
				direction="row"
				justifyContent="center"
				width="100%"
				backgroundColor="petcode.blue.400"
				minHeight="100vh">
				<Stack
					alignItems="center"
					color="white"
					paddingY={8}
					paddingX={16}
					boxSizing="content-box"
					maxWidth="350px"
					textAlign="center">
					<Box flexGrow={1} />
					<Image src="/media/petcode-logo-with-qr-code.png" height="4rem" />
					<Box flexGrow={1} />
					<Text fontWeight="bold" fontSize="2.5rem">
						You're All Set!
					</Text>
					<Text fontSize="lg">
						Congrats! Your PetCode account is now active! Check your email for a
						welcome to PetCode.
					</Text>
					<Box flexGrow={1} />
					<Image src="/media/welcome-image.png" width="275px" />
					<Box flexGrow={2} />
				</Stack>
			</Flex>
		</>
	)
}

export default OnboardingCompletePage
