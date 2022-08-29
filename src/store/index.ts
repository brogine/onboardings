import { combineReducers, configureStore } from '@reduxjs/toolkit'
import dataSliceReducer from '../features/data/dataSlice'
import onboardingsSliceReducer from '../features/onboarding/onboardingsSlice'

const rootReducer = combineReducers({
  onboardings: onboardingsSliceReducer,
  data: dataSliceReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
