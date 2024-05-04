"use client";
import useSingleSharedConversation from "@/api/conversations/useSingleSharedConversation";
import Loader from "@/components/Loader";
import MessageBubble from "@/components/MessageBubble";
import { Message } from "@/types/message";
import { useRef } from "react";

export default function SharedConversationView({
  params: { id },
}: {
  params: { id: number };
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { initialLoading, sharedConversation, refetch } =
    useSingleSharedConversation(id);

  if (initialLoading) {
    return <Loader />;
  }
  return (
    <section className="p-4">
      <div ref={messagesEndRef} className="space-y-2 overflow-auto h-[70vh]">
        {sharedConversation?.map((msg: Message, index: number) => {
          if (msg.role === "system") return null;
          return <MessageBubble key={index} msg={msg} shared={true} />;
        })}
      </div>
    </section>
  );
}
