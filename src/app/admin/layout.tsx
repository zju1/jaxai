"use client";

import { Sidebar } from "@/components/admin/Sidebar";
import { useAuthStore } from "@/store/auth";
import { redirect } from "next/navigation";
import { useEffect, type PropsWithChildren } from "react";

export default function AdminLayout(props: PropsWithChildren) {
  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    if (user?.role === "user") {
      redirect("/user");
    }
  }, [user, token]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8">{props.children}</main>
    </div>
  );
}
