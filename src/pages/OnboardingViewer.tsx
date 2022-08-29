import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import OnboardingWizard from '../components/viewer/OnboardingWizard'
import { NOT_FOUND_URL } from '../router'
import { selectAll } from '../features/onboarding/onboardingsSlice'
import { RootState } from '../store/types'
import { OnboardingStatus } from '../types'

export default function OnboardingViewer() {
  const params = useParams()
  const onboarding = useSelector((state: RootState) => {
    return params.name
      ? selectAll(state.onboardings).find(
          (el) => el.status === OnboardingStatus.active && el.encodedName === params.name,
        )
      : undefined
  })

  if (onboarding === undefined) {
    return <Navigate to={NOT_FOUND_URL} replace />
  }

  return <OnboardingWizard onboarding={onboarding} currentStep={params.step || 'welcome'} />
}
