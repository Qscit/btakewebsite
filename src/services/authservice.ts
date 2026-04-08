import { LoginRequest } from "@/model/LoginRequest";
import axiosClient from "./axiosClient";
import { LoginResponse } from "@/model/loginResponse";

export const loginApi = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await axiosClient.post("/auth/login", data);
  return response.data;
};