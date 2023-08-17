"use client";

export default function ProvincePageVisualChildHeader({
  selectedTab,
  setSelectedTab,
}) {
  const handleTabClick = (event) => {
    // console.log(event.target.getAttribute("data-tab"));
    const tabName = event.target.getAttribute("data-tab");
    setSelectedTab(tabName);
  };

  return (
    <section className="w-full flex p-1 text-sm bg-blue-200">
      <button
        data-tab="Overview"
        className={`border-y-1 px-2  rounded-l border border-gray-500 ${
          selectedTab === "Overview" ? "bg-pink-300" : "bg-slate-200"
        }`}
        onClick={handleTabClick}
      >
        Overview
      </button>
      <button
        data-tab="Economic"
        className={`border-y-1 px-2  border-y border-gray-500 ${
          selectedTab === "Economic" ? "bg-pink-300" : "bg-slate-200"
        }`}
        onClick={handleTabClick}
      >
        Economic
      </button>
      <button
        data-tab="Environmental"
        className={`border-y-1 px-2  border border-gray-500 ${
          selectedTab === "Environmental" ? "bg-pink-300" : "bg-slate-200"
        }`}
        onClick={handleTabClick}
      >
        Environmental
      </button>
      <button
        data-tab="AirQuality"
        className={`border-y-1 px-2  border-y border-gray-500 ${
          selectedTab === "AirQuality" ? "bg-pink-300" : "bg-slate-200"
        }`}
        onClick={handleTabClick}
      >
        Air Quality
      </button>
      <button
        data-tab="ExtremeWeather"
        className={`border-y-1 px-2  border-y border-l border-gray-500 ${
          selectedTab === "ExtremeWeather" ? "bg-pink-300" : "bg-slate-200"
        }`}
        onClick={handleTabClick}
      >
        Extreme Weather
      </button>
      <button
        data-tab="GreenSpace"
        className={`border-y-1 px-2  rounded-r border border-gray-500 ${
          selectedTab === "GreenSpace" ? "bg-pink-300" : "bg-slate-200"
        }`}
        onClick={handleTabClick}
      >
        Green Space
      </button>
    </section>
  );
}
