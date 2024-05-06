import { useDeleteMessage } from "@/api/messages/useDeleteMessage";
import { useDeleteVocab } from "@/api/messages/useDeleteVocab";
import { savedMessage } from "@/types/savedMessage";
import Link from "next/link";
import { MouseEvent } from "react";

interface ExpressionCardProps {
  message: savedMessage;
  isVocab?: boolean;
}

export default function ExpressionCard({
  message,
  isVocab = false,
}: ExpressionCardProps) {
  const { removeMessage, isPending } = useDeleteMessage();
  const { removeVocab, isPending: vocabDeleting } = useDeleteVocab();
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    let confirmDelete = confirm(
      "Are you sure you want to delete this expression?"
    );
    if (!confirmDelete) return;
    removeMessage(message.id);
  };

  const handleDeleteVocab = (event: MouseEvent<HTMLButtonElement>) => {
    let confirmDelete = confirm(
      "Are you sure you want to delete this vocabulary?"
    );
    if (!confirmDelete) return;
    removeVocab(message.id);
  };

  return (
    <div key={message.id} className="card w-5/6 bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">{message.content}</h2>
        <p>{message.translation}</p>
        <div className="card-actions justify-end">
          <Link href={`/scenario/${message.scenarioId}`} passHref>
            <button className="btn btn-secondary">Related Scenario</button>
          </Link>
          <button
            className="btn btn-primary"
            onClick={isVocab ? handleDeleteVocab : handleDelete}
            disabled={isPending || vocabDeleting}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
