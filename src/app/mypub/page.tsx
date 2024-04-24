"use client";

import useMyScenario from "@/api/scenarios/useMyScenario";
import PartnerCard from "@/components/PartnerCard";
import ScenarioSkeleton from "@/components/ScenarioSkeleton";
import { Scenario } from "@/types/scenario";

export default function MyPubPage() {
  const { scenario, error, isLoading } = useMyScenario();

  return (
    <section>
      <ul className="menu menu-horizontal w-96">
        <li>
          <a className="active">My Scenarios</a>
        </li>
        <li>
          <a>My Conversations</a>
        </li>
      </ul>
      <div className="grid mx-6 mb-10 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6">
        {isLoading ? (
          <ScenarioSkeleton />
        ) : (
          scenario?.map((scenario: Scenario) => (
            <PartnerCard
              key={scenario.id}
              id={scenario.id}
              title={scenario.title}
              description={scenario.settings}
              imgSrc={scenario.imgSource}
            />
          ))
        )}
      </div>
    </section>
  );
}
