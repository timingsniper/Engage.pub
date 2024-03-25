import { Message } from "@/types/message";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";

interface ChatInputProps {
  setLocalConversation: (
    updateFn: (oldConversation: Message[]) => Message[]
  ) => void;
  sendMessage: UseMutateFunction<AxiosResponse<any>, unknown, string, unknown>;
  isSending: boolean;
}

export default function ChatInput({
  setLocalConversation,
  sendMessage,
  isSending,
}: ChatInputProps) {
  const [message, setMessage] = useState<string>("");
  const handleSend = () => {
    if (!message.trim()) return; // Prevent sending empty messages
    const optimisticUpdate: Message = {
      role: "user",
      content: message,
    };
    setLocalConversation((oldConversation) => [
      ...oldConversation,
      optimisticUpdate,
    ]);
    sendMessage(message);
    setMessage("");
  };
  return (
    <div className="form-control mt-4">
      <input
        type="text"
        placeholder="Type your message..."
        className="input input-bordered w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && handleSend();
        }}
        disabled={isSending}
      />
      {isSending ? (
        <button className="btn" disabled>
          <span className="loading loading-spinner"></span>
          Waiting Response..
        </button>
      ) : (
        <button className="btn btn-primary mt-2" onClick={handleSend}>
          Send
        </button>
      )}
    </div>
  );
}
