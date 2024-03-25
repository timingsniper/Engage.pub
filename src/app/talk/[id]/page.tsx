"use client";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/message";
import useConversation from "@/api/conversations/useConversation";
import useSendMessage from "@/api/conversations/useSendMessage";
import MessageBubble from "@/components/MessageBubble";
import ErrorAlert from "@/components/ErrorAlert";
import ChatInput from "@/components/ChatInput";
import Loader from "@/components/Loader";

export default function TalkPage({ params: { id } }: { params: { id: number } }) {
  const [showError, setShowError] = useState<boolean>(false);
  const scenarioId = id;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { initialLoading, localConversation, setLocalConversation } =
    useConversation(scenarioId);
  const { sendMessage, isSending } = useSendMessage({
    scenarioId,
    setLocalConversation,
    setShowError,
  });

  useEffect(() => {
    // Scroll to the bottom of the chat box for the latest message
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [localConversation]);

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <section className="p-4">
      <ErrorAlert
        showError={showError}
        message="Failed to send message! Try again soon."
      />
      <div ref={messagesEndRef} className="space-y-2 overflow-auto h-[70vh]">
        {localConversation?.map((msg: Message, index: number) => {
          if (msg.role === "system") return null;
          return <MessageBubble key={index} msg={msg} />;
        })}
        {isSending && (
          <div>
            <span className="loading loading-dots loading-sm"></span>
            <span>{"   "}AI is responding...</span>
          </div>
        )}
      </div>
      <ChatInput
        setLocalConversation={setLocalConversation}
        sendMessage={sendMessage}
        isSending={isSending}
      />
    </section>
  );
}
