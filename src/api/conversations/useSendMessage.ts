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
    onSuccess: (newMsg) => {
      const response: Message = {
        role: "assistant",
        content: newMsg.data.response,
      };
      setLocalConversation((oldConversation) => [...oldConversation, response]);
    },
    onError: () => {
      setLocalConversation((oldConversation) => oldConversation.slice(0, -1));
      setShowError(true);
      setTimeout(() => setShowError(false), 5000); // Hide error after 5 seconds
    },
  });
  return { sendMessage, isSending };
}
