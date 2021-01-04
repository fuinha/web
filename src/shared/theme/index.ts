import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
	sm: '30em',
	md: '48em',
	lg: '62em',
	xl: '80em',
})

const overrides = {
	breakpoints,
	fonts: {
		heading: '"Lilita One", sans-serif',
		body: '"Open Sans", sans-serif',
	},
	colors: {
		petcode: {
			blue: {
				100: '#9CD9EA',
				200: '#84D0E5',
				300: '#6BC6E0',
				400: '#51BCDA',
				500: '#2FAFD3',
				600: '#197a94',
				700: '#2693B1',
				800: '#1E768E',
				900: '#17586A',
			},
			yellow: {
				100: '#FDDD9E',
				200: '#FCD586',
				300: '#FBCC6E',
				400: '#FBC658',
				500: '#F9B327',
				600: '#EA9E06',
				700: '#BC7F05',
				800: '#8D5F04',
				900: '#5E3F02',
			},
			neutral: {
				100: '#F7FAFC',
				200: '#EDF2F7',
				300: '#E2E8F0',
				400: '#CBD5E0',
				500: '#A0AEC0',
				600: '#718096',
				700: '#4A5568',
			},
		},
	},
	layerStyles: {
		card: {
			bg: 'white',
			shadow: 'lg',
			rounded: 'lg',
		},
	},
	textStyles: {
		'info-field-text': {
			color: 'petcode.blue.400',
			fontSize: 'xl',
		},
		'info-field-label': {
			color: 'petcode.neutral.400',
			fontSize: 'sm',
		},
		'pet-card-text': {
			color: 'petcode.neutral.700',
			fontSize: '5xl',
		},
		'pet-card-label': {
			color: 'petcode.blue.400',
			fontSize: 'lg',
		},
	},
	components: {
		Checkbox: {
			variants: {
				petcode: {
					control: {
						borderRadius: '9999px',
						padding: 3,
					},
				},
			},
		},
		Link: {
			baseStyle: {
				_hover: {
					textDecoration: 'none',
				},
			},
		},
	},
	styles: {
		global: {
			input: {
				fontFamily: 'body',
			},
			'.react-datepicker': {
				fontFamily: 'body',
			},
			'.react-datepicker-wrapper': {
				width: '100%',
			},
			'.react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range, .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected': {
				backgroundColor: 'petcode.blue.400',
				'&:hover': {
					backgroundColor: 'petcode.blue.600',
				},
			},
			'.react-datepicker__header': {
				backgroundColor: 'petcode.neutral.100',
			},
			'.react-datepicker__navigation--previous': {
				borderRightColor: 'petcode.neutral.400',
				'&:hover': {
					borderRightColor: 'petcode.neutral.600',
				},
			},
			'.react-datepicker__navigation--next': {
				borderLeftColor: 'petcode.neutral.400',
				'&:hover': {
					borderLeftColor: 'petcode.neutral.500',
				},
			},
			'.react-datepicker, .react-datepicker__header, .react-datepicker__time-container': {
				borderColor: 'petcode.neutral.400',
			},
		},
	},
}

const customTheme = extendTheme(overrides)
export default customTheme

export type PetCodeTheme = typeof customTheme
