// "use client";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

// getting params and searchParams from the the countryPage which is child of layout... it will rendered when these properties change and thus this should be up to date
export default function CountryPageListComponent({ country, searchParams }) {
  // get data here based on country and searchParams
  // const router = useRouter();
  // const pathname = usePathname();
  // const handleProvinceClick = () => {
  //   router.push(`/dashboard/${country}/testProvinceBitch`);
  // };
  return (
    <section className="w-full h-1/2 bg-purple-100 flex flex-col gap-5">
      <span>
        Bottom: A list of provinces for country level shit. We need the province
        data here. the data we fetch is just based on the country and then we
        pass in [country]-province-data. We also need to handle routing here.. a
        user can click on a province name and this will change the route to
        /dashboard/[country]/[province]
      </span>
      <span className="">
        year: {searchParams.year}
        <br /> score_one: {searchParams.score_one}
        <br /> score_two: {searchParams.score_two}
      </span>
      {/*<button onClick={handleProvinceClick} className="bg-slate-300">
        Go to this province!!
  </button>*/}
      <Link
        href={{
          pathname: `/dashboard/${country}/testProvince`,
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
