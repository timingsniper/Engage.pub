import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScenario } from "./scenarioApi";
import { useRouter } from "next/navigation";

export function useDeleteScenario() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: removeScenario, isPending } = useMutation({
    mutationFn: (scenarioId: number) => deleteScenario(scenarioId),
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["scenarios"] });
      queryClient.invalidateQueries({ queryKey: ["myScenario"] });
      alert("Scenario successfully deleted!");
      router.push("/mypub");
    },
    onError: (error) => {
      alert(`Failed to delete scenario: ${error.message || "Unknown error"}`);
    },
  });

  return { removeScenario, isPending };
}
