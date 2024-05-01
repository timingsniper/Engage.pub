import { useQuery } from "@tanstack/react-query";
import { getMessages } from "./messageApi";
import { AxiosError } from "axios";

export default function useMyMessages(fetchOnDemand: boolean) {
    const { isLoading, data, error } = useQuery({
        queryKey: ["myMessages"],
        queryFn: async () => {
            const response = await getMessages();
            return response;
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
    return { isLoading, messages: data?.messages, error };
}