import { api } from "../APIHandler";

export async function addMessage(
  scenarioId: number,
  role: string,
  content: string,
  translation: string | null
) {
  try {
    const data = {
      scenarioId,
      role,
      content,
      translation,
    };
    const response = await api.post(`/message`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding message: " + error);
    throw error;
  }
}

export async function getMessages() {
  try {
    const response = await api.get(`/message`);
    return response.data;
  } catch (error) {
    console.error("Error getting messages: " + error);
    throw error;
  }
}

export async function deleteMessage(messageId: number) {
  try {
    const response = await api.delete(`/message/${messageId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting message: " + error);
    throw error;
  }
}
