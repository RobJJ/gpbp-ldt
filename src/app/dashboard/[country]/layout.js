import BreadCrumbs from "@/components/BreadCrumbs";
import LayoutVisualComponent from "@/components/LayoutVisualComponent";

import FilterNavbarExp from "@/components/FilterNavbarExp";
import { Suspense } from "react";
import Spinner from "../../../components/Spinner-normal-size.svg";
import Image from "next/image";

export const metadata = {
  title: "GED: Dashboard",
  description: "Green Economy Diagnostic Tool",
};

export default async function CountryPageLayout({ children, params }) {
  //

  // console.log("[CountryPageLayout] : rendered : server: PARAMS???", params);

  return (
    <div className="w-full h-full flex flex-col overflow-auto relative">
      <FilterNavbarExp />
      <main className="w-full h-full bg-white flex gap-2  overflow-auto">
        <section className="w-1/2 h-full">
          <Suspense
            fallback={
              <div className="bg-purple-200 flex justify-center items-center w-full h-full">
                <Image priority src={Spinner} alt="loading spinner" />
              </div>
            }
          >
            <LayoutVisualComponent country={params.country} />
          </Suspense>
        </section>
        <section className="w-1/2 h-full flex flex-col gap-2 overflow-auto pt-2 pr-1">
          <BreadCrumbs />
          {children}
        </section>
      </main>
    </div>
  );
}

// maybe move the   <FilterButton /> to the dashboard layout.js page? (create one that is)
