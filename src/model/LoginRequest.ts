export interface LoginRequest {
  email: string;
  password: string;
  deviceId: string;
  deviceModel: string;
  platform: string;
  fcmToken: string;
  appType: string;
}