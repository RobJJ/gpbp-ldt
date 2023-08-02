"use client";

export default function ProvincePageVisualChildVisual({ selectedTab }) {
  // listen for the change of selectedTab value and filter the data based on what that tab needs

  return (
    <section className="w-full h-full bg-blue-300">
      Visual section: {selectedTab}
    </section>
  );
}
