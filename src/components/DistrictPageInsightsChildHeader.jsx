"use client";

export default function DistrictPageInsightsChildHeader({
  selectedTab,
  setSelectedTab,
}) {
  const handleTabClick = (event) => {
    // console.log(event.target.getAttribute("data-tab"));
    const tabName = event.target.getAttribute("data-tab");
    setSelectedTab(tabName);
  };

  return (
    <section className="w-full flex  text-sm font-inter">
      <button
        data-tab="Trends"
        className={`border-y-1 px-2 py-1  rounded-l border border-slate-400 ${
          selectedTab === "Trends" ? "bg-black text-white" : "bg-white"
        }`}
        onClick={handleTabClick}
      >
        Trends
      </button>
      <button
        data-tab="Recommendations"
        className={`border-y-1 px-2 py-1  border-y border-slate-400 ${
          selectedTab === "Recommendations" ? "bg-black text-white" : "bg-white"
        }`}
        onClick={handleTabClick}
      >
        Recommendations
      </button>
      <button
        data-tab="AssestLevelRisks"
        className={`border-y-1 px-2 py-1  border border-slate-400 ${
          selectedTab === "AssestLevelRisks"
            ? "bg-black text-white"
            : "bg-white"
        }`}
        onClick={handleTabClick}
      >
        Asset Level Risks
      </button>
    </section>
  );
}
