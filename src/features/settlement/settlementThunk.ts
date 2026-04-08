import { AppDispatch } from "@/store/store";
import {
  settlementStart,
  settlementSuccess,
  settlementFailure,
} from "./settlementSlice";
import { getMonthlySettlement } from "@/services/dashboardService";

export const fetchMonthlySettlement =
  (year: number, month: number) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(settlementStart());

      const data = await getMonthlySettlement(
        year,
        month
      );

      dispatch(settlementSuccess(data));
    } catch (error: any) {
      dispatch(
        settlementFailure(
          error?.message || "Failed to load"
        )
      );
    }
  };