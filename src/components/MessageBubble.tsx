import { Message } from "@/types/message";

interface MessageBubbleProps {
  msg: Message;
}

export default function MessageBubble({ msg }: MessageBubbleProps) {
  return (
    <div
      className={`chat ${
        msg.role === "user"
          ? "chat-end animate-fade-left"
          : "chat-start animate-fade-right"
      }`}
    >
      <div
        className={`chat-bubble ${
          msg.role === "user" ? "chat-bubble-primary" : "chat-bubble-success"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}
