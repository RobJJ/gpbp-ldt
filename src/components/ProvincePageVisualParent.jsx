"use client";

import { useState } from "react";
import ProvincePageVisualChildHeader from "./ProvincePageVisualChild-Header";
import ProvincePageVisualChildVisual from "./ProvincePageVisualChild-Visual";

// GOAL: client component - receives province data,, keeps state of selected data
export default function ProvincePageVisualParent({ provinceData }) {
  const [selectedTab, setSelectedTab] = useState("Overview");
  // console.log("[PARENT] : tab is:", selectedTab);
  return (
    <div className="w-full h-full flex flex-col">
      {/* header controls tab selection */}
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
