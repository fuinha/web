import React from 'react'
import Head from 'next/head'
import { Box, Flex, Image, Stack, Text, useTheme } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Formik, Form } from 'formik'
import { motion } from 'framer-motion'

import * as Yup from 'yup'
import OnboardingInput from './onboarding-input'
import OnboardingContainer from './onboarding-container'
import BaseButton from '#components/base-button'
import UnifiedErrorMessage from '#components/unified-error-message'

import { PetCodeTheme } from '#theme/index'

import useOnboarding from '../hooks/index'
import { onboardingActions } from '../reducers/index'

import 'yup-phone'

const MotionBox = motion.custom(Box)

const ConnectYourPetCodeTagSchema = Yup.object().shape({
	tagId: Yup.string()
		.label('Tag ID')
		.matches(/^[0-9A-Z]{6}$/, ({ label }) => `${label} must be 6 digits long`)
		.required(),
})

const ConnectYourPetCodeTagStep: React.FC = () => {
	const theme = useTheme() as PetCodeTheme

	const [state, dispatch] = useOnboarding()

	return (
		<>
			<Head>
				<title>PetCode - Connect Your Tag</title>
			</Head>
			<Formik
				initialValues={state.tagInfo}
				validationSchema={ConnectYourPetCodeTagSchema}
				onSubmit={(values) => {
					dispatch(onboardingActions.setTagInformation(values))
					dispatch(onboardingActions.setStep('pet-information'))
				}}>
				{({
					errors,
					touched,
					handleBlur,
					setFieldValue,
					handleSubmit,
					values,
				}) => (
					<OnboardingContainer>
						<Box flexGrow={1} />
						<Stack spacing={3}>
							<Text fontWeight="bold" fontSize="2.5rem">
								Connect Your PetCode Tag
							</Text>
							<Text fontSize="lg" color="petcode.neutral.600">
								Input the 6-digit PetCode ID on the back of your QR tag
							</Text>
						</Stack>
						<Form>
							<Stack spacing={6}>
								<OnboardingInput
									value={values.tagId}
									onBlur={handleBlur}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setFieldValue(e.target.name, e.target.value.toUpperCase())
									}
									name="tagId"
									placeholder="6 Digit PetCode ID"
								/>
							</Stack>
						</Form>
						<Box position="relative">
							<Image src="/media/tag-back.png" alignSelf="start" />
							<Flex direction="row" position="absolute" left={145} top={185}>
								<svg
									width="134"
									height="66"
									viewBox="0 0 134 66"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									stroke={theme.colors.petcode.blue[400]}>
									<circle
										r="8.40385"
										transform="matrix(-1 0 0 1 10.9998 11.3462)"
										strokeWidth="4.42308"
									/>
									<motion.path
										initial={{ pathLength: 0 }}
										animate={{ pathLength: 1 }}
										transition={{ duration: 2 }}
										d="M16.3069 18.4231L58.7685 63.5385H133.076"
										strokeWidth="4.42308"
									/>
								</svg>
								<MotionBox
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 2 }}
									alignSelf="flex-end">
									<Text
										color="petcode.blue.400"
										fontWeight="bold"
										fontSize="lg"
										transform="translateY(33%)"
										marginLeft={3}>
										6 Digit PetCode ID
									</Text>
								</MotionBox>
							</Flex>
						</Box>
						<UnifiedErrorMessage touched={touched} errors={errors} />
						<BaseButton
							type="submit"
							alignSelf="end"
							colorScheme="petcode.blue"
							onClick={handleSubmit as any}>
							<Text textTransform="uppercase" letterSpacing="0.07em">
								Next Step
							</Text>
							<ChevronRightIcon boxSize="24px" />
						</BaseButton>
						<Box flexGrow={1} />
					</OnboardingContainer>
				)}
			</Formik>
		</>
	)
}

export default ConnectYourPetCodeTagStep
