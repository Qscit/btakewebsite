import { Dashboard } from "@/model/dashboard/dashboard.model";
import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
  data: Dashboard | null;
  loading: boolean;
  error: boolean;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {

    dashboardStart: (state) => {
      state.loading = true;
    },

    dashboardSuccess: (state, action: { payload: Dashboard }) => {
      state.loading = false;
      state.data = action.payload;
    },

    dashboardFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

  },
});

export const {
  dashboardStart,
  dashboardSuccess,
  dashboardFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;