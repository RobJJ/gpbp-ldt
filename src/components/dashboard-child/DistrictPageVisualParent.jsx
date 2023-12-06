"use client";

import { useState } from "react";
import ProvincePageVisualChildHeader from "./ProvincePageVisualChild-Header";
import DistrictPageVisualChild from "./DistrictPageVisualChild";

export default function DistrictPageVisualParent({ districtData }) {
  const [selectedTab, setSelectedTab] = useState("Overview");

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto bg-white">
      <ProvincePageVisualChildHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <DistrictPageVisualChild
        selectedTab={selectedTab}
        districtData={districtData}
      />
    </div>
  );
}
