import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../APIHandler";

export default function useUserLevel() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userLevel"],
    queryFn: async () => {
        const response = await api.get(`/user/level`);
        return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24 * 365, // A year, basically always fresh
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
  return { isLoading, level: data?.level, error };
}
