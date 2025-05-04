import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    circles: [],
    officers: [],
};
  
// Load initial state from localStorage if available
const userFromStorage = localStorage.getItem('user');
if (userFromStorage) {
    initialState.user = JSON.parse(userFromStorage);
    initialState.isAuthenticated = true;
}
  
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      },
      setCirclesAndOfficers: (state, action) => {
        const { circles, officers } = action.payload;
        state.circles = circles;
        state.officers = officers;
      },
      logout: (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('user');
      }
    },
});
  
export const { login, logout, setCirclesAndOfficers } = authSlice.actions;
export default authSlice.reducer;