"use client";

import useMyConversations from "@/api/conversations/useMyConversations";
import useMyScenario from "@/api/scenarios/useMyScenario";
import PartnerCard from "@/components/PartnerCard";
import ScenarioSkeleton from "@/components/ScenarioSkeleton";
import { Conversation } from "@/types/conversation";
import { Scenario } from "@/types/scenario";
import { useState } from "react";

export default function MyPubPage() {
  const [menu, setMenu] = useState("myScenarios");
  const { scenario, error, isLoading } = useMyScenario();
  const {
    conversations,
    error: convError,
    isLoading: convLoading,
  } = useMyConversations({ fetchOnDemand: menu === "myConversations" });

  return (
    <section>
      <ul className="menu menu-horizontal w-3/4 mb-4">
        <li>
          <a
            className={menu === "myScenarios" ? "active" : ""}
            onClick={() => setMenu("myScenarios")}
          >
            My Scenarios
          </a>
        </li>
        <li>
          <a
            className={menu === "myConversations" ? "active" : ""}
            onClick={() => setMenu("myConversations")}
          >
            My Conversations
          </a>
        </li>
        <li>
          <a
            className={menu === "myExpressions" ? "active" : ""}
            onClick={() => setMenu("myExpressions")}
          >
            My Expressions
          </a>
        </li>
      </ul>
      {menu === "myScenarios" || menu === "myConversations" ? (
        <div className="grid mx-6 mb-10 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6">
          {isLoading || convLoading ? (
            <ScenarioSkeleton />
          ) : menu === "myScenarios" ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center mx-6 mb-10">
          <div className="card w-5/6 bg-base-100 shadow-xl mb-4">
            <div className="card-body">
              <h2 className="card-title">
                Great choice! What are you planning to use your MacBook for? Do
                you have a specific model in mind, or are you looking for
                recommendations?
              </h2>
              <p>
                很好的选择！您打算用 MacBook
                做什么？您是否有特定的型号，或者您正在寻找建议？
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
