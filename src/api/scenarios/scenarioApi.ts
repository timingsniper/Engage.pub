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

export async function getSingleScenario(scenarioId: number) {
  try {
    const response = await api.get(`/scenario/detail/${scenarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching scenario: " + error);
    throw error;
  }
}
