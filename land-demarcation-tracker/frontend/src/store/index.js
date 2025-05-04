// src/store/index.js
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import dashboardReducer from './slices/dashboardSlice'
import { logout } from './slices/authSlice'

// 1️⃣ Combine all your slice reducers
const appReducer = combineReducers({
  auth:      authReducer,
  dashboard:     dashboardReducer,
})

// 2️⃣ Create a root reducer that wipes state on logout
const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    // passing undefined causes every slice to reset to its initialState
    state = undefined
  }
  return appReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
})
