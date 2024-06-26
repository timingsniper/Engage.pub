"use client";

import useMyConversations from "@/api/conversations/useMyConversations";
import useMyMessages from "@/api/messages/useMyMessages";
import useMyScenario from "@/api/scenarios/useMyScenario";
import PartnerCard from "@/components/PartnerCard";
import ScenarioSkeleton from "@/components/ScenarioSkeleton";
import { Conversation } from "@/types/conversation";
import { savedMessage } from "@/types/savedMessage";
import { Scenario } from "@/types/scenario";
import { useState } from "react";
import ExpressionCard from "./_component/ExpressionCard";
import useMyVocabs from "@/api/messages/useMyVocabs";

export default function MyPubPage() {
  const [menu, setMenu] = useState("myScenarios");
  const { scenario, error, isLoading } = useMyScenario();
  const {
    conversations,
    error: convError,
    isLoading: convLoading,
  } = useMyConversations({ fetchOnDemand: menu === "myConversations" });
  const {
    isLoading: msgLoading,
    messages,
    error: msgError,
  } = useMyMessages(menu === "myExpressions");
  const {
    isLoading: vocabLoading,
    vocabs,
    error: vocabError,
  } = useMyVocabs(menu === "myVocabs");

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
        <li>
          <a
            className={menu === "myVocabs" ? "active" : ""}
            onClick={() => setMenu("myVocabs")}
          >
            My Vocabularies
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
          {menu === "myExpressions" ? (
            msgLoading ? (
              <ScenarioSkeleton />
            ) : (
              messages?.map((message: savedMessage) => (
                <ExpressionCard key={message.id} message={message} />
              ))
            )
          ) : vocabLoading ? (
            <ScenarioSkeleton />
          ) : (
            vocabs?.map((vocab: savedMessage) => (
              <ExpressionCard key={vocab.id} message={vocab} isVocab={true}/>
            ))
          )}
        </div>
      )}
    </section>
  );
}
