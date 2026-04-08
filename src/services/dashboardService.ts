import { Dashboard } from "@/model/dashboard/dashboard.model";
import axiosClient from "./axiosClient";
import { BookingTenant } from "@/model/dashboard/bookingtenent.model";
import { PaginatedResponse } from "@/model/paginationResponse.model";
import { Settlement } from "@/model/dashboard/settlement.model";

export const getDashboardSnapshot = async (): Promise<Dashboard> => {   // ← ADD TYPE
  const response = await axiosClient.get(
    "/auth/admin/dashboard"
  );

  return response.data;
};

export const getPaginatedActiveTenant = async (
  page: number,
  size: number
): Promise<PaginatedResponse<BookingTenant>> => {

  const response = await axiosClient.get(
    "/auth/admin/all-active-tenant",
    {
      params: {
        page,
        size
      }
    }
  );

  return response.data;
};

export const getMonthlySettlement = async (
  year: number,
  month: number
) => {
  const response = await axiosClient.get(
    `/auth/admin/monthly-settlement?year=${year}&month=${month}`
  );

  return response.data;
};