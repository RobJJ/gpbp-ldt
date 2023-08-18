"use client";

import { useState } from "react";
import ProvincePageVisualChildHeader from "./ProvincePageVisualChild-Header";
import DistrictPageVisualChild from "./DistrictPageVisualChild";

// Receives province data for all years
export default function DistrictPageVisualParent({ districtData }) {
  const [selectedTab, setSelectedTab] = useState("Overview");

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto bg-white">
      {/* header controls tab selection -- shares same component with province : change later */}
      <ProvincePageVisualChildHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {/* the scatter component that will render content based on selectedTab */}

      <DistrictPageVisualChild
        selectedTab={selectedTab}
        districtData={districtData}
      />
    </div>
  );
}
