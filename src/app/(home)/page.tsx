import PartnerCard from "@/components/ParterCard";
import Selector from "@/components/Selector";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center justify-items-center mb-4 min-h-32 font-semibold">
        <p className="text-2xl text-center">
          <a className="underline decoration-pink-500">Engage</a> in a
          conversation with your{" "}
          <a className="underline decoration-sky-500">AI Language partners!</a>
        </p>
      </div>
      <Selector />
      <div className="grid mx-6 mb-10 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-6">
        <PartnerCard
          title={"First day at school"}
          description={
            "You are an exchange student who just arrived in the United States. Today is your first day in school."
          }
          imgSrc={
            "https://iseusa.org/wp-content/uploads/2017/02/shutterstock_363058730-e1543504602598.jpg"
          }
        />
        <PartnerCard
          title={"Talk to Mikoto"}
          description={
            "Your friend Mikoto is waiting for you. Hang out with her in Japanese!"
          }
          imgSrc={
            "https://data.onnada.com/character/201311/2943808861_75c946d9_25.406.jpg"
          }
        />
        <PartnerCard
          title={"Mcdonalds Crisis"}
          description={"You are craving for Big Mac. Order Big Mac in English!"}
          imgSrc={
            "https://s7d1.scene7.com/is/image/mcdonalds/Header_BigMac_832x472:1-3-product-tile-desktop?wid=763&hei=472&dpr=off"
          }
        />
        <PartnerCard
          title={"Talk with Professor Snape"}
          description={"Professor Snape wants to have a talk with you."}
          imgSrc={
            "https://www.thefandomentals.com/wp-content/uploads/2016/12/SnapeSeverus-e1475690174936.jpg"
          }
        />
      </div>
    </>
  );
}
