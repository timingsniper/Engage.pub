import { Message } from "@/types/message";
import { useState } from "react";
import SavedIcon from "./icons/SavedIcon";
import { useParams } from "next/navigation";
import { addMessage } from "@/api/messages/messageApi";
interface MessageBubbleProps {
  msg: Message;
  shared?: boolean;
}

export default function MessageBubble({
  msg,
  shared = false,
}: MessageBubbleProps) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [saved, setSaved] = useState(msg?.saved || false);
  const params = useParams();
  const scenarioId = Number(params.id);

  const toggleFeedback = () => {
    setShowTranslation(!showTranslation);
  };
  const toggleSaved = async () => {
    try {
      const response = await addMessage(
        scenarioId,
        "assistant",
        msg.content,
        msg.translation
      );
      console.log(response);
      setSaved(!saved);
    } catch (error) {
      console.error("Error adding message: " + error);
    }
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
      {msg.translation && showTranslation && (
        <div className="flex justify-start">
          <div className="bg-gray-100 border-l-4 border-[#00c000] text-gray-600 py-2 px-4 rounded-r-lg max-w-xs md:max-w-md self-start mb-3 animate-fade-right">
            {msg.translation}
          </div>
        </div>
      )}
      {(!shared && msg.role === "assistant") && (
        <SavedIcon onClick={toggleSaved} fill={saved ? "#0077C0" : "none"} />
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
