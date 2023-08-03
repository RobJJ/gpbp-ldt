"use client";

import { useState } from "react";

export default function ProvincePageVisualChildVisual({
  selectedTab,
  provinceData,
}) {
  // listen for the change of selectedTab value and filter the data based on what that tab needs
  //   const [data, setData] = useState();

  return (
    <section className="w-full h-full bg-blue-300">
      Visual section: {selectedTab}
    </section>
  );
}
