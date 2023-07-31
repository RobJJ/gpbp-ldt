export default function ProvincePageVisualParent() {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <section className="w-full flex p-1 text-sm">
        <div className="border-y-1 px-2 py-1 bg-slate-200 rounded-l border border-gray-500">
          Overview
        </div>
        <div className="border-y-1 px-2 py-1 bg-slate-200 border-y border-gray-500">
          Economic
        </div>
        <div className="border-y-1 px-2 py-1 bg-slate-200 border border-gray-500">
          Environmental
        </div>
        <div className="border-y-1 px-2 py-1 bg-slate-200 border-y border-gray-500">
          Air Quality
        </div>
        <div className="border-y-1 px-2 py-1 bg-slate-200 border-y border-l border-gray-500">
          Extreme Weather
        </div>
        <div className="border-y-1 px-2 py-1 bg-slate-200 rounded-r border border-gray-500">
          Green Space
        </div>
      </section>
      <section className="w-full h-full">Visual section</section>
    </div>
  );
}
