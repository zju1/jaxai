"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import NewIssueDialog from "./NewIssueDialog";
import { useGet, usePost } from "@/hooks/usePost";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import type { SingleIssue } from "@/models";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
// Перевод категорий на русский
const categoryTranslations: Record<string, string> = {
  overconsumption: "Перерасход",
  power_outage: "Сбои в электроснабжении",
  meter_malfunction: "Неисправность счётчика",
  low_efficiency: "Низкая энергоэффективность",
  tariff_issue: "Вопросы по тарифам",
  technical_fault: "Технические неисправности",
  power_quality: "Качество электроэнергии",
  service_complaint: "Жалобы на обслуживание",
  data_access_issue: "Проблемы доступа к данным",
  savings_recommendation: "Рекомендации по энергосбережению",
  other: "Другое",
};

// Цвета для статусов
const statusColors: Record<string, string> = {
  "В обработке": "bg-yellow-100 text-yellow-800",
  Решено: "bg-green-100 text-green-800",
  "Ожидает ответа": "bg-blue-100 text-blue-800",
};

export default function IssuesTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const post = usePost();
  const get = useGet();
  const { trigger, isMutating } = useSWRMutation<SingleIssue>(
    "/api/issue",
    post(true)
  );
  const {
    data: issues,
    isLoading,
    mutate,
  } = useSWR<SingleIssue[], void, "/api/issue">("/api/issue", get(true));
  const [currentResponse, setCurrentResponse] = useState("");

  const handleNewIssue = async (newIssue: any) => {
    const response = await trigger(newIssue);
    setCurrentResponse(response.response);
    mutate();
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Ваши обращения</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Новое обращение
        </Button>
      </div>
      {isLoading && <h1 className="text-center text-sm py-12">Подождите...</h1>}
      {issues && issues.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            У вас пока нет обращений
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {issues &&
            issues.map((issue) => (
              <Card
                key={issue._id}
                onClick={() => setCurrentResponse(issue.response)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">
                        {categoryTranslations[issue.category]}
                      </CardTitle>
                      <CardDescription>
                        Район: {issue.district} • {issue.createdAt}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{issue.content}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      <NewIssueDialog
        open={isDialogOpen}
        loading={isMutating}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleNewIssue}
      />
      <Dialog
        open={currentResponse.length > 0}
        onOpenChange={(open) => {
          if (!open) {
            setCurrentResponse("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ответ на заявку</DialogTitle>
          </DialogHeader>
          <p>{currentResponse}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCurrentResponse("")}>
              Отмена
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
