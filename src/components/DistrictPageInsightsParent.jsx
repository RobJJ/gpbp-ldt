"use client";
import { useState } from "react";
import DistrictPageInsightsChildHeader from "./DistrictPageInsightsChildHeader";
import DistrictPageInsightsChildContent from "./DistrictPageInsightsChildContent";
import openaiIcon from "../../public/openai-fill.png";
import Image from "next/image";

// For 'AssestLevelRisks'
const tabsToTitle = {
  Trends: "Trends",
  Recommendations: "Recommendations",
  AssestLevelRisks: "Assest Level Risks",
};

export default function DistrictPageInsightsParent({ insightsData, district }) {
  //   console.log("insights data : ", insightsData);
  // strings can be  : "Trends", "Recommendations", "AssestLevelRisks"
  //
  const [selectedTab, setSelectedTab] = useState("Trends");
  //
  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-auto">
      {/* header controls tab selection */}
      <DistrictPageInsightsChildHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <div className="w-full flex justify-between items-center ">
        {/* LEFT */}
        <div className="flex gap-3  items-center">
          <span className="text-lg">
            <b>{tabsToTitle[selectedTab]}</b> for {decodeURIComponent(district)}
          </span>
          <span className="text-[#36B37E] border-2 border-[#36B37E] rounded px-1 cursor-pointer">
            BETA
          </span>
        </div>
        {/* RIGHT */}
        <div className="flex gap-1 items-center">
          <Image src={openaiIcon} alt="openAI Icon" width={28} />
          <span className="text-sm font-semibold">Powered by Open AI - </span>
          {/* Add onHover and link to methodology page : upcoming feature for now */}
          <span className="text-sm font-semibold text-[#4345AA]">
            Learn more
          </span>
        </div>
      </div>

      <DistrictPageInsightsChildContent
        selectedTab={selectedTab}
        insightsData={insightsData}
      />
    </div>
  );
}
