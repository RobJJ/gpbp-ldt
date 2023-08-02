"use client";

export default function ProvincePageVisualChildHeader({
  selectedTab,
  setSelectedTab,
}) {
  const handleTabClick = (event) => {
    // console.log(event.target.getAttribute("data-tab"));
    const tabName = event.target.getAttribute("data-tab");
    setSelectedTab(`${tabName}`);
  };

  return (
    <section className="w-full flex p-1 text-sm bg-blue-200">
      <button
        data-tab="Overview"
        className={`border-y-1 px-2 bg-slate-200 rounded-l border border-gray-500 ${
          selectedTab === "Overview" ? "bg-pink-300" : ""
        }`}
        onClick={handleTabClick}
      >
        Overview
      </button>
      <button
        data-tab="Economic"
        className={`border-y-1 px-2 bg-slate-200 border-y border-gray-500 ${
          selectedTab === "Economic" ? "bg-pink-300" : ""
        }`}
        onClick={handleTabClick}
      >
        Economic
      </button>
      <button
        data-tab="Environmental"
        className={`border-y-1 px-2 bg-slate-200 border border-gray-500 ${
          selectedTab === "Environmental" ? "bg-pink-300" : ""
        }`}
        onClick={handleTabClick}
      >
        Environmental
      </button>
      <button
        data-tab="Air Quality"
        className={`border-y-1 px-2 bg-slate-200 border-y border-gray-500 ${
          selectedTab === "Air Quality" ? "bg-pink-300" : ""
        }`}
        onClick={handleTabClick}
      >
        Air Quality
      </button>
      <button
        data-tab="Extreme Weather"
        className={`border-y-1 px-2 bg-slate-200 border-y border-l border-gray-500 ${
          selectedTab === "Extreme Weather" ? "bg-pink-300" : ""
        }`}
        onClick={handleTabClick}
      >
        Extreme Weather
      </button>
      <button
        data-tab="Green Space"
        className={`border-y-1 px-2 bg-slate-200 rounded-r border border-gray-500 ${
          selectedTab === "Green Space" ? "bg-pink-300" : ""
        }`}
        onClick={handleTabClick}
      >
        Green Space
      </button>
    </section>
  );
}
