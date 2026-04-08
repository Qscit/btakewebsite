import { LoginRequest } from "@/model/LoginRequest";
import { loginFailure, loginStart, loginSuccess } from "./authSlice";
import { AppDispatch } from "@/store/store";
import { loginApi } from "@/services/authservice";

export const loginUser =
  (loginData: LoginRequest) =>
  async (dispatch: AppDispatch): Promise<any> => {
    try {
      dispatch(loginStart());

      const data = await loginApi(loginData);

         // Save Tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Save User
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
          roles: data.roles,
        })
      );

      dispatch(
        loginSuccess({
           user: {
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            roles: data.roles,
          },
          token: data.accessToken,
        })
      );

      return data; // ✅ Important
    } catch (error: any) {
      dispatch(loginFailure(error?.message || "Login Failed"));
      throw error; // ✅ Important
    }
  };