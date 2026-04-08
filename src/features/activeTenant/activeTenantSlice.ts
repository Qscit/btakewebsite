import { BookingTenant } from "@/model/dashboard/bookingtenent.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveTenantState {
  data: BookingTenant[];
  loading: boolean;
  totalPages: number;
  page: number;
}

const initialState: ActiveTenantState = {
  data: [],
  loading: false,
  totalPages: 1,
  page: 0,
};

const activeTenantSlice = createSlice({
  name: "activeTenant",
  initialState,
  reducers: {

    activeTenantStart(state) {
      state.loading = true;
    },

    activeTenantSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload.content;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.number;
    },

    activeTenantFailure(state) {
      state.loading = false;
    },

  },
});

export const {
  activeTenantStart,
  activeTenantSuccess,
  activeTenantFailure,
} = activeTenantSlice.actions;

export default activeTenantSlice.reducer;