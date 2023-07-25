// "use client";
import { getAllProvincesInSelectedCountryByYear } from "@/lib/provinceData";
import Link from "next/link";

// getting params and searchParams from the the countryPage which is child of layout... it will rendered when these properties change and thus this should be up to date
export default async function CountryPageListComponent({
  country,
  searchParams,
}) {
  console.log("[CountryPageListComponent] rendered: server");
  // ***** working ****
  // data based on [country] and year
  const provinceData = await getAllProvincesInSelectedCountryByYear(
    country,
    searchParams.year
  );
  // console.log("[CountryPageListComponent] : data :", provinceData);

  return (
    <section className="w-full h-1/2 bg-purple-100 flex flex-col gap-5">
      <span className="text-2xl font-bold">
        [COUNTRY LEVEL] : show list of provinces here <br />
        ** fetch data in this{" "}
        <span className="text-red-500">async server component</span> based on
        country and year :: <span className="text-green-500">working</span>
      </span>
      {/* example link navigation from province list item decodeURIComponent(params.province) */}
      <Link
        href={{
          pathname: `/dashboard/${country}/${decodeURIComponent("Đakovica")}`,
          query: {
            year: `${searchParams.year}`,
            score_one: `${searchParams.score_one}`,
            score_two: `${searchParams.score_two}`,
          },
        }}
        className="bg-blue-200"
      >
        Go to this province!
      </Link>
    </section>
  );
}
