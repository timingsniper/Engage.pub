import Link from "next/link";
import React, { forwardRef } from "react";


interface TalkCompleteModalProps {
  scenarioId: number;
}

const TalkCompleteModal = forwardRef<HTMLDialogElement, TalkCompleteModalProps>(
  ({ scenarioId }, ref) => {
    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Goal Met!</h3>
          <p className="py-4">
            We've detected that you've met the goal for this scenario.
          </p>
          <p>
            If you believe you didn't meet your goal, you can choose to close
            this and continue with the conversation.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <Link href={`/summary/${scenarioId}`} passHref>
                <button className="btn btn-primary mr-3">
                  Move to summary
                </button>
              </Link>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);

TalkCompleteModal.displayName = "TalkCompleteModal";

export default TalkCompleteModal;
