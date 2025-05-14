"use client";

import { useAuthStore } from "@/store/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { token, user } = useAuthStore();

  useEffect(() => {
    setTimeout(() => {
      if (!token) {
        redirect("/login");
      } else {
        if (user?.role === "admin") {
          redirect("/admin");
        } else {
          redirect("/user");
        }
      }
    }, 300);
  }, [token]);

  return null;
}
