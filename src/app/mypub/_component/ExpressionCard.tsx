import { useDeleteMessage } from "@/api/messages/useDeleteMessage";
import { savedMessage } from "@/types/savedMessage";
import { MouseEvent } from "react";

interface ExpressionCardProps {
  message: savedMessage;
}

export default function ExpressionCard({ message }: ExpressionCardProps) {
  const { removeMessage, isPending } = useDeleteMessage();
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    let confirmDelete = confirm(
      "Are you sure you want to delete this expression?"
    );
    if (!confirmDelete) return;
    removeMessage(message.id);
  };

  return (
    <div key={message.id} className="card w-5/6 bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">{message.content}</h2>
        <p>{message.translation}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={handleDelete}
            disabled={isPending}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
