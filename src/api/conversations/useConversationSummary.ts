"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "../APIHandler";

export default function useConversationSummary(scenarioId: number) {
  const { isLoading: initialLoading, data: summary, refetch, fetchStatus } = useQuery({
    queryKey: ["convSummary", scenarioId],
    queryFn: async () => {
      const response = await api.post(`/conversation/summary/${scenarioId}`);
      return response.data;
    },
    staleTime: 0,
  });
  return { initialLoading, summary, refetch, fetchStatus };
}
