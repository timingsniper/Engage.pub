import { CreateScenarioModuleProps } from "@/types/CreateScenarioProps";
import { api } from "../APIHandler";

export async function getScenarios(pageId: number) {
  try {
    const response = await api.get(`/scenario/${pageId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scenarios: " + error);
    throw error;
  }
}

export async function getMyScenarios() {
  try {
    const response = await api.get(`/scenario/myScenarios`);
    return response.data;
  } catch (error) {
    console.error("Error fetching my scenarios: " + error);
    throw error;
  }
}

export async function getSingleScenario(scenarioId: number) {
  try {
    const response = await api.get(`/scenario/detail/${scenarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scenario: " + error);
    throw error;
  }
}

export async function addScenario({
  authorEmail,
  title,
  settings,
  aiSetting,
  mission,
  startingMessage,
  imageUrl,
}: CreateScenarioModuleProps) {
  try {
    const data = {
      authorEmail,
      title,
      settings,
      aiSetting,
      mission,
      startingMessage,
      imageUrl,
    };
    console.log(data);
    const response = await api.post(`/scenario`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding scenario: " + error);
    throw error;
  }
}

export async function editScenario({
  scenarioId,
  title,
  settings,
  aiSetting,
  mission,
  startingMessage,
  imageUrl,
}: CreateScenarioModuleProps & { scenarioId: number }) {
  try {
    const data = {
      title,
      settings,
      aiSetting,
      mission,
      startingMessage,
      imageUrl,
    };
    console.log("Updating scenario:", data);
    const response = await api.put(`/scenario/${scenarioId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating scenario: " + error);
    throw error;
  }
}

export async function getScenarioImageGen(settings: string, aiSetting: string) {
  try {
    const response = await api.post(`/scenario/imageGen`, {
      settings,
      aiSetting,
    });
    return response.data;
  } catch (error) {
    console.error("Error generating image: " + error);
    throw error;
  }
}
