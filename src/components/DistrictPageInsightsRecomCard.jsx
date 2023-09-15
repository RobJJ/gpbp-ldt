import Image from "next/image";

import openaiIcon from "../../public/openai-fill.svg";

export default function DistrictPageInsightsRecomCard({
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
  return (
    <div className="w-full h-full  p-1 flex flex-col gap-2 font-inter">
      <section className="w-full flex justify-between  items-center ">
        <div className="flex gap-2 items-center">
          <span className="">
            <b>Recommendations</b> for {district}
          </span>
          <span className="text-[#36B37E] font-semibold border-2 border-[#36B37E] rounded px-1 cursor-pointer">
            BETA
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <Image src={openaiIcon} alt="openAI Icon" width={28} />
          <span className="text-sm">Powered by OpenAI - </span>
          <span
            className="relative group
              "
          >
            <span className="text-[#4345AA] text-sm underline cursor-pointer font-semibold">
              Learn more
            </span>
            <div className=" tooltip-content hidden group-hover:block absolute bottom-0 left-1/2 z-10 transform -translate-x-3/4 translate-y-full bg-slate-800  text-sm rounded py-2 px-2 ">
              <div className="text-xs text-white">Upcoming feature</div>
            </div>
          </span>
        </div>
      </section>
      <section className="w-full h-full">
        <span>{insightsData.RECOMMENDATIONS.ECON_SCORE}</span>
        <span>{insightsData.RECOMMENDATIONS.ENVR_SCORE}</span>
        <span>{insightsData.RECOMMENDATIONS.AIR_SCORE}</span>
        <span>{insightsData.RECOMMENDATIONS.TEMP_SCORE}</span>
      </section>
    </div>
  );
}
