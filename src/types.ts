import { ChangeEventHandler } from 'react'

export enum OnboardingStatus {
  'active' = 'active',
  'disabled' = 'disabled',
}

export interface OnboardingConfiguration {
  name: string
  font: string
  next: {
    color: string
    backgroundColor: string
  }
  previous: {
    color: string
    backgroundColor: string
  }
}

export interface Onboarding {
  id?: string
  configuration: OnboardingConfiguration
  encodedName?: string
  welcomeStep: WelcomeStep
  dynamicSteps: DynamicStep[]
  status: OnboardingStatus
}

export enum DynamicStepInputTypes {
  'Text',
  'Textarea',
  'Number',
  'Select',
}

export enum AvailableFonts {
  'Montserrat',
  'Source Sans Pro',
  'Raleway',
}

export interface DynamicStepInput {
  label: string
  name: string
  type: DynamicStepInputTypes
  options?: string[]
  helpText?: string
}

export interface DynamicStep {
  title: string
  description: string
  input: DynamicStepInput
}

export interface StepIcon {
  label: string
  icon: string
}

export interface WelcomeStep {
  title: string
  description: string
  icons: StepIcon[]
  footerButtonText: string
}

export type OnInputChangeType =
  | ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  | undefined

export interface WizardTab {
  key: string
  title: string
  body?: JSX.Element
  bodyWithHandler?: (onChange: OnInputChangeType) => JSX.Element
  footer?: string
  buttonStyles: {
    next: {
      color: string
      backgroundColor: string
    }
    previous?: {
      color: string
      backgroundColor: string
    }
  }
  isDefaultValid: boolean
}

export interface Data {
  id?: string
  onboardingId: string
  data: {
    key: string
    value: string
  }[]
}
