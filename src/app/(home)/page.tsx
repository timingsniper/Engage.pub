"use client";

import useScenarios from "@/api/scenarios/useScenarios";
import PartnerCard from "@/components/PartnerCard";
import { useEffect, useRef } from "react";

interface Scenario {
  id: number;
  title: string;
  settings: string;
  imgSrc: string;
}

export default function Home() {
  const {
    data: scenarios,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useScenarios();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const renderSkeletons = () => {
    return Array(8).fill(
      <div className="flex flex-col gap-4 w-96">
        <div className="skeleton h-60 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center justify-items-center mb-4 min-h-32 font-semibold">
        <p className="text-2xl text-center">
          <a className="underline decoration-pink-500">Engage</a> in a
          conversation with your{" "}
          <a className="underline decoration-sky-500">AI Language partners!</a>
        </p>
      </div>
      <div className="grid mx-6 mb-10 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6">
        {isLoading
          ? renderSkeletons()
          : scenarios?.pages?.flatMap((page) =>
              page.scenarios.map((scenario: Scenario) => (
                <PartnerCard
                  key={scenario.id}
                  id={scenario.id}
                  title={scenario.title}
                  description={scenario.settings}
                  imgSrc={"https://picsum.photos/200/300"}
                />
              ))
            )}
        <div ref={loadMoreRef} className="col-span-full">
          {hasNextPage ? "Loading more..." : "You've reached the end!"}
        </div>
      </div>
    </>
  );
}
