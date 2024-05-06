"use client";
import { api } from "@/api/APIHandler";
import { useState } from "react";

interface SoundIconProps {
  text: string;
}

export default function SoundIcon({ text }: SoundIconProps) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleTextToSpeech = async () => {
    try {
      setIsPlaying(true);
      const response = await api.post(
        "/conversation/read/tts",
        { text },
        {
          responseType: "blob",
        }
      );
      const url = URL.createObjectURL(response.data);
      setAudioSrc(url);
    } catch (error) {
      console.error("Error generating speech:", error);
    }
  };

  return (
    <>
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 mt-2"
        fill={isPlaying ? "black" : "none"}
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleTextToSpeech}
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M16 9C16.5 9.5 17 10.5 17 12C17 13.5 16.5 14.5 16 15M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M13 3L7 8H5C3.89543 8 3 8.89543 3 10V14C3 15.1046 3.89543 16 5 16H7L13 21V3Z"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
      {audioSrc && (
        <audio
          controls
          className="hidden"
          src={audioSrc}
          autoPlay
          onEnded={() => {
            setIsPlaying(false);
          }}
        />
      )}
    </>
  );
}
