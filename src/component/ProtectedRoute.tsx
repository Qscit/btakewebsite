"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!isAuthenticated && !token) {
      router.push("/login");
    }

    setLoading(false);
  }, [isAuthenticated]);

  if (loading) return null;

  return children;
}