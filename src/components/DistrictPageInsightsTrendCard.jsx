import Image from "next/image";

import openaiIcon from "../../public/openai-fill.png";

export default function DistrictPageInsightsTrendCard({
  district,
  insightsData,
}) {
  // Gaurd against no data
  if (!insightsData) {
    return (
      <div className="w-full h-full flex justify-center items-center font-bold text-lg underline font-inter">
        No data for selected district
      </div>
    );
  }
  // console.log("insights trends :: ", insightsData.TRENDS);
  return (
    <div className="w-full h-full  p-1 flex flex-col gap-2 overflow-auto font-inter">
      <section className="w-full flex justify-between  items-center ">
        <div className="flex gap-2 items-center">
          <span className="">
            <b>Trends</b> for {district}
          </span>
          <span className="text-[#36B37E] font-semibold border-2 border-[#36B37E] rounded px-1 cursor-pointer">
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
        <span>{insightsData.TRENDS.ECON_SCORE}</span>
        <span>{insightsData.TRENDS.ENVR_SCORE}</span>
        <span>{insightsData.TRENDS.AIR_SCORE}</span>
        <span>{insightsData.TRENDS.TEMP_SCORE}</span>
      </section>
    </div>
  );
}
