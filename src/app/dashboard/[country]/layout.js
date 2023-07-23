// "use client";
// test client implementation
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";

import BreadCrumbs from "@/components/BreadCrumbs";
import LayoutVisualComponent from "@/components/LayoutVisualComponent";

import FilterNavbarExp from "@/components/FilterNavbarExp";
import { Suspense } from "react";
import Spinner from "../../../components/Spinner-normal-size.svg";
import Image from "next/image";

export default function CountryPageLayout({ children, params }) {
  //

  //

  console.log("[CountryPageLayout] : rendered : server: PARAMS???", params);

  return (
    <div className="w-full h-full flex flex-col">
      <FilterNavbarExp />
      <main className="w-full h-full bg-white flex gap-2 p-5">
        <section className="w-1/2 h-full">
          <Suspense
            fallback={
              <div className="bg-slate-200 flex justify-center items-center w-full h-full">
                <Image priority src={Spinner} alt="loading spinner" />
              </div>
            }
          >
            <LayoutVisualComponent
              country={params.country}
              // province={params.province}
              // district={params.district}
            />
          </Suspense>
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
