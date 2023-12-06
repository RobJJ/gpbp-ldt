"use client";
import { useState } from "react";
import DistrictPageInsightsChildHeader from "./DistrictPageInsightsChildHeader";

import DistrictPageInsightsTrendCard from "./DistrictPageInsightsTrendCard";
import DistrictPageInsightsRecomCard from "./DistrictPageInsightsRecomCard";
import DistrictPageInsightsRisksCard from "./DistrictPageInsightsRisksCard";

//

export default function DistrictPageInsightsParent({ insightsData, district }) {
  //
  const [selectedTab, setSelectedTab] = useState("Trends");
  //
  return (
    <div className="w-full h-full flex flex-col gap-2 ">
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
