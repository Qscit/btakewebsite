export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  email: string;
  phoneNumber: string;
  roles: string[];
}