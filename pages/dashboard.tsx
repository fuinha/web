import {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
	NextPage,
} from 'next'
import nookies from 'nookies'
import { Button, Text } from '@chakra-ui/react'
import firebaseAdmin from '../src/shared/firebase/admin'
import useAuth from '../src/shared/auth/hooks/index'
import { User } from '../src/types/models/user/index'
import { Pet } from '../src/types/models/pet/index'

const Dashboard: NextPage<InferGetServerSidePropsType<
	typeof getServerSideProps
>> = ({ pet }) => {
	const { signOut } = useAuth()
	return (
		<>
			<Text>{pet.name}</Text>
			<Button onClick={signOut}>Sign Out</Button>
		</>
	)
}

export default Dashboard

// Sample for authentication
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const cookies = nookies.get(ctx)

		const token = await firebaseAdmin.auth().verifyIdToken(cookies.token)

		const user = await User.get(token.uid)

		const pet = (await Promise.all(user.pets.map(Pet.get)))[0]

		return {
			props: { user, pet },
		}
	} catch (err) {
		console.error(`❌ Ran into error, redirecting now. Error: ${err}`)
		// either the `token` cookie didn't exist
		// or token verification failed
		// either way: redirect to the login page
		// either the `token` cookie didn't exist
		// or token verification failed
		// either way: redirect to the login page
		return {
			redirect: {
				permanent: false,
				destination: '/login',
			},
			// `as never` is required for correct type inference
			// by InferGetServerSidePropsType below
			props: {} as never,
		}
	}
}
