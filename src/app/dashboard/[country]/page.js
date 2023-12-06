// ** note ** this is a dynamic server comp. Can fetch params and data here

import CountryPageInfoCard from "@/components/dashboard-child/CountryPageInfoCard";
import CountryPageListComponent from "@/components/dashboard-child/CountryPageListComponent";
import LoadingSpinner from "@/components/dashboard-child/LoadingComponent";
import { getCountryInfo } from "@/lib/countryInfo";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
import { Suspense } from "react";

export default async function CountryPage({ params, searchParams }) {
  const countryInfo = await getCountryInfo(params.country);

  return (
    <div className="w-full h-full  flex flex-col pt-2 gap-5 overflow-auto">
      {/* CARDS */}
      <section className="w-full max-h-1/2  flex items-start flex-wrap gap-4 pb-4 px-2 ">
        <CountryPageInfoCard
          label={"Admin 1 Regions"}
          fact={countryInfo[0].regions_admin_1}
        />
        <CountryPageInfoCard
          label={"Admin 2 Regions"}
          fact={countryInfo[0].regions_admin_2}
        />
        <CountryPageInfoCard
          label={"Total Population"}
          fact={countryInfo[0].total_population}
        />
        <CountryPageInfoCard
          label={"Total Area Size (km2)"}
          fact={countryInfo[0].total_area_size}
        />
        <CountryPageInfoCard
          label={"GDP PPP (constant 2017 int dollars)"}
          fact={countryInfo[0].gdp_ppp}
        />
        <CountryPageInfoCard
          label={"GDP per capita PPP (constant 2017 int dollars)"}
          fact={countryInfo[0].gdp_per_capita_ppp}
        />
      </section>
      {/* LIST*/}
      <section className="w-full h-full">
        <Suspense fallback={<LoadingSpinner />}>
          <CountryPageListComponent
            country={params.country}
            searchParams={searchParams}
          />
        </Suspense>
      </section>
    </div>
  );
}
