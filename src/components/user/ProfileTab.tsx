"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";

export default function ProfileTab() {
  const { user, logout } = useAuthStore();
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Информация о пользователе</CardTitle>
          <CardDescription>
            Ваши персональные данные и информация об аккаунте
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ФИО</Label>
              <div className="p-2 border rounded-md bg-muted/50">
                {user?.fullName}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Номер телефона</Label>
              <div className="p-2 border rounded-md bg-muted/50">
                {user?.phoneNumber}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Адрес</Label>
              <div className="p-2 border rounded-md bg-muted/50">
                {user?.address}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Номер лицевого счета</Label>
              <div className="p-2 border rounded-md bg-muted/50">
                {user?.accountNumber}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button size="lg" variant="destructive" onClick={() => setConfirm(true)}>
        Выйти
      </Button>
      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Внимание!</DialogTitle>
          </DialogHeader>
          <p>Вы уверены, что хотите выйти?</p>
          <DialogFooter>
            <Button variant="ghost">Нет</Button>
            <Button onClick={logout} variant="destructive">
              Да
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
