"use client";

import useSingleScenario from "@/api/scenarios/useSingleScenario";
import Link from "next/link";
import SharedCard from "../_component/SharedCard";
import useSharedConversation from "@/api/scenarios/useSharedConversation";
import { SharedConversation } from "@/types/sharedConversation";

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

  if (isLoading || sharedLoading) {
    return (
      <div className="flex h-screen justify-center justify-items-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

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
        <p className="text-xl font-bold">Shared Conversations</p>
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
