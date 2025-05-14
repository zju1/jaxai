"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import type { SingleIssue } from "@/models";

export function CategoryBreakdown({
  data,
  isLoading,
}: {
  data: SingleIssue[];
  isLoading: boolean;
}) {
  const [categoryData, setCategoryData] = useState<
    { category: string; count: number }[]
  >([]);

  useEffect(() => {
    const counts: Record<string, number> = {};

    data.forEach((item) => {
      const category = item.category;
      counts[category] = (counts[category] || 0) + 1;
    });

    const result = Object.entries(counts).map(([category, count]) => ({
      category,
      count,
    }));

    setCategoryData(result);
  }, [data]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "overconsumption":
        return "#dc2626"; // bg-red-600
      case "power_outage":
        return "#4f46e5"; // bg-indigo-600
      case "meter_malfunction":
        return "#ea580c"; // bg-orange-600
      case "low_efficiency":
        return "#eab308"; // bg-yellow-500
      case "tariff_issue":
        return "#2563eb"; // bg-blue-600
      case "technical_fault":
        return "#f43f5e"; // bg-rose-500
      case "power_quality":
        return "#9333ea"; // bg-purple-600
      case "service_complaint":
        return "#ec4899"; // bg-pink-500
      case "data_access_issue":
        return "#06b6d4"; // bg-cyan-600
      case "savings_recommendation":
        return "#10b981"; // bg-emerald-500
      case "other":
        return "#64748b"; // bg-slate-500
      default:
        return "#6b7280"; // bg-gray-500
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

  const chartData = categoryData.map((item) => ({
    name: getCategoryLabel(item.category),
    value: item.count,
    color: getCategoryColor(item.category),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Распределение по категориям</CardTitle>
        <CardDescription>Процентное соотношение типов запросов</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] w-full" />
        ) : categoryData.length > 0 ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${(percent * 100).toFixed(0)}% ${name} `
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            Недостаточно данных для построения диаграммы
          </p>
        )}
      </CardContent>
    </Card>
  );
}
