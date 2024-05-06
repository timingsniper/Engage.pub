import { RecommendationProps } from "@/types/recommendation";

interface RecommendationCardProps {
  recommendation: RecommendationProps;
  isExpression: boolean;
}

export default function RecommendationCard({
  recommendation,
  isExpression,
}: RecommendationCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">
          <p className="text-xl font-bold">{isExpression ? recommendation.expression : recommendation.vocabulary}</p>
        </h2>
        <p>{recommendation.translation}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
