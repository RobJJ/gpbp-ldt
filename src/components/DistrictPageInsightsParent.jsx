"use client";
import { useState } from "react";
import DistrictPageInsightsChildHeader from "./DistrictPageInsightsChildHeader";

import openaiIcon from "../../public/openai-fill.png";
import Image from "next/image";
import DistrictPageInsightsTrendCard from "./DistrictPageInsightsTrendCard";
import DistrictPageInsightsRecomCard from "./DistrictPageInsightsRecomCard";
import DistrictPageInsightsRisksCard from "./DistrictPageInsightsRisksCard";

// For 'AssestLevelRisks'
const tabsToTitle = {
  Trends: "Trends",
  Recommendations: "Recommendations",
  AssestLevelRisks: "Assest Level Risks",
};
//

export default function DistrictPageInsightsParent({ insightsData, district }) {
  //   console.log("insights data : ", insightsData);
  // strings can be  : "Trends", "Recommendations", "AssestLevelRisks"
  //
  const [selectedTab, setSelectedTab] = useState("Trends");
  //
  return (
    <div className="w-full h-full flex flex-col gap-2 ">
      {/* header controls tab selection */}
      <DistrictPageInsightsChildHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab === "Trends" && (
        <DistrictPageInsightsTrendCard
          district={district}
          insightsData={insightsData}
        />
      )}
      {selectedTab === "Recommendations" && (
        <DistrictPageInsightsRecomCard
          district={district}
          insightsData={insightsData}
        />
      )}
      {selectedTab === "AssestLevelRisks" && (
        <DistrictPageInsightsRisksCard district={district} />
      )}
    </div>
  );
}

// <div className="w-full flex justify-between items-center ">
//   {/* TRENDS */}
//   <div className="flex gap-3  items-center">
//     <span className="text-lg">
//       <b>{tabsToTitle[selectedTab]}</b> for {decodeURIComponent(district)}
//     </span>
//     <span className="text-[#36B37E] border-2 border-[#36B37E] rounded px-1 cursor-pointer">
//       BETA
//     </span>
//   </div>
//   {/* LEFT */}
//   <div className="flex gap-3  items-center">
//     {selectedTab === "Trends" ||
//       (selectedTab === "Recommendations" && (
//         <span className="text-lg">
//           <b>{tabsToTitle[selectedTab]}</b> for {decodeURIComponent(district)}{" "}
//         </span>
//       ))}
//     {selectedTab === "AssestLevelRisks" && (
//       <span className="text-lg">Future Climate Change Risks To Assets</span>
//     )}

//   </div>
//   {/* RIGHT */}
//   <div className="flex gap-1 items-center">
//     <Image src={openaiIcon} alt="openAI Icon" width={28} />
//     <span className="text-sm font-semibold">Powered by Open AI - </span>
//     {/* Add onHover and link to methodology page : upcoming feature for now */}
//     <span className="text-sm font-semibold text-[#4345AA]">Learn more</span>
//   </div>
// </div>;
