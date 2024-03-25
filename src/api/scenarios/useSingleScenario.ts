import { useQuery } from "@tanstack/react-query";
import { getSingleScenario } from "./scenarioApi";
import { AxiosError } from "axios";

export default function useSingleScenario(scenarioId: number) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["scenario", scenarioId],
    queryFn: () => getSingleScenario(scenarioId),
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
  return { isLoading, scenario: data?.scenario, error };
}
