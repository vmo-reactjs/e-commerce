import IUser from '@/types/user.type';
import { getAccessTokenFromLS, getCurrentUserFromLS } from '@/utils/auth';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { login, register } from './authAction';

interface AuthState {
  isLoggedIn: boolean;
  logging: boolean;
  currentUser: IUser | null;
  accessToken?: string;
  error?: string | null;
}

const initialState: AuthState = {
  isLoggedIn: Boolean(getAccessTokenFromLS()),
  logging: false,
  currentUser: getCurrentUserFromLS(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.accessToken = undefined;
      state.logging = false;
      state.isLoggedIn = false;
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ------------------ Register ------------------
    builder.addCase(register.pending, (state) => {
      state.logging = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.logging = false;
      state.isLoggedIn = true;
      state.currentUser = payload;
      state.accessToken = payload.token;
      localStorage.setItem('access_token', payload.token);
      localStorage.setItem('current_user', JSON.stringify(payload));
    });
    builder.addCase(register.rejected, (state) => {
      state.logging = false;
      state.isLoggedIn = false;
      state.error = '';
    });
    // ------------------ Login ------------------
    builder.addCase(login.pending, (state) => {
      state.logging = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.logging = false;
      state.isLoggedIn = true;
      state.currentUser = payload;
      state.accessToken = payload.token;
      localStorage.setItem('access_token', payload.token);
      localStorage.setItem('current_user', JSON.stringify(payload));
    });
    builder.addCase(login.rejected, (state) => {
      state.logging = false;
      state.isLoggedIn = false;
      state.error = '';
    });
  },
});

// Actions
export const { logout } = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectLogging = (state: RootState) => state.auth.logging;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

// Reducer
export default authSlice.reducer;
