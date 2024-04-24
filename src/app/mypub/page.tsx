"use client";

import useMyConversations from "@/api/conversations/useMyConversations";
import useMyScenario from "@/api/scenarios/useMyScenario";
import PartnerCard from "@/components/PartnerCard";
import ScenarioSkeleton from "@/components/ScenarioSkeleton";
import { Conversation } from "@/types/conversation";
import { Scenario } from "@/types/scenario";
import { useState } from "react";

export default function MyPubPage() {
  const [isMyScenario, setIsMyScenario] = useState(true);
  const { scenario, error, isLoading } = useMyScenario();
  const {
    conversations,
    error: convError,
    isLoading: convLoading,
  } = useMyConversations({ fetchOnDemand: !isMyScenario });

  return (
    <section>
      <ul className="menu menu-horizontal w-96 mb-4">
        <li>
          <a
            className={isMyScenario ? "active" : ""}
            onClick={() => setIsMyScenario(true)}
          >
            My Scenarios
          </a>
        </li>
        <li>
          <a
            className={!isMyScenario ? "active" : ""}
            onClick={() => setIsMyScenario(false)}
          >
            My Conversations
          </a>
        </li>
      </ul>
      <div className="grid mx-6 mb-10 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6">
        {isMyScenario ? (
          isLoading ? (
            <ScenarioSkeleton />
          ) : (
            scenario?.map((scenario: Scenario) => (
              <PartnerCard
                key={scenario.id}
                id={scenario.id}
                title={scenario.title}
                description={scenario.settings}
                imgSrc={scenario.imgSource}
                myMode={true}
              />
            ))
          )
        ) : convLoading ? (
          <ScenarioSkeleton />
        ) : (
          conversations?.map((conversation: Conversation) => (
            <PartnerCard
              key={conversation.id}
              id={conversation.scenarioId}
              title={conversation.scenarioTitle}
              description={
                conversation.goalMet ? "Goal met" : "Goal not yet met"
              }
              imgSrc={conversation.scenarioImgSource}
            />
          ))
        )}
      </div>
    </section>
  );
}
