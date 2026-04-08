import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
     loginSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
   loginFailure: (state) => {
      state.loading = false;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;