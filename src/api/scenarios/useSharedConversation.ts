import { useQuery } from "@tanstack/react-query";
import { getSharedConversations } from "./scenarioApi";
import { AxiosError } from "axios";

export default function useSharedConversation(scenarioId: number) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["sharedConvo", scenarioId],
    queryFn: () => getSharedConversations(scenarioId),
    staleTime: 5 * 60 * 1000,
    retry: (failCount, error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      if (
        axiosError?.response?.status === 404 ||
        axiosError?.response?.status === 400
      )
        return false; // Don't retry for scenario that doesn't exist.
      return failCount < 3;
    },
  });
  return { isLoading, sharedConvo: data?.sharedConversations, error };
}
