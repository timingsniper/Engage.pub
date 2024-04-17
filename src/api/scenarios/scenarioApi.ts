import { CreateScenarioModuleProps } from "@/types/CreateScenarioProps";
import { api } from "../APIHandler";
import useUserStore from "@/stores/useUserStore";

export async function getScenarios(pageId: number) {
  try {
    const response = await api.get(`/scenario/${pageId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scenarios: " + error);
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
}: CreateScenarioModuleProps) {
  try {
    const data = {
      authorEmail,
      title,
      settings,
      aiSetting,
      mission,
      startingMessage,
    };
    const response = await api.post(`/scenario`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding scenario: " + error);
    throw error;
  }
}
