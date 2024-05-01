import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage } from "./messageApi";

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  const { mutate: removeMessage, isPending } = useMutation({
    mutationFn: (messageId: number) => deleteMessage(messageId),
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["myMessages"] });
      alert("Message successfully deleted!");
    },
    onError: (error) => {
      alert(`Failed to delete message: ${error.message || "Unknown error"}`);
    },
  });
  return { removeMessage, isPending };
}
