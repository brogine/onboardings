import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../../testUtils'
import MainForm from '../MainForm'
import { initialValues, welcomeStep } from '../defaultValues'
import { RootState } from '../../../store/types'

describe('Configuration', () => {
  const props = {
    id: undefined,
    notifySubmit: jest.fn(),
  }

  test('when no ID is provided', () => {
    renderWithProviders(<MainForm {...props} />)

    expect(screen.getByText(/^New Onboarding$/)).toBeVisible()
    expect(screen.getByText(/^Steps$/)).toBeVisible()
    expect(screen.getByText(/^Submit$/)).toBeVisible()
    expect(screen.getByLabelText(/^Step title$/)).toHaveDisplayValue(welcomeStep.title)
    expect(screen.getByLabelText(/^Step description$/)).toHaveDisplayValue(welcomeStep.description)
    const iconsLabels = screen.getAllByLabelText(/^Label for the icon$/)
    expect(iconsLabels.length).toBe(3)
    expect(iconsLabels[0]).toHaveDisplayValue(welcomeStep.icons[0].label)
    expect(iconsLabels[1]).toHaveDisplayValue(welcomeStep.icons[1].label)
    expect(iconsLabels[2]).toHaveDisplayValue(welcomeStep.icons[2].label)
  })

  test('when ID is provided', () => {
    const mockedState = {
      onboardings: {
        ids: ['id'],
        entities: {
          id: {
            ...initialValues,
            id: 'id',
            configuration: { ...initialValues.configuration, name: 'test' },
          },
        },
      },
      data: {},
    } as unknown as RootState
    renderWithProviders(<MainForm id="id" notifySubmit={props.notifySubmit} />, {
      preloadedState: mockedState,
    })

    expect(screen.getByText(/^Edit Onboarding$/)).toBeVisible()
    expect(screen.getByLabelText(/^Onboarding name$/)).toHaveDisplayValue('test')
  })
})
