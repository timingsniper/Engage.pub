import Link from "next/link";

type CardProps = {
  id: number;
  title: string;
  description: string;
  imgSrc: string;
};

export default function PartnerCard({
  id,
  title,
  description,
  imgSrc,
}: CardProps) {
  return (
    <div className="card w-5/6 bg-base-100 shadow-xl">
      <figure>
        <picture>
          <img src={imgSrc} alt="Shoes" />
        </picture>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="justify-start text-sm">{`#${id}`}</div>
        <div className="card-actions justify-end">
          <Link href={`/scenario/${id}`} passHref>
            <button className="btn bg-customBlue text-white">Engage!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
