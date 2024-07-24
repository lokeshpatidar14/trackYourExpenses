import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  token: localStorage.getItem('token') || '',
  isLoggedIn: !!localStorage.getItem('token'),
  displayName: '',
  photoUrl: '',
  emailVerified: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.token = '';
      state.isLoggedIn = false;
      state.displayName = '';
      state.photoUrl = '';
      state.emailVerified = false;
      localStorage.removeItem('token');
    },
    updateProfile(state, action) {
      state.displayName = action.payload.displayName;
      state.photoUrl = action.payload.photoUrl;
    },
    setEmailVerified(state, action) {
      state.emailVerified = action.payload;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
