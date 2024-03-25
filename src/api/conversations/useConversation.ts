"use client";
import { useState } from "react";
import { Message } from "@/types/message";
import { useQuery } from "@tanstack/react-query";
import { api } from "../APIHandler";

export default function useConversation(scenarioId: number) {
  const [localConversation, setLocalConversation] = useState<Message[]>([]);
  const { isLoading: initialLoading, refetch } = useQuery({
    queryKey: ["conversation", scenarioId],
    queryFn: async () => {
      const response = await api.get(`/conversation/${scenarioId}`);
      setLocalConversation(response.data);
      return response.data;
    },
    enabled: !!scenarioId,
    staleTime: 0,
  });
  return { initialLoading, localConversation, setLocalConversation, refetch };
}
