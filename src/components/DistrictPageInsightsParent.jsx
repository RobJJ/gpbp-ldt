"use client";
import { useState } from "react";
import DistrictPageInsightsChildHeader from "./DistrictPageInsightsChildHeader";

// import openaiIcon from "../../public/openai-fill.png";
// import Image from "next/image";
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
