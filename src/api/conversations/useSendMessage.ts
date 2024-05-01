"use client";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/APIHandler";
import { Message } from "@/types/message";

interface SendMessageProps {
  scenarioId: number;
  setLocalConversation: (
    updateFn: (oldConversation: Message[]) => Message[]
  ) => void;
  setShowError: (errorState: boolean) => void;
}

export default function useSendMessage({
  scenarioId,
  setLocalConversation,
  setShowError,
}: SendMessageProps) {
  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: (newMessage: string) =>
      api.post(`/conversation/${scenarioId}`, { message: newMessage }),
    onSuccess: async (newMsg) => {
      const response: Message = {
        role: "assistant",
        content: newMsg.data.response,
        feedback: null,
        translation: newMsg.data.translation,
      };
      setLocalConversation((oldConversation) => {
        const updatedConversation = [...oldConversation, response];
        // Update the last user's message with the feedback received
        if (
          updatedConversation.length > 1 &&
          updatedConversation[updatedConversation.length - 2].role === "user"
        ) {
          updatedConversation[updatedConversation.length - 2].feedback =
            newMsg.data.feedback;
        }
        return updatedConversation;
      });
       if (newMsg.data.goalMet) {
        console.log("Goal Met!!:", newMsg.data.goalMet); // Ensure this logs as expected
        alert("Goal met!");
      }
    },
    onError: () => {
      setLocalConversation((oldConversation) => oldConversation.slice(0, -1));
      setShowError(true);
      setTimeout(() => setShowError(false), 5000); // Hide error after 5 seconds
    },
  });
  return { sendMessage, isSending };
}
