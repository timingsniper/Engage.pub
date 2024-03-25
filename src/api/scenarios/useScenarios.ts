import { useInfiniteQuery } from "@tanstack/react-query";
import { getScenarios } from "./scenarioApi";

export default function useScenarios() {
  return useInfiniteQuery({
    queryKey: ["scenarios"],
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    queryFn: async ({ pageParam }) => {
      const data = await getScenarios(pageParam);
      return { scenarios: data.scenarios, nextPage: data.nextPage };
    },
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
  });
}
