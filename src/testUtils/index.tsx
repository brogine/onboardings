/* eslint-disable @typescript-eslint/ban-types */
import React, { PropsWithChildren } from 'react'
import { render, renderHook } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { Formik } from 'formik'
import type { RootState } from '../store/types'
import onboardingsSliceReducer from '../features/onboarding/onboardingsSlice'
import dataSliceReducer from '../features/data/dataSlice'
import schema from '../components/builder/schema'

const testState = { onboardings: {}, data: {} } as RootState
const rootReducer = combineReducers({
  onboardings: onboardingsSliceReducer,
  data: dataSliceReducer,
})
const testStore = (state: RootState) => {
  return configureStore({ reducer: rootReducer, preloadedState: state })
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: ReturnType<typeof testStore>
}

interface RenderWithFormikProps {
  children: JSX.Element
  formikProps: {
    initialValues: any
    onSubmit: (e: any) => void
  }
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = testState,
    store = testStore(preloadedState as RootState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function renderHookWithProvider(
  hook: Function,
  store = configureStore({ reducer: rootReducer }),
) {
  function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  return renderHook(() => hook(), { wrapper: Wrapper })
}

export const renderWithFormikProvider = ({
  children,
  formikProps: { initialValues, onSubmit },
}: RenderWithFormikProps) => {
  return render(
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={schema}>
      {children}
    </Formik>,
  )
}
