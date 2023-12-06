import { Suspense } from "react";
import Link from "next/link";

import DownloadButtonParentDistrict from "@/components/dashboard-child/DistrictPage-DownloadButtonParent";
import DistrictPageInsightsComponent from "@/components/dashboard-child/DistrictPageInsightsComponent";
import DistrictPageVisual from "@/components/dashboard-child/DistrictPageVisual";
import LoadingSpinner from "@/components/LoadingComponent";

export default function DistrictPage({ params, searchParams }) {
  return (
    <div className=" w-full h-full flex flex-col gap-1 overflow-auto ">
      <section className="w-full h-3/5 flex flex-col gap-1 rounded">
        {/* header */}
        <div className="w-full flex justify-between items-center font-inter pr-2">
          <span className="font-bold text-xl ">
            {decodeURIComponent(params.district)} Performance
          </span>
          <span className="text-[#5467C0] flex gap-1 text-sm items-center">
            <Link className="underline" href={"/methodology"} target="_blank">
              Methodology
            </Link>
            <span className="text-slate-500 px-1">|</span>
            <DownloadButtonParentDistrict
              country={params.country}
              district={params.district}
            />
          </span>
        </div>
        {/* main */}
        <Suspense fallback={<LoadingSpinner />}>
          <DistrictPageVisual
            country={params.country}
            district={params.district}
          />
        </Suspense>
      </section>
      <section className="w-full h-2/5 flex flex-col gap-1 ">
        {/* header */}
        <div className="w-full flex justify-between items-center font-inter">
          <span className="font-bold text-xl ">Regional Insights</span>
        </div>
        {/* main */}
        <div className="w-full h-full ">
          <Suspense fallback={<LoadingSpinner />}>
            <DistrictPageInsightsComponent
              country={params.country}
              district={params.district}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
