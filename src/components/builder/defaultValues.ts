import {
  DynamicStepInputTypes,
  WelcomeStep,
  DynamicStep,
  Onboarding,
  OnboardingStatus,
} from '../../types'

export const newStepSchema = {
  title: '',
  description: '',
  input: {
    type: DynamicStepInputTypes.Text,
    title: '',
    label: '',
    name: '',
    helpText: '',
    options: [],
  },
} as DynamicStep

export const welcomeStep = {
  title: 'Going electric starts with understaing your needs',
  description:
    'We need to understand your requirements so we can recommend the appropiate electric vehicle, charger and identify incentives.',
  footerButtonText: 'CREATE YOUR FIRST VEHICLE SET',
  icons: [
    { label: 'Tell us about your organization', icon: 'CompassOutlined' },
    { label: 'Tell us about your vehicles', icon: 'CarOutlined' },
    { label: 'See how much you can save', icon: 'LineChartOutlined' },
  ],
} as WelcomeStep

export const defaultConfiguration = {
  name: '',
  font: '',
  next: {
    color: '#FFFFFF',
    backgroundColor: '#0d6efd',
  },
  previous: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
}

export const initialValues = {
  configuration: defaultConfiguration,
  welcomeStep,
  dynamicSteps: [] as DynamicStep[],
  status: OnboardingStatus.active,
} as Onboarding
