"use client";

import { useState } from "react";
import ProvincePageVisualChildHeader from "./ProvincePageVisualChild-Header";
import ProvincePageVisualChildVisual from "./ProvincePageVisualChild-Visual";

// Receives province data for all years
export default function ProvincePageVisualParent({ provinceData }) {
  const [selectedTab, setSelectedTab] = useState("Overview");

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto">
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
