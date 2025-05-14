"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { geistSans } from "@/lib/fonts";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useAuthStore, type IUser } from "@/store/auth";
import { redirect } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { usePost } from "@/hooks/usePost";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const post = usePost();
  const { token, setToken, setUser, user } = useAuthStore();
  const { trigger, isMutating } = useSWRMutation<
    { token: string; user: IUser },
    void,
    "/api/auth/signin",
    { phoneNumber: string; password: string }
  >("/api/auth/signin", post());

  useEffect(() => {
    if (token) {
      if (user?.role === "admin") {
        redirect("/admin");
      } else {
        redirect("/user");
      }
    }
  }, [token]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await trigger({
          password,
          phoneNumber,
        });
        setToken(response.token);
        setUser(response.user);
      } catch (error) {
        toast.error("Неверное имя пользователя или пароль");
      }
    },
    [phoneNumber, password]
  );

  return (
    <div
      className={cn("flex flex-col gap-6", className, geistSans.className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className={`text-2xl`}>
            Войдите в свою учетную запись
          </CardTitle>
          <CardDescription>
            Введите свой номер телефона ниже, чтобы войти в свою учетную запись
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="phoneNumber">Номер телефона</Label>
                <Input
                  id="phoneNumber"
                  type="phoneNumber"
                  placeholder="+998990359354"
                  required
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Пароль</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button disabled={isMutating} type="submit" className="w-full">
                  Авторизоваться
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
