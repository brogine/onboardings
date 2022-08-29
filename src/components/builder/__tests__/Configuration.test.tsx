import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { FormikErrors } from 'formik'
import { renderWithFormikProvider } from '../../../testUtils'
import { OnboardingConfiguration } from '../../../types'
import Configuration from '../Configuration'
import { initialValues } from '../defaultValues'

describe('Configuration', () => {
  const props = {
    errors: {},
  }

  test('renders inputs correctly', () => {
    renderWithFormikProvider({
      children: <Configuration {...props} />,
      formikProps: { initialValues, onSubmit: jest.fn() },
    })

    expect(screen.getByLabelText(/^Onboarding name$/)).toBeVisible()
    expect(screen.getByLabelText(/^Font$/)).toBeVisible()
    expect(screen.getByLabelText(/^Next button background$/)).toBeVisible()
    expect(screen.getByLabelText(/^Next button text$/)).toBeVisible()
    expect(screen.getByLabelText(/^Previous button background$/)).toBeVisible()
    expect(screen.getByLabelText(/^Previous button text$/)).toBeVisible()
  })
})
