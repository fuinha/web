import { Box, Button, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import firebase from '../src/shared/firebase/client'
import useAuth from '../src/shared/auth/hooks/index'

const Home: NextPage = () => {
	const { loggedIn, user, signInWithGoogle, signOut } = useAuth()
	return (
		<Box>
			{loggedIn ? (
				<Text>Hello, {user.displayName}</Text>
			) : (
				<Text>Not Signed In.</Text>
			)}
			<Button onClick={loggedIn ? signOut : signInWithGoogle} />
		</Box>
	)
}

export default Home
