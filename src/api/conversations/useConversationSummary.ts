"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "../APIHandler";

export default function useConversationSummary(scenarioId: number) {
  const { isLoading: initialLoading, data: summary, refetch } = useQuery({
    queryKey: ["convSummary", scenarioId],
    queryFn: async () => {
      const response = await api.post(`/conversation/summary/${scenarioId}`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
  return { initialLoading, summary, refetch };
}
