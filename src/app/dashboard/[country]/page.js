// ** note ** this is a dynamic server comp. Can fetch params and data here

import CountryPageInfoCard from "@/components/CountryPageInfoCard";
import CountryPageListComponent from "@/components/CountryPageListComponent";
import LoadingSpinner from "@/components/LoadingComponent";
import { getCountryInfo } from "@/lib/countryInfo";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
import { Suspense } from "react";

export default async function CountryPage({ params, searchParams }) {
  const countryInfo = await getCountryInfo(params.country);
  // console.log("country info :: ", countryInfo);

  return (
    <div className="w-full h-full bg-purple-300 flex flex-col p-2 pb-0 gap-2 overflow-auto">
      <section className="w-full max-h-1/2 bg-purple-100 flex items-start flex-wrap gap-4">
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
      {/* this should be a click component as it needs to do NAV!*/}
      <section className="w-full h-full bg-purple-100 overflow-auto scrollbar-none ">
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
