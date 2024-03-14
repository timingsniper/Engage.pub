type CardProps = {
  title: string;
  description: string;
  imgSrc: string;
};

export default function PartnerCard({ title, description, imgSrc }: CardProps) {
  return (
    <div className="card w-90 bg-base-100 shadow-xl">
      <figure>
        <picture>
          <img src={imgSrc} alt="Shoes" />
        </picture>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-customBlue text-white">Engage!</button>
        </div>
      </div>
    </div>
  );
}
