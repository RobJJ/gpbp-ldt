import LoadingSpinner from "@/components/dashboard-child/LoadingComponent";
import DownloadButtonParent from "@/components/dashboard-child/ProvincePage-DownloadButtonParent";
import ProvincePageListComponent from "@/components/dashboard-child/ProvincePageListComponent";
import ProvincePageVisual from "@/components/dashboard-child/ProvincePageVisual";

import Link from "next/link";
import { Suspense } from "react";

//
//
export default async function ProvincePage({ params, searchParams }) {
  return (
    <div className="w-full h-full flex flex-col gap-1 overflow-auto">
      <section className="w-full h-3/5 flex flex-col gap-1 rounded">
        {/* header */}
        <div className="w-full flex justify-between items-center font-inter pr-2">
          <span className="font-bold text-xl">
            {decodeURIComponent(params.province)} Performance
          </span>
          <span className="text-[#5467C0] flex gap-1 items-center text-sm">
            <Link className="underline " href={"/methodology"} target="_blank">
              Methodology
            </Link>
            <span className="text-slate-500 px-1">|</span>
            <DownloadButtonParent
              country={params.country}
              province={params.province}
            />
          </span>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <ProvincePageVisual
            country={params.country}
            province={params.province}
          />
        </Suspense>
      </section>
      <section className="w-full h-2/5">
        <Suspense fallback={<LoadingSpinner />}>
          <ProvincePageListComponent
            country={params.country}
            province={params.province}
            searchParams={searchParams}
          />
        </Suspense>
      </section>
    </div>
  );
}
