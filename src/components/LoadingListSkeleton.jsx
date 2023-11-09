import { capitalizeFirstLetter } from "@/lib/utils";
import React from "react";

export default function LoadingListSkeleton({ country, year }) {
  return (
    <section className="w-full h-full flex flex-col">
      {/* header */}
      <div className="w-full flex justify-between bg-white  py-1 items-center font-inter">
        <span className="text-lg bg-white">
          Provinces in <b>{capitalizeFirstLetter(country)}</b> in <b>{year}</b>
        </span>
      </div>
      {/* body - header */}
      <section className="w-full bg-white font-semibold flex font-inter">
        {/*<span className="bg-red-100 w-1/12 border-2 border-black">No</span>*/}
        <span className="bg-white border border-black w-1/3 px-2 py-1">
          Province
        </span>
        <span className="bg-white border-r border-y border-black w-1/3 px-2 py-1">
          Environment
        </span>
        <span className="bg-white border-r border-y border-black w-1/3 px-2 py-1">
          Economic
        </span>
      </section>
      <section className="w-full h-full mt-2 flex flex-col gap-3 animate-pulse">
        <span className="w-full h-5 bg-slate-300 rouunded" />
        <span className="w-full h-5 bg-slate-300 rouunded" />
        <span className="w-full h-5 bg-slate-300 rouunded" />
        <span className="w-full h-5 bg-slate-300 rouunded" />
        <span className="w-full h-5 bg-slate-300 rouunded" />
        <span className="w-full h-5 bg-slate-300 rouunded" />
        <span className="w-full h-5 bg-slate-300 rouunded" />
        <span className="w-full h-5 bg-slate-300 rouunded" />
        <span className="w-full h-5 bg-slate-300 rouunded" />
        <span className="w-full h-5 bg-slate-300 rouunded" />
      </section>
    </section>
  );
}
