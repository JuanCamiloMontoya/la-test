import { createSlice } from '@reduxjs/toolkit'
import { toDoInitialState } from './ToDoInitialState'
import { toDoThunks } from './ToDoThunks'

const initialState = toDoInitialState()
const thunks = toDoThunks()
const { getFacts } = thunks

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    resetStatus(state, { payload }) {
      state.error[payload] = initialState.error[payload]
      state.status[payload] = initialState.status[payload]
    },
    addToDo(state, { payload }) {
      const list = state.toDoList.map(({ key }) => key)
      const max = list.length > 0 ? Math.max(...list) : 0
      state.toDoList.push({
        key: max + 1,
        description: payload,
        complete: false
      })
    },
    updateToDo(state, { payload }) {
      const toDoIndex = state.toDoList.findIndex(({ key }) => key === payload.key)
      state.toDoList[toDoIndex].description = payload.description
    },
    updateStatus(state, { payload }) {
      const toDoIndex = state.toDoList.findIndex(({ key }) => key === payload.key)
      state.toDoList[toDoIndex].complete = payload.status
    },
    deleteToDo(state, { payload }) {
      const toDoIndex = state.toDoList.findIndex(({ key }) => key === payload)
      state.toDoList.splice(toDoIndex, 1)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFacts.pending, (state) => {
        state.status.getFacts = 'loading'
        state.error.getFacts = null
      })
      .addCase(getFacts.fulfilled, (state, { payload }) => {
        const list = state.toDoList.map(({ key }) => key)
        let max = list.length > 0 ? Math.max(...list) : 0
        let endData = []
        for (const data of payload) {
          endData.push({
            key: max + 1,
            description: data.fact,
            complete: false
          })
          max++
        }
        state.toDoList = [...state.toDoList, ...endData]
        state.status.getFacts = 'idle'
      })
      .addCase(getFacts.rejected, (state, { payload }) => {
        state.status.getFacts = 'error'
        state.error.getFacts = payload
      })
  }
})

const toDoActions = { ...toDoSlice.actions, ...thunks }
const toDoReducer = toDoSlice.reducer

export { toDoActions, toDoReducer }