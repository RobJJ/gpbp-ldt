// server component but [λ  (Server)] - lets look into this
// **note**
// going to try get

import FilterButton from "@/components/FilterButton";
import ClientCompMap from "@/components/clientcompmap";

export default function CountryPageLayout({ children, params }) {
  // console.log("[CountryPageLayout] : params : ", params);
  return (
    <div className="w-full h-full flex flex-col">
      <FilterButton />
      <main className="w-full h-full bg-white flex gap-2 p-5">
        <section className="w-1/2 h-full">
          <ClientCompMap />
        </section>
        <section className="w-1/2 h-full flex flex-col">
          <div className="w-full bg-red-400">Breadcrumbs here</div>
          {children}
        </section>
      </main>
    </div>
  );
}

// maybe move the   <FilterButton /> to the dashboard layout.js page? (create one that is)
