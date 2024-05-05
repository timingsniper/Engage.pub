import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../APIHandler";
import { useRouter } from "next/navigation";

export function useDeleteSharedConversation(convoId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: removeSharedConversation, isPending } = useMutation({
    mutationFn: async () => await api.delete(`/conversation/shared/${convoId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sharedConvo"] });
      alert("Conversation deleted successfully");
      router.refresh();
    },
    onError: (error) => {
      alert(`Failed to delete conversation: ${error.message || "Unknown error"}`);
    },
  });
  return { removeSharedConversation, isPending };
}
