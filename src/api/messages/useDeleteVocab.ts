import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVocab } from "./messageApi";

export function useDeleteVocab() {
  const queryClient = useQueryClient();
  const { mutate: removeVocab, isPending } = useMutation({
    mutationFn: (vocabId: number) => deleteVocab(vocabId),
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["myVocabs"] });
      alert("Vocabulary successfully deleted!");
    },
    onError: (error) => {
      alert(`Failed to delete vocabulary: ${error.message || "Unknown error"}`);
    },
  });
  return { removeVocab, isPending };
}
