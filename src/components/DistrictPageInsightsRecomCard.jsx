import Image from "next/image";

import openaiIcon from "../../public/openai-fill.png";

export default function DistrictPageInsightsRecomCard({
  district,
  insightsData,
}) {
  return (
    <div className="w-full h-full bg-purple-300 p-1 flex flex-col gap-2 overflow-auto">
      <section className="w-full flex justify-between bg-pink-100 items-center ">
        <div className="flex gap-2 items-center">
          <span className="">
            <b>Recommendations</b> for {district}
          </span>
          <span className="text-[#36B37E] border-2 border-[#36B37E] rounded px-1 cursor-pointer">
            BETA
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <Image src={openaiIcon} alt="openAI Icon" width={28} />
          <span className="text-sm">Powered by OpenAI - </span>
          <span className="text-[#4345AA] text-sm font-semibold underline">
            {" "}
            Learn more
          </span>
        </div>
      </section>
      <section className="w-full h-full overflow-auto">
        <span>{insightsData.RECOMMENDATIONS.ECON_SCORE}</span>
        <span>{insightsData.RECOMMENDATIONS.ENVR_SCORE}</span>
        <span>{insightsData.RECOMMENDATIONS.AIR_SCORE}</span>
        <span>{insightsData.RECOMMENDATIONS.TEMP_SCORE}</span>
      </section>
    </div>
  );
}
