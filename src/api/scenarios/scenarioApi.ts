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
