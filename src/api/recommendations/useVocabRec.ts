import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../APIHandler";

export default function useVocabRec(scenarioId: number) {
  const { isFetching, data: recVocab, error, refetch: refetchVocab } = useQuery({
    queryKey: ["vocabRec", scenarioId],
    queryFn: async () => {
        const response = await api.get(`/recommendation/vocab/${scenarioId}`);
        return response.data;
    },
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
  return { isFetching, recVocab, error, refetchVocab };
}
