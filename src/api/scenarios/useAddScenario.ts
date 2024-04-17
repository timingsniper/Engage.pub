import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateScenarioModuleProps } from "@/types/CreateScenarioProps";
import { addScenario } from "./scenarioApi";
import { useRouter } from "next/navigation";

export function useAddScenario() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: createScenario } = useMutation({
    mutationFn: ({
      authorEmail,
      title,
      settings,
      aiSetting,
      mission,
      startingMessage,
    }: CreateScenarioModuleProps) =>
      addScenario({
        authorEmail,
        title,
        settings,
        aiSetting,
        mission,
        startingMessage,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scenarios"] });
      alert("Scenario succesfully created!");
      router.push("/");
    },
    onError: () => {
      alert("Failed to create scenario.");
    },
  });

  return { createScenario };
}
