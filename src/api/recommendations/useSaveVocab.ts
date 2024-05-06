import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addVocab } from "./recommendationApi";

interface SaveExpressionProps {
  scenarioId: number;
  content: string | undefined;
  translation: string | null;
}

export function useSaveVocab(scenarioId: number) {
  const queryClient = useQueryClient();
  const { mutate: saveVocab, isPending } = useMutation({
    mutationFn: async ({
      scenarioId,
      content,
      translation,
    }: SaveExpressionProps) =>
      addVocab({
        scenarioId,
        content,
        translation,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myVocabs"] });
      alert("Vocabulary saved successfully!");
    },
    onError: (error) => {
      alert(`Failed to save vocabulary: ${error.message || "Unknown error"}`);
    },
  });
  return { saveVocab, isPending };
}
