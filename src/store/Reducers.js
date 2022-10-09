import { combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { toDoReducer } from "../services/ToDo/ToDoSlice"

const reducers = combineReducers({
  toDo: toDoReducer
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default persistedReducer