"use client";

import { useState } from "react";
import ProvincePageVisualChildHeader from "./ProvincePageVisualChild-Header";
import ProvincePageVisualChildVisual from "./ProvincePageVisualChild-Visual";

// this will be client parent that receives the data containing all districts in selected province
// it will handle the state to sync the tabs and the lineChart
export default function ProvincePageVisualParent({ provinceData }) {
  const [selectedTab, setSelectedTab] = useState("Overview");
  console.log("[PARENT] : tab is:", selectedTab);
  return (
    <div className="w-full h-full flex flex-col">
      <ProvincePageVisualChildHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {/* the scatter component that will render content based on selectedTab */}
      <ProvincePageVisualChildVisual
        selectedTab={selectedTab}
        provinceData={provinceData}
      />
    </div>
  );
}
