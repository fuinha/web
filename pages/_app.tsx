import {
	ChakraProvider,
	ColorModeProvider,
	Container,
	cookieStorageManager,
	extendTheme,
	localStorageManager,
} from '@chakra-ui/core'
import { AnimatePresence } from 'framer-motion'
import nookies from 'nookies'
import AuthProvider from '../src/shared/auth/context'

const App = ({ Component, pageProps }) => (
	<AnimatePresence exitBeforeEnter>
		<ChakraProvider colorModeManager={localStorageManager}>
			<ColorModeProvider
				options={{
					initialColorMode: 'light',
				}}>
				<AuthProvider>
					<Container>
						<Component {...pageProps} />
					</Container>
				</AuthProvider>
			</ColorModeProvider>
		</ChakraProvider>
	</AnimatePresence>
)

export default App
