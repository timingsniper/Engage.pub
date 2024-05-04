import { SharedConversation } from "@/types/sharedConversation";
import Link from "next/link";

interface SharedCardProps {
  sharedConvo: SharedConversation;
}

export default function SharedCard({ sharedConvo }: SharedCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">{sharedConvo.title}</h2>
        <p>{`By ${sharedConvo.nickname}`}</p>
        <div className="card-actions justify-end">
        <Link href={`/shared/${sharedConvo.id}`} passHref>
          <button className="btn btn-primary">View</button>
        </Link>
        {sharedConvo.mine && <button className="btn bg-slate-400">Delete</button>}
        </div>
      </div>
    </div>
  );
}
