import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../APIHandler";
import { useRouter } from "next/navigation";

export function useDeleteConversation(scenarioId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: removeConversation, isPending } = useMutation({
    mutationFn: async () => await api.delete(`/conversation/${scenarioId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversation", scenarioId] });
      alert("Conversation successfully deleted!");
      router.refresh();
    },
    onError: (error) => {
      alert(`Failed to delete conversation: ${error.message || "Unknown error"}`);
    },
  });
  return { removeConversation, isPending };
}
