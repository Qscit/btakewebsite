import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

/**
 * Axios Instance
 */
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 */
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
      }
    }

    if (error.response?.status === 500) {
      console.error("Server Error");
    }

    if (!error.response) {
      console.error("Network Error");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;