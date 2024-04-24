import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateScenarioModuleProps } from "@/types/CreateScenarioProps";
import { editScenario } from "./scenarioApi";
import { useRouter } from "next/navigation";

export function useEditScenario(scenarioId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: modifyScenario, isPending } = useMutation({
    mutationFn: ({
      scenarioId,
      authorEmail,
      title,
      settings,
      aiSetting,
      mission,
      startingMessage,
      imageUrl,
    }: CreateScenarioModuleProps & { scenarioId: number }) =>
      editScenario({
        scenarioId,
        authorEmail,
        title,
        settings,
        aiSetting,
        mission,
        startingMessage,
        imageUrl,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scenarios"] });
      queryClient.invalidateQueries({ queryKey: ["myScenario"] });
      queryClient.invalidateQueries({ queryKey: ["scenario", scenarioId] });
      alert("Scenario succesfully edited!");
      router.push("/mypub");
    },
    onError: () => {
      alert("Failed to create scenario.");
    },
  });

  return { modifyScenario, isPending };
}
