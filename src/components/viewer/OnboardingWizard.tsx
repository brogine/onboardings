import { FormEvent, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MAIN_URL, ONBOARDING_URL } from '../../router'
import { AvailableFonts, Data, Onboarding, WizardTab } from '../../types'
import Wizard from '../common/Wizard/Wizard'
import { renderWelcomeStepBody, renderDynamicStepBody } from './renderHelpers'
import { createData } from '../../features/data/dataSlice'
import './OnboardingWizard.css'

const STEP_SEPARATOR = '_'
const FIRST_STEP_KEY = 'welcome'

interface OnboardingWizardProps {
  onboarding: Onboarding
  currentStep: string
}

export default function OnboardingWizard({
  onboarding: { id, configuration, encodedName, welcomeStep, dynamicSteps },
  currentStep,
}: OnboardingWizardProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const getStepIndexByName = (name: string) => {
    const [, index] = name.split(STEP_SEPARATOR)
    return index === undefined ? null : Number(index) - 1
  }
  const getStepNameByIndex = (index: number) => `step${STEP_SEPARATOR}${index + 1}`
  const tabsFormatted = useMemo(() => {
    const result: WizardTab[] = []

    result.push({
      key: FIRST_STEP_KEY,
      title: welcomeStep.title,
      body: renderWelcomeStepBody(welcomeStep),
      buttonStyles: { next: configuration.next },
      footer: welcomeStep.footerButtonText,
      isDefaultValid: true,
    })

    result.push(
      ...dynamicSteps.map((step, index) => ({
        key: getStepNameByIndex(index),
        title: step.title,
        bodyWithHandler: renderDynamicStepBody(step),
        buttonStyles: { next: configuration.next, previous: configuration.previous },
        isDefaultValid: false,
      })),
    )

    return result
  }, [configuration, welcomeStep, dynamicSteps])
  const handleGoNext = () => {
    const currentIndex = getStepIndexByName(currentStep)
    if (currentIndex === dynamicSteps.length - 1) return

    const nextStep = getStepNameByIndex(currentIndex === null ? 0 : currentIndex + 1)
    navigate(`${ONBOARDING_URL}/${encodedName}/${nextStep}`)
  }
  const handleGoPrevious = () => {
    const currentIndex = getStepIndexByName(currentStep)
    if (currentIndex === null) return

    const previousStep = currentIndex === 0 ? FIRST_STEP_KEY : getStepNameByIndex(currentIndex - 1)
    navigate(`${ONBOARDING_URL}/${encodedName}/${previousStep}`)
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if ((event.nativeEvent as SubmitEvent).submitter?.textContent !== 'SUBMIT') return false

    const form = event.currentTarget

    const returnData: Data = {
      onboardingId: id as string,
      data: [],
    }

    for (let i = 0; i < form.length; i += 1) {
      const element = form[i]
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
      ) {
        const { value, name } = element
        returnData.data.push({ key: name, value })
      }
    }

    dispatch(createData(returnData))
    navigate(MAIN_URL)
    return true
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ fontFamily: `${AvailableFonts[Number(configuration.font)]}, sans-serif` }}
      >
        <Wizard
          activeKey={currentStep}
          tabs={tabsFormatted}
          onGoNext={handleGoNext}
          onGoPrevious={handleGoPrevious}
        />
      </form>
    </>
  )
}
