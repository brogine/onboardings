import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import OnboardingWizard from '../components/viewer/OnboardingWizard'
import { NOT_FOUND_URL } from '../router'
import { selectAll } from '../features/onboarding/onboardingsSlice'
import { RootState } from '../store/types'
import { OnboardingStatus } from '../types'

export default function OnboardingViewer() {
  const params = useParams()
  const navigate = useNavigate()
  const onboarding = useSelector((state: RootState) => {
    return params.name
      ? selectAll(state.onboardings).find(
          (el) => el.status === OnboardingStatus.active && el.encodedName === params.name,
        )
      : undefined
  })

  if (onboarding === undefined) {
    // navigate(NOT_FOUND_URL) // this does not work
    return null
  }

  return <OnboardingWizard onboarding={onboarding} currentStep={params.step || 'welcome'} />
}
