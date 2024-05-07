"use client";
import useConversationSummary from "@/api/conversations/useConversationSummary";
import { useDeleteConversation } from "@/api/conversations/useDeleteConversation";
import Loader from "@/components/Loader";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect } from "react";
import RubricCollapse from "../_component/RubricCollapse";

export default function SummaryPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const scenarioId = id;
  const { initialLoading, summary, refetch, fetchStatus } =
    useConversationSummary(scenarioId);
  const { removeConversation, isPending } = useDeleteConversation(scenarioId);
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleTryAgain = (event: MouseEvent<HTMLButtonElement>) => {
    let confirmEnd = confirm(
      "This will reset the conversation. Are you sure you want to try again?"
    );
    if (!confirmEnd) return;
    removeConversation();
    router.push(`/talk/${scenarioId}`);
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["userLevel"] });
  }, [queryClient, summary]);

  if (initialLoading || fetchStatus === "fetching") {
    return <Loader />;
  }

  return (
    <section className="container mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10"></figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Scenario Summary</h2>
          <p>
            <strong>Performance Summary: </strong>
            {summary?.performanceSummary}
          </p>
          <br />
          <p>
            <strong>Study Suggestions: </strong>
            {summary?.studySuggestions}
          </p>
          <p className="font-bold">
            Your level was updated to Level <strong>{summary?.level}</strong>{" "}
            based on your performance
          </p>

          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={handleTryAgain}
              disabled={isPending}
            >
              Try Again!
            </button>
            <Link href={`/`} passHref>
              <button className="btn bg-slate-400">Back to home</button>
            </Link>
            <button className="btn bg-lime-500" onClick={() => refetch()}>
              Re-evaluate
            </button>
          </div>
        </div>
      </div>
      <RubricCollapse />
    </section>
  );
}
