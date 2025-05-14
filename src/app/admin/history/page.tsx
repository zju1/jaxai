"use client";

import { HistoryHeader } from "@/components/admin/HistoryHeader";
import { HistoryList } from "@/components/admin/HistoryList";
import { useGet } from "@/hooks/usePost";
import type { SingleIssue } from "@/models";
import useSWR from "swr";

export default function HistoryPage() {
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
    <div className="space-y-6">
      <HistoryHeader />
      <HistoryList data={issues as SingleIssue[]} isLoading={isLoading} />
    </div>
  );
}
