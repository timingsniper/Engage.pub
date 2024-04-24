import { Message } from "@/types/message";
import { useState } from "react";

interface MessageBubbleProps {
  msg: Message;
}

export default function MessageBubble({ msg }: MessageBubbleProps) {
  const [showTranslation, setShowTranslation] = useState(false);
  const toggleFeedback = () => {
    setShowTranslation(!showTranslation);
  };
  return (
    <>
      <div
        className={`chat ${
          msg.role === "user"
            ? "chat-end animate-fade-left"
            : "chat-start animate-fade-right"
        }`}
        onClick={toggleFeedback}
      >
        <div
          className={`chat-bubble ${
            msg.role === "user" ? "chat-bubble-primary" : "chat-bubble-success"
          }`}
        >
          {msg.content}
        </div>
      </div>
      {(msg.translation && showTranslation) && (
        <div className="flex justify-start">
          <div className="bg-gray-100 border-l-4 border-[#00c000] text-gray-600 py-2 px-4 rounded-r-lg max-w-xs md:max-w-md self-start mb-3 animate-fade-right">
            {msg.translation}
          </div>
        </div>
      )}
      {msg.feedback && msg.role === "user" && (
        <div className="flex justify-end">
          {msg.feedback !== "完美！" ? (
            <div className="bg-gray-100 border-l-4 border-[#0077C0] text-gray-600 py-2 px-4 rounded-r-lg max-w-xs md:max-w-md self-start mb-3 animate-fade-left">
              {msg.feedback}
            </div>
          ) : (
            <div className="bg-gray-100 border-l-4 border-[#84e24d] text-gray-600 py-2 px-4 rounded-r-lg max-w-xs md:max-w-md self-start mb-3 animate-fade-left">
              {msg.feedback}
            </div>
          )}
        </div>
      )}
    </>
  );
}
