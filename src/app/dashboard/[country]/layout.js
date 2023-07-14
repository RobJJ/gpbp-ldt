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
      <section className="w-full h-full bg-white flex gap-2 p-5">
        <ClientCompMap />
        {children}
      </section>
    </div>
  );
}

// maybe move the   <FilterButton /> to the dashboard layout.js page? (create one that is)
