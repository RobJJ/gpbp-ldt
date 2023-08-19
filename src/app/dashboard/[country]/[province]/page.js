// ** note ** this is a dynamic server comp. Can fetch params and data here

import LoadingSpinner from "@/components/LoadingComponent";
import ProvincePageListComponent from "@/components/ProvincePageListComponent";
import ProvincePageVisual from "@/components/ProvincePageVisual";

import Link from "next/link";

import { Suspense } from "react";

// ok we have access to the params and searchParams because this is page.js and dynamic
export default async function ProvincePage({ params, searchParams }) {
  // fetch data here for the chosen Province!! This comp gets new params passed through
  // Goal:: show the province data
  //1. Need data based on [country] and [province_name]

  return (
    <div className="w-full h-full bg-orange-200 flex flex-col p-2 gap-2 overflow-auto">
      <section className="w-full h-3/5 flex flex-col bg-orange-100 rounded">
        {/* header */}
        <div className="w-full flex justify-between items-center bg-orange-300">
          <span className="font-bold text-xl pl-1">
            {decodeURIComponent(params.province)} Performance
          </span>
          <span className="text-[#5467C0] flex gap-1 items-center text-sm">
            <Link className="underline " href={"/methodology"} target="_blank">
              Methodology
            </Link>
            <span className="text-slate-500 px-1">|</span>

            <span
              className="relative group flex items-center
              "
            >
              <span className="underline cursor-pointer ">Download Data</span>
              <div className=" tooltip-content hidden group-hover:block absolute bottom-0 left-1/2 z-10 transform -translate-x-3/4 translate-y-full bg-slate-800 text-sm rounded py-2 px-2 ">
                <div className="font-semibold text-blue-400">
                  Upcoming feature
                </div>
              </div>
            </span>
          </span>
        </div>
        {/* main */}
        <Suspense fallback={<LoadingSpinner />}>
          <ProvincePageVisual
            country={params.country}
            province={params.province}
          />
        </Suspense>
      </section>
      <section className="w-full h-2/5 bg-purple-100 overflow-auto scrollbar-none ">
        {/* this component is fetching data inside */}
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
