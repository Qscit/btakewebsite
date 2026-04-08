import { AppDispatch } from "@/store/store";
import { getDashboardSnapshot } from "@/services/dashboardService";
import { dashboardFailure, dashboardStart, dashboardSuccess } from "./dashboardSlice";

export const fetchDashboard =
  () => async (dispatch: AppDispatch) => {
    try {
      dispatch(dashboardStart());

      const data = await getDashboardSnapshot();

      dispatch(dashboardSuccess(data));
    } catch (error) {
      dispatch(dashboardFailure());
    }
  };