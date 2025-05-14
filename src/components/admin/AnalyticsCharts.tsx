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
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { SingleIssue } from "@/models";
import { formatDate } from "@/lib/utils";

type AggregatedData = {
  date: string;
  count: number;
};

export function AnalyticsCharts({
  data,
  isLoading,
}: {
  data: SingleIssue[];
  isLoading: boolean;
}) {
  const [queryData, setQueryData] = useState<AggregatedData[]>([]);

  useEffect(() => {
    const aggregateData = () => {
      const grouped: Record<string, number> = {};

      data.forEach((item) => {
        const date = item.createdAt;
        if (grouped[date]) {
          grouped[date] += 1;
        } else {
          grouped[date] = 1;
        }
      });

      const result: AggregatedData[] = Object.entries(grouped)
        .map(([date, count]) => ({ date, count }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      setQueryData(result);
    };

    aggregateData();
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Динамика запросов</CardTitle>
        <CardDescription>Количество запросов по дням</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] w-full" />
        ) : queryData.length > 0 ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={queryData}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(item) => formatDate(item)}
                />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            Недостаточно данных для построения графика
          </p>
        )}
      </CardContent>
    </Card>
  );
}
