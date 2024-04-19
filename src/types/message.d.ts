export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  feedback: string | null;
  translation: string | null;
}
