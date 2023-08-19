import Image from "next/image";
import ccsIcon from "../../public/CCS-ICON.png";

export default function DistrictPageInsightsRisksCard({ district }) {
  return (
    <div className="w-full h-full bg-white flex">
      <section className="w-2/3 flex flex-col justify-between py-1 pl-3">
        <span className="font-bold text-lg">
          Future Climate Change Risks To Assets
        </span>
        <span>Assess future climate risks to {district}!</span>
        <span>
          Climate Change Screening Platform assesses risks to regions and assets
          within countries.
        </span>
        <span>
          <button className=" bg-[#4345AA] text-white text-lg rounded-lg px-2 py-1 hover:shadow-xl hover:underline">
            View Tool
          </button>
        </span>
      </section>
      <section className="w-1/3 bg-white flex justify-center pt-2">
        <div>
          <Image src={ccsIcon} alt="Climate Change Screen Icon" />
        </div>
      </section>
    </div>
  );
}
