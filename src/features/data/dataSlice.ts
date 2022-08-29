import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { Data } from '../../types'

const dataAdapter = createEntityAdapter<Data>()

export const dataSlice = createSlice({
  name: 'data',
  initialState: dataAdapter.getInitialState(),
  reducers: {
    createData: (state, { payload }: { payload: Data }) => {
      dataAdapter.addOne(state, {
        ...payload,
        id: Math.random().toString(36).substring(2, 9), // This should be generated in API
      })
    },
    updateData: dataAdapter.updateOne,
    removeData: dataAdapter.removeOne,
    setData: dataAdapter.setOne,
    setDatas: dataAdapter.setAll,
  },
})

export const { createData, updateData, removeData } = dataSlice.actions

export const { selectAll, selectById } = dataAdapter.getSelectors()

export default dataSlice.reducer
