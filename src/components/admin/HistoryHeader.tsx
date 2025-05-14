import { Clock } from "lucide-react";

export function HistoryHeader() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Clock className="h-6 w-6 text-emerald-500" />
        <h1 className="text-3xl font-bold tracking-tight">История запросов</h1>
      </div>
      <p className="text-muted-foreground">
        Просмотр всех предыдущих запросов и ответов системы
      </p>
    </div>
  );
}
