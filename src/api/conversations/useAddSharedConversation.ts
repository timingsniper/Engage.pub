import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../APIHandler";
import useUserStore from "@/stores/useUserStore";

export function useAddSharedConversation(scenarioId: number) {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const { mutate: createConversation, isPending } = useMutation({
    mutationFn: async (title: string) => {
      const data = { title, nickname: user?.name };
      const response = await api.post(
        `/conversation/shared/${scenarioId}`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharedConvo", scenarioId] });
      alert("Conversation successfully shared!");
    },
    onError: () => {
      alert("Failed to share conversation.");
    },
  });

  return { createConversation, isPending };
}
