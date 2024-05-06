"use client";

import useSingleScenario from "@/api/scenarios/useSingleScenario";
import Link from "next/link";
import SharedCard from "../_component/SharedCard";
import useSharedConversation from "@/api/scenarios/useSharedConversation";
import { SharedConversation } from "@/types/sharedConversation";
import RecommendationCard from "../_component/RecommendationCard";
import useExpressionRec from "@/api/recommendations/useExpressionRec";
import { MouseEvent } from "react";
import useVocabRec from "@/api/recommendations/useVocabRec";
import { RecommendationProps } from "@/types/recommendation";

type Props = {
  params: { id: number };
};

export default function ScenarioDetail({ params }: Props) {
  const scenarioId = params.id;
  const { isLoading, scenario, error } = useSingleScenario(scenarioId);
  const {
    isLoading: sharedLoading,
    sharedConvo,
    error: sharedError,
  } = useSharedConversation(scenarioId);
  const {
    isFetching: expLoading,
    recExpression,
    error: expError,
    refetchExp,
  } = useExpressionRec(scenarioId);
  const {
    isFetching: vocabLoading,
    recVocab,
    error: vocabError,
    refetchVocab,
  } = useVocabRec(scenarioId);

  if (isLoading || sharedLoading) {
    return (
      <div className="flex h-screen justify-center justify-items-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  const refreshExpRecommendation = (event: MouseEvent<HTMLSpanElement>) => {
    refetchExp();
  };
  const refreshVocabRecommendation = (event: MouseEvent<HTMLSpanElement>) => {
    refetchVocab();
  };

  return (
    <section className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <picture>
            <img
              src={scenario.imgSource}
              alt="Scenario pic"
              className="rounded-xl"
            />
          </picture>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            Scenario {scenario.id}: {scenario.title}
          </h2>
          <p>{scenario.settings}</p>
          <div>
            <strong>Your mission: </strong>
            {scenario.mission}
          </div>
          <div>
            <strong>AI settings: </strong>
            {scenario.aiSetting}
          </div>
          <div>Created at: {scenario.createdAt}</div>
          <div className="card-actions justify-end">
            <Link href={`/talk/${scenario.id}`} passHref>
              <button className="btn btn-primary">Start talking!</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-12">
        <p className="text-xl font-bold">
          Expression Recommendation{" "}
          <span
            className="text-sm ml-3 text-gray-500"
            onClick={refreshExpRecommendation}
          >
            Refresh
          </span>
        </p>
        {expLoading ? (
          <div className="skeleton h-52 w-full bg-gray-300 animate-pulse"></div>
        ) : (
          <RecommendationCard
            recommendation={recExpression}
            isExpression={true}
          />
        )}
        <p className="text-xl font-bold">
          Vocabulary Recommendation{" "}
          <span
            className="text-sm ml-3 text-gray-500"
            onClick={refreshVocabRecommendation}
          >
            Refresh
          </span>
        </p>
        {vocabLoading ? (
          <>
            <div className="skeleton h-32 w-full bg-gray-300 animate-pulse mb-3"></div>
            <div className="skeleton h-32 w-full bg-gray-300 animate-pulse mb-3"></div>
            <div className="skeleton h-32 w-full bg-gray-300 animate-pulse mb-3"></div>
          </>
        ) : (
          recVocab?.map((vocab: RecommendationProps, index: number) => (
            <RecommendationCard
              key={index}
              recommendation={vocab}
              isExpression={false}
            />
          ))
        )}
        <p className="text-xl font-bold mt-3">Shared Conversations</p>
        {/*Show shared conversations*/}
        {sharedConvo ? (
          sharedConvo?.map((convo: SharedConversation) => (
            <SharedCard key={convo.id} sharedConvo={convo} />
          ))
        ) : (
          <p className="text-center mt-5">No shared conversation yet!</p>
        )}
      </div>
    </section>
  );
}
