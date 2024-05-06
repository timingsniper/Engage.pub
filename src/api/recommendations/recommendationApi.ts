import { api } from "../APIHandler";

interface SaveExpressionProps {
  scenarioId: number;
  content: string | undefined;
  translation: string | null;
}

export async function addExpression({
  scenarioId,
  content,
  translation,
}: SaveExpressionProps) {
  try {
    const data = {
      scenarioId,
      content,
      translation,
    };
    const response = await api.post(
      `recommendation/expression/${scenarioId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error adding message: " + error);
    throw error;
  }
}

export async function addVocab({
  scenarioId,
  content,
  translation,
}: SaveExpressionProps) {
  try {
    const data = {
      scenarioId,
      content,
      translation,
    };
    const response = await api.post(
      `recommendation/vocab/${scenarioId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error adding vocab: " + error);
    throw error;
  }
}