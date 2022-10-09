import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import persistedReducer from './Reducers'

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    }).concat(logger)
  )
})

const persistor = persistStore(store)

export { store, persistor }