import {
	ChakraProvider,
	ColorModeProvider,
	cookieStorageManager,
	extendTheme,
	localStorageManager,
} from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import nookies from 'nookies'
import AuthProvider from '../src/shared/auth/context'
import theme from '#theme/index'

import '../src/styles/global.css'

const App = ({ Component, pageProps }) => (
	<AnimatePresence exitBeforeEnter>
		<ChakraProvider theme={theme} colorModeManager={localStorageManager}>
			<ColorModeProvider
				options={{
					initialColorMode: 'light',
				}}>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ColorModeProvider>
		</ChakraProvider>
	</AnimatePresence>
)

export default App
