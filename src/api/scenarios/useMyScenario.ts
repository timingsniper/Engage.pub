import { useQuery } from "@tanstack/react-query";
import { getMyScenarios } from "./scenarioApi";
import { AxiosError } from "axios";

export default function useMyScenario() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["myScenario"],
    queryFn: () => getMyScenarios(),
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
  return { isLoading, scenario: data?.scenarios, error };
}
