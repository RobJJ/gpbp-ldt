// ** dynamic

import DistrictPageVisual from "@/components/DistrictPageVisual";
import LoadingSpinner from "@/components/LoadingComponent";
import Link from "next/link";
import { Suspense } from "react";

export default function DistrictPage({ params, searchParams }) {
  console.log("[DistrictPage] : params : searchParams", params, searchParams);
  return (
    <div className="bg-blue-200 w-full h-full flex flex-col gap-2 p-2">
      <section className="w-full h-3/5 flex flex-col bg-orange-100 rounded">
        {/* header */}
        <div className="w-full flex justify-between items-center bg-orange-300">
          <span className="font-bold text-xl pl-1">
            {decodeURIComponent(params.district)} Performance
          </span>
          <span className="text-[#5467C0] flex gap-1">
            <Link className="underline" href={"/methodology"} target="_blank">
              Methodology
            </Link>
            <span className="text-slate-500 px-1">|</span>

            <span
              className="relative group
              "
            >
              <span className="underline cursor-pointer">Download Data</span>
              <div className=" tooltip-content hidden group-hover:block absolute bottom-0 left-1/2 z-10 transform -translate-x-3/4 translate-y-full bg-slate-800  text-sm rounded py-2 px-2 ">
                <div className="font-semibold text-blue-400">
                  Upcoming feature
                </div>
              </div>
            </span>
          </span>
        </div>
        {/* main */}
        <Suspense fallback={<LoadingSpinner />}>
          <DistrictPageVisual
            country={params.country}
            province={params.province}
            searchParams={searchParams}
          />
        </Suspense>
      </section>
      <span className="bg-blue-100 w-full h-1/2 text-2xl font-bold">
        [DISTRICT LEVEL] : SHOW insights HERE <br />
        ** fetch data in this{" "}
        <span className="text-red-500">async server component</span> based on
        district selected - feed data to the highcharts component **
      </span>
    </div>
  );
}
