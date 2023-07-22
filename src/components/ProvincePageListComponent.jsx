// "use client";
import { getAllProvincesInSelectedCountryByYear } from "@/lib/provinceData";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// getting params and searchParams from the the countryPage which is child of layout... it will rendered when these properties change and thus this should be up to date
export default async function ProvincePageListComponent({
  country,
  searchParams,
  province,
}) {
  console.log("[ProvincePageListComponent] rendered: server");
  // ***** working ****
  // data based on [country] and year
  // const provinceData = await getAllProvincesInSelectedCountryByYear(
  //   country,
  //   searchParams.year
  // );
  // console.log("[CountryPageListComponent] : data :", provinceData);

  return (
    <section className="w-full h-1/2 bg-purple-100 flex flex-col gap-5">
      <span className="w-full h-1/2 bg-orange-100 rounded text-2xl font-bold">
        [PROVINCE LEVEL] : SHOW list HERE <br />
        ** fetch data in this{" "}
        <span className="text-red-500">async server component</span> based on
        province selected - feed data to the list component **
      </span>
      {/* example of a district from list that links to its district page */}
      <Link
        href={{
          pathname: `/dashboard/${country}/${province}/testDistrictBitch`,
          // can spread the searchParams!!!! *******
          query: { ...searchParams },
        }}
        className="bg-blue-200"
      >
        You can navigate to a district from here
      </Link>
    </section>
  );
}
