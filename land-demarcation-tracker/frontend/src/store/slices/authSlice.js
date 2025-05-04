import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false
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
      logout: (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem('user');
      }
    },
});
  
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;