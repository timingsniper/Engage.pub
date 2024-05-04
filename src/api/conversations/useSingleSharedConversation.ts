"use client";
import { useQuery } from "@tanstack/react-query";
import { api } from "../APIHandler";

export default function useSingleSharedConversation(conversationId: number) {
  const {
    isLoading: initialLoading,
    data: sharedConversation,
    refetch,
  } = useQuery({
    queryKey: ["singleSharedConversation", conversationId],
    queryFn: async () => {
      const response = await api.get(
        `/conversation/shared/view/${conversationId}`
      );
      return response.data;
    },
    staleTime: 10 * 1000 * 60,
  });
  return { initialLoading, sharedConversation, refetch };
}
