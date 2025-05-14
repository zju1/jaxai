"use client";

import { useAuthStore } from "@/store/auth";
import { redirect } from "next/navigation";
import { useEffect, type PropsWithChildren } from "react";

export default function UserLayout(props: PropsWithChildren) {
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    if (user?.role === "admin") {
      redirect("/admin");
    }
  }, [user, token]);

  return props.children;
}
