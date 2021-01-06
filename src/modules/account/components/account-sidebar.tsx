import React from 'react'

import { Box, Flex, Image, Link, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
	HiOutlineHome,
	HiOutlinePhone,
	HiOutlineHeart,
	HiOutlineClipboardList,
	HiOutlineClipboardCheck,
	HiOutlineLocationMarker,
} from 'react-icons/hi'

import NextLink from 'next/link'
import BaseButton from '#components/base-button'

import useAuth from '#auth/hooks/index'
import { pet, user } from '../data/mock'

type AccountSidebarLinkProps = {
	icon: React.ReactNode
	href: string
}

const AccountSidebarLink: React.FC<AccountSidebarLinkProps> = ({
	icon,
	children,
	href,
}) => {
	const router = useRouter()
	return (
		<NextLink href={href}>
			<Link
				display="flex"
				flexDirection="row"
				alignItems="center"
				fontWeight="thin"
				color={
					router.pathname === href ? 'petcode.blue.400' : 'petcode.neutral.500'
				}>
				{icon}
				<Text fontSize="xl" fontWeight="thin" marginLeft={3}>
					{children}
				</Text>
			</Link>
		</NextLink>
	)
}

const AccountSidebar: React.FC = () => {
	const auth = useAuth()

	return (
		<Stack
			minWidth="270px"
			maxHeight="850px"
			paddingY={8}
			paddingX={10}
			zIndex={1}
			spacing={3}
			layerStyle="card">
			<Image
				src="/media/petcode-logo-with-qr-code-altered.png"
				alt="Petcode logo with QR code altered"
				width="11.375rem"
				paddingBottom={6}
			/>
			<Box
				rounded="full"
				boxSize="5.5625rem"
				backgroundSize="cover"
				backgroundPosition="center"
				backgroundImage="url(/media/placeholder-dog.png)"
			/>
			<Flex direction="row" justifyContent="space-between">
				<Flex direction="column">
					<Text color="petcode.neutral.700" fontSize="3xl">
						{pet.name}
					</Text>
					<Text color="petcode.neutral.500" fontSize="xl" fontWeight="thin">
						{user.fullName}
					</Text>
				</Flex>
			</Flex>
			<Box flexGrow={1} />
			<Stack spacing={6}>
				<AccountSidebarLink href="/account/dashboard" icon={<HiOutlineHome />}>
					Dashboard
				</AccountSidebarLink>
				<AccountSidebarLink
					href="/account/contact-info"
					icon={<HiOutlinePhone />}>
					Contact Info
				</AccountSidebarLink>
				<AccountSidebarLink href="/account/petinfo" icon={<HiOutlineHeart />}>
					Pet Info
				</AccountSidebarLink>
				<AccountSidebarLink
					href="/account/medicalinfo"
					icon={<HiOutlineClipboardList />}>
					Medical Info
				</AccountSidebarLink>
				<AccountSidebarLink
					href="/account/reminders"
					icon={<HiOutlineClipboardCheck />}>
					Reminders
				</AccountSidebarLink>
				<AccountSidebarLink
					href="/account/scanlocations"
					icon={<HiOutlineLocationMarker />}>
					Scan Locations
				</AccountSidebarLink>
			</Stack>
			<Box flexGrow={5} />
			<BaseButton size="md" colorScheme="red" variant="outline">
				I Am Lost
			</BaseButton>
			<BaseButton
				size="md"
				colorScheme="petcode.neutral"
				variant="outline"
				onClick={auth.signOut}>
				Sign Out
			</BaseButton>
		</Stack>
	)
}

export default AccountSidebar
