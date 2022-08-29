import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { Onboarding } from '../../types'

const onboardingsAdapter = createEntityAdapter<Onboarding>()

export const onboardingsSlice = createSlice({
  name: 'onboardings',
  initialState: onboardingsAdapter.getInitialState(),
  reducers: {
    createOnboarding: (state, { payload }: { payload: Onboarding }) => {
      onboardingsAdapter.addOne(state, {
        ...payload,
        id: Math.random().toString(36).substring(2, 9), // This should be generated in API
        encodedName: encodeURI(payload.configuration.name.replaceAll(' ', '_')),
      })
    },
    updateOnboarding: (state, { payload }: { payload: Onboarding }) => {
      const changes = {
        ...payload,
        encodedName: encodeURI(payload.configuration.name.replaceAll(' ', '_')),
      }
      if (payload.id !== undefined) onboardingsAdapter.updateOne(state, { id: payload.id, changes })
    },
    removeOnboarding: onboardingsAdapter.removeOne,
  },
})

export const { createOnboarding, updateOnboarding, removeOnboarding } = onboardingsSlice.actions

export const { selectAll, selectById } = onboardingsAdapter.getSelectors()

export default onboardingsSlice.reducer
