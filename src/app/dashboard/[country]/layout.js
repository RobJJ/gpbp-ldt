// "use client";
// test client implementation
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";

import BreadCrumbs from "@/components/BreadCrumbs";
import ClientCompVisual from "@/components/clientcompvisual";

import FilterNavbarExp from "@/components/FilterNavbarExp";

export default function CountryPageLayout({ children }) {
  //

  //

  console.log("[CountryPageLayout] : rendered : server");

  return (
    <div className="w-full h-full flex flex-col">
      <FilterNavbarExp />
      <main className="w-full h-full bg-white flex gap-2 p-5">
        <section className="w-1/2 h-full">
          <ClientCompVisual />
        </section>
        <section className="w-1/2 h-full flex flex-col gap-2">
          <BreadCrumbs />
          {children}
        </section>
      </main>
    </div>
  );
}

// maybe move the   <FilterButton /> to the dashboard layout.js page? (create one that is)
