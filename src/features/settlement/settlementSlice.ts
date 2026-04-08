import { Settlement } from "@/model/dashboard/settlement.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettlementState {
  loading: boolean;
  settlements: Settlement[];
  error: string | null;
  selectedMonth: number;
  selectedYear: number;
}
const today = new Date();
const initialState: SettlementState = {
  loading: false,
  settlements: [],
  error: null,
  selectedMonth: today.getMonth() + 1,
  selectedYear: today.getFullYear(),
};

const settlementSlice = createSlice({
  name: "settlement",
  initialState,
  reducers: {
    settlementStart(state) {
      state.loading = true;
    },

    settlementSuccess(
      state,
      action: PayloadAction<Settlement[]>
    ) {
      state.loading = false;
      state.settlements = action.payload;
    },

    settlementFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ Add This
    setSelectedMonth(
      state,
      action: PayloadAction<{
        month: number;
        year: number;
      }>
    ) {
      state.selectedMonth = action.payload.month;
      state.selectedYear = action.payload.year;
    },
  },
});

export const {
  settlementStart,
  settlementSuccess,
  settlementFailure,
  setSelectedMonth,
} = settlementSlice.actions;

export default settlementSlice.reducer;