"use client";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/message";
import useConversation from "@/api/conversations/useConversation";
import useSendMessage from "@/api/conversations/useSendMessage";
import MessageBubble from "@/components/MessageBubble";
import ErrorAlert from "@/components/ErrorAlert";
import ChatInput from "@/components/ChatInput";
import Loader from "@/components/Loader";
import { useDeleteConversation } from "@/api/conversations/useDeleteConversation";
import { MouseEvent } from "react";

export default function TalkPage({
  params: { id },
}: {
  params: { id: number };
}) {
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
  const { removeConversation, isPending } = useDeleteConversation(scenarioId);

  const handleDelete = (event: MouseEvent<HTMLAnchorElement>) => {
    let confirmDelete = confirm(
      "Are you sure you want to reset the conversation?"
    );
    if (!confirmDelete) return;
    removeConversation();
  };

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
      <ul className="menu menu-horizontal w-3/4 mb-4">
        <li>
          <a
            className="mr-3 bg-primary text-white"
            aria-disabled={isPending}
            onClick={handleDelete}
          >
            Reset Conversation
          </a>
        </li>
        <li>
          <a className="bg-slate-400 text-white">End Conversation</a>
        </li>
      </ul>
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
