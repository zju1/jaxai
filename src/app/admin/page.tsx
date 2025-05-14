"use client";

import { AnalyticsCharts } from "@/components/admin/AnalyticsCharts";
import { AnalyticsHeader } from "@/components/admin/AnalyticsHeader";
import { CategoryBreakdown } from "@/components/admin/CategoryBreakdown";
import { useGet } from "@/hooks/usePost";
import type { SingleIssue } from "@/models";
import useSWR from "swr";

export default function HomePage() {
  const get = useGet();
  const {
    data: issues,
    isLoading,
    mutate,
  } = useSWR<SingleIssue[], void, "/api/all-issue">(
    "/api/all-issue",
    get(true)
  );

  return (
    <div className="space-y-8">
      <AnalyticsHeader />
      <div className="grid gap-6 md:grid-cols-2">
        <AnalyticsCharts data={issues ? issues : []} isLoading={isLoading} />
        <CategoryBreakdown data={issues ? issues : []} isLoading={isLoading} />
      </div>
    </div>
  );
}
