import { AppDispatch } from "@/store/store";
import { getPaginatedActiveTenant } from "@/services/dashboardService";

import {
  activeTenantStart,
  activeTenantSuccess,
  activeTenantFailure,
} from "./activeTenantSlice";

export const fetchActiveTenants =
  (page: number) =>
  async (dispatch: AppDispatch) => {

    try {
      dispatch(activeTenantStart());

      const data =
        await getPaginatedActiveTenant(page, 20);

      dispatch(activeTenantSuccess(data));

    } catch {
      dispatch(activeTenantFailure());
    }
  };