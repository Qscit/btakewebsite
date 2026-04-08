import { Dashboard } from "@/model/dashboard/dashboard.model";
import axiosClient from "./axiosClient";

export const getDashboardSnapshot = async (): Promise<Dashboard> => {   // ← ADD TYPE
  const response = await axiosClient.get(
    "/auth/admin/dashboard"
  );

  return response.data;
};