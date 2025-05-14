"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Clock, Home, Zap } from "lucide-react";
import { useAuthStore } from "@/store/auth";

const navItems = [
  { href: "/admin", label: "Главная", icon: Home, requireAuth: false },
  { href: "/admin/history", label: "История", icon: Clock, requireAuth: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <div className="hidden border-r bg-background md:block md:w-64 lg:w-72">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Zap className="h-8 w-8 text-emerald-500" />
            <span className="text-xl">JAXAI</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            {navItems
              .filter((item) => !item.requireAuth || user)
              .map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-xl font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "transparent"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
          </nav>
        </div>
        <div className="border-t p-4 space-y-4">
          {user && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-medium">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <Link href={"/admin/profile"} className="text-sm font-medium">
                    {user.fullName}
                  </Link>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
