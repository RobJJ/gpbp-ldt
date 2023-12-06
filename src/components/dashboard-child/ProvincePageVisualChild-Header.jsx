"use client";

export default function ProvincePageVisualChildHeader({
  selectedTab,
  setSelectedTab,
}) {
  const handleTabClick = (event) => {
    const tabName = event.target.getAttribute("data-tab");
    setSelectedTab(tabName);
  };

  return (
    <section className="w-full flex text-xs font-inter">
      <button
        data-tab="Overview"
        className={`border-y-1 px-2 py-1  rounded-l border border-slate-400 ${
          selectedTab === "Overview" ? "bg-black text-white" : "bg-white"
        }`}
        onClick={handleTabClick}
      >
        Overview
      </button>
      <button
        data-tab="Economic"
        className={`border-y-1 px-2 py-1  border-y border-slate-400 ${
          selectedTab === "Economic" ? "bg-black text-white" : "bg-white"
        }`}
        onClick={handleTabClick}
      >
        Economic
      </button>
      <button
        data-tab="Environmental"
        className={`border-y-1 px-2 py-1  border border-slate-400 ${
          selectedTab === "Environmental" ? "bg-black text-white" : "bg-white"
        }`}
        onClick={handleTabClick}
      >
        Environmental
      </button>
      <button
        data-tab="AirQuality"
        className={`border-y-1 px-2 py-1  border-y border-slate-400 ${
          selectedTab === "AirQuality" ? "bg-black text-white" : "bg-white"
        }`}
        onClick={handleTabClick}
      >
        Air Quality
      </button>
      <button
        data-tab="ExtremeWeather"
        className={`border-y-1 px-2 py-1  border-y border-l border-slate-400 ${
          selectedTab === "ExtremeWeather" ? "bg-black text-white" : "bg-white"
        }`}
        onClick={handleTabClick}
      >
        Extreme Weather
      </button>
      <button
        data-tab="GreenSpace"
        className={`border-y-1 px-2 py-1  rounded-r border border-slate-400 ${
          selectedTab === "GreenSpace" ? "bg-black text-white" : "bg-white"
        }`}
        onClick={handleTabClick}
      >
        Green Space
      </button>
    </section>
  );
}
