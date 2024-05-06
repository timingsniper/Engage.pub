import { useSaveExpression } from "@/api/recommendations/useSaveExpression";
import { useSaveVocab } from "@/api/recommendations/useSaveVocab";
import { RecommendationProps } from "@/types/recommendation";
import { MouseEvent } from "react";

interface RecommendationCardProps {
  recommendation: RecommendationProps;
  isExpression: boolean;
  scenarioId: number;
}

export default function RecommendationCard({
  recommendation,
  isExpression,
  scenarioId,
}: RecommendationCardProps) {
  const { saveExpression, isPending } = useSaveExpression(scenarioId);
  const { saveVocab, isPending: vocabPending } = useSaveVocab(scenarioId);
  const saveRecommendation = (event: MouseEvent<HTMLButtonElement>) => {
    saveExpression({
      scenarioId,
      content: recommendation.expression,
      translation: recommendation.translation,
    });
  };
  const saveVocabulary = (event: MouseEvent<HTMLButtonElement>) => {
    saveVocab({
      scenarioId,
      content: recommendation.vocabulary,
      translation: recommendation.translation,
    });
  };
  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">
          <p className="text-xl font-bold">
            {isExpression
              ? recommendation.expression
              : recommendation.vocabulary}
          </p>
        </h2>
        <p>{recommendation.translation}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={isExpression ? saveRecommendation : saveVocabulary}
            disabled={isPending || vocabPending}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
