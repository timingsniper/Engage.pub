"use client";
import useConversationSummary from "@/api/conversations/useConversationSummary";
import { useDeleteConversation } from "@/api/conversations/useDeleteConversation";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function SummaryPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const scenarioId = id;
  const { initialLoading, summary, refetch } =
    useConversationSummary(scenarioId);
  const { removeConversation, isPending } = useDeleteConversation(scenarioId);
  const router = useRouter();
  const handleTryAgain = (event: MouseEvent<HTMLButtonElement>) => {
    let confirmEnd = confirm(
      "This will reset the conversation. Are you sure you want to try again?"
    );
    if (!confirmEnd) return;
    removeConversation();
    router.push(`/talk/${scenarioId}`);
  };

  if (initialLoading) {
    return <Loader />;
  }
  return (
    <section>
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
          </div>
        </div>
      </div>
    </section>
  );
}
