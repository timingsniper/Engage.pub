import React, { useState, useRef } from "react";
import { api } from "@/api/APIHandler";

interface VTTButtonProps {
  setMessage: (message: string) => void;
}

export default function VoiceToTextButton({ setMessage }: VTTButtonProps) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        const formData = new FormData();
        formData.append("audio", audioBlob, "audio-file.mp3");
        try {
          const response = await api.post("/conversation/speak/vtt", formData);
          setMessage(response.data.text);
        } catch (error) {
          console.error("Error converting speech to text:", error);
        }
        setIsRecording(false);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } else {
      alert("Microphone access is denied or not supported by your browser.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  return (
    <div>
      {isRecording ? (
        <button className="btn btn-[red] w-full" onClick={stopRecording}>
          Stop Speaking
        </button>
      ) : (
        <button className="btn btn-secondary w-full" onClick={startRecording}>
          Start Speaking
        </button>
      )}
    </div>
  );
}
