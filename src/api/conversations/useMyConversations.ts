import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../APIHandler";

interface UseMyConversationsProps {
    fetchOnDemand: boolean;
  }

export default function useMyScenario({ fetchOnDemand }: UseMyConversationsProps) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["myConversation"],
    queryFn: async () => {
      const response = await api.get(`/conversation/myConversations`);
      return response.data;
    },
    enabled: fetchOnDemand,
    staleTime: 5 * 60 * 1000,
    retry: (failCount, error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError?.response?.status === 404 ||
        axiosError?.response?.status === 400
      )
        return false; // Don't retry for user that doesn't exist.
      return failCount < 3;
    },
  });
  return { isLoading, conversations: data?.conversations, error };
}
