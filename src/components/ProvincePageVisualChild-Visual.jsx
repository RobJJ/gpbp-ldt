"use client";

// GOAL: Chart component: Receives ProvinceData : Tab selection -> listen for this change
export default function ProvincePageVisualChildVisual({
  selectedTab,
  provinceData,
}) {
  // listen for the change of selectedTab value and filter the data based on what that tab needs
  //   const [data, setData] = useState();

  return (
    <section className="w-full h-full bg-blue-300">
      Visual section: {selectedTab}: {provinceData[0].PROVINCE}
    </section>
  );
}
