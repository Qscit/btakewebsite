export const loadAuth = () => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("accessToken");
  const user = localStorage.getItem("user");

  if (token && user) {
    return {
      token,
      user: JSON.parse(user),
      isAuthenticated: true,
    };
  }

  return null;
};