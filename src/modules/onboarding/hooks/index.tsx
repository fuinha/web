import { useContext } from 'react'
import { OnboardingContext } from '../context/index'

const useOnboarding = () => useContext(OnboardingContext)

export default useOnboarding
