"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import type { SingleIssue } from "@/models";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
export function HistoryList({
  data,
  isLoading,
}: {
  data: SingleIssue[];
  isLoading: boolean;
}) {
  const [queries, setQueries] = useState<SingleIssue[]>([]);
  const [filteredQueries, setFilteredQueries] = useState<SingleIssue[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    setQueries(data as SingleIssue[]);
  }, [data]);

  useEffect(() => {
    let filtered = queries;

    if (searchTerm) {
      filtered = filtered.filter(
        (query) =>
          query.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          query.response.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((query) => query.category === categoryFilter);
    }

    setFilteredQueries(filtered);
  }, [searchTerm, categoryFilter, queries]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "overconsumption":
        return "bg-red-600";
      case "power_outage":
        return "bg-indigo-600";
      case "meter_malfunction":
        return "bg-orange-600";
      case "low_efficiency":
        return "bg-yellow-500";
      case "tariff_issue":
        return "bg-blue-600";
      case "technical_fault":
        return "bg-rose-500";
      case "power_quality":
        return "bg-purple-600";
      case "service_complaint":
        return "bg-pink-500";
      case "data_access_issue":
        return "bg-cyan-600";
      case "savings_recommendation":
        return "bg-emerald-500";
      case "other":
        return "bg-slate-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "overconsumption":
        return "Перерасход";
      case "power_outage":
        return "Сбои в электроснабжении";
      case "meter_malfunction":
        return "Неисправность счётчика";
      case "low_efficiency":
        return "Низкая энергоэффективность";
      case "tariff_issue":
        return "Вопросы по тарифам";
      case "technical_fault":
        return "Технические неисправности";
      case "power_quality":
        return "Качество электроэнергии";
      case "service_complaint":
        return "Жалобы на обслуживание";
      case "data_access_issue":
        return "Проблемы доступа к данным";
      case "savings_recommendation":
        return "Рекомендации по энергосбережению";
      case "other":
        return "Другое";
      default:
        return "Неизвестная категория";
    }
  };
  const [selectedQuery, setSelectedQuery] = useState<SingleIssue | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Поиск по запросам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-2/3"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Фильтр по категории" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            <SelectItem value="overconsumption">Перерасход</SelectItem>
            <SelectItem value="power_outage">
              Сбои в электроснабжении
            </SelectItem>
            <SelectItem value="meter_malfunction">
              Неисправность счётчика
            </SelectItem>
            <SelectItem value="low_efficiency">
              Низкая энергоэффективность
            </SelectItem>
            <SelectItem value="tariff_issue">Вопросы по тарифам</SelectItem>
            <SelectItem value="technical_fault">
              Технические неисправности
            </SelectItem>
            <SelectItem value="power_quality">
              Качество электроэнергии
            </SelectItem>
            <SelectItem value="service_complaint">
              Жалобы на обслуживание
            </SelectItem>
            <SelectItem value="data_access_issue">
              Проблемы доступа к данным
            </SelectItem>
            <SelectItem value="savings_recommendation">
              Рекомендации по энергосбережению
            </SelectItem>
            <SelectItem value="other">Другое</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-1/4" />
                  <div className="h-4 w-1/6" />
                </div>
                <div className="h-16 w-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : filteredQueries.length > 0 ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="space-y-4">
            {filteredQueries.map((query) => (
              <DialogTrigger
                key={query._id}
                asChild
                onClick={() => {
                  setSelectedQuery(query);
                  setIsDialogOpen(true);
                }}
              >
                <Card className="p-4 cursor-pointer hover:shadow-md transition">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(query.createdAt)}
                      </p>
                      <Badge className={getCategoryColor(query.category)}>
                        {getCategoryLabel(query.category)}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium line-clamp-2">
                        {query.content}
                      </p>
                      <p className="whitespace-pre-line bg-muted rounded-md px-3 text-sm line-clamp-3">
                        {query.response}
                      </p>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
            ))}
          </div>

          {selectedQuery && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {getCategoryLabel(selectedQuery.category)}
                </DialogTitle>
                <DialogDescription>
                  {formatDate(selectedQuery.createdAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <p className="font-semibold mb-1">Запрос:</p>
                  <p>{selectedQuery.content}</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Ответ:</p>
                  <p className="whitespace-pre-line bg-muted rounded-md p-3 text-sm">
                    {selectedQuery.response}
                  </p>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      ) : (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">
            {queries.length > 0
              ? "Нет запросов, соответствующих фильтрам"
              : "История запросов пуста"}
          </p>
        </div>
      )}
    </div>
  );
}
