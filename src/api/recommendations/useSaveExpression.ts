import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../APIHandler";
import { useRouter } from "next/navigation";
import { addExpression } from "./recommendationApi";

interface SaveExpressionProps {
  scenarioId: number;
  content: string | undefined;
  translation: string | null;
}

export function useSaveExpression(scenarioId: number) {
  const queryClient = useQueryClient();
  const { mutate: saveExpression, isPending } = useMutation({
    mutationFn: async ({
      scenarioId,
      content,
      translation,
    }: SaveExpressionProps) =>
      addExpression({
        scenarioId,
        content,
        translation,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myMessages"] });
      alert("Expression saved successfully!");
    },
    onError: (error) => {
      alert(`Failed to save expression: ${error.message || "Unknown error"}`);
    },
  });
  return { saveExpression, isPending };
}
