import { BarChart3 } from "lucide-react";

export function AnalyticsHeader() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-emerald-500" />
        <h1 className="text-3xl font-bold tracking-tight">Аналитика</h1>
      </div>
      <p className="text-muted-foreground">
        Статистика и визуализация данных по запросам пользователей
      </p>
    </div>
  );
}
