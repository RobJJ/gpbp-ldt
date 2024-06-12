import { getAllProvincesInSelectedCountryByYear } from "@/lib/provinceData";
import Link from "next/link";
import TableRow from "./TableRow";
import { capitalizeFirstLetter } from "@/lib/utils";

export default async function CountryPageListComponent({
  country,
  searchParams,
}) {
  const provinceDataTest = await getAllProvincesInSelectedCountryByYear(
    country,
    searchParams.year
  );

  return (
    <div className="w-full h-full flex flex-col">
      {/* header */}
      <section className="w-full flex justify-between bg-white  py-1 items-center font-inter">
        <span className="text-lg bg-white">
          {country === "serbia" ? "Districts" : "Provinces"} in{" "}
          <b>{capitalizeFirstLetter(country)}</b> in <b>{searchParams.year}</b>
        </span>
      </section>
      {/* body - header */}
      <section className="w-full bg-white font-semibold flex font-inter">
        <span className="bg-white border border-black w-1/3 px-2 py-1">
          {country === "serbia" ? "District" : "Province"}
        </span>
        <span className="bg-white w-1/3 border-r border-y border-black flex px-2 py-1 items-center gap-2 ">
          <span>Livability</span>
          <span
            className="relative group cursor-pointer
              "
          >
            <div className="w-52 tooltip-content hidden group-hover:block absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-slate-800 text-white text-xs rounded py-3 px-4 text-center">
              {
                <div className=" font-normal ">
                  Learn more about how to calculate Livability scores
                </div>
              }
              <Link
                href="/methodology#envr"
                target="_blank"
                className="text-blue-400"
              >
                Learn more
              </Link>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="tooltip w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </span>
        <span className="bg-white w-1/3 border-r border-y border-black flex  px-2 py-1 items-center gap-2 ">
          <span>Prosperity</span>
          <span
            className="relative group cursor-pointer
              "
          >
            <div className=" w-48 tooltip-content hidden group-hover:block absolute bottom-0 left-1/2 z-10 transform -translate-x-1/2 translate-y-full bg-slate-800 text-white text-xs rounded py-3 px-4 text-center">
              {
                <div className=" font-normal">
                  Learn more about how to calculate Prosperity scores
                </div>
              }

              <Link
                href="/methodology#econ"
                target="_blank"
                className="text-blue-400"
              >
                Learn more
              </Link>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="tooltip w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </span>
      </section>
      {/* rows */}
      <section className={`w-full flex flex-col`}>
        {provinceDataTest
          .sort((a, b) => {
            if (a.PROVINCE < b.PROVINCE) return -1;
            if (a.PROVINCE > b.PROVINCE) return 1;
            return 0;
          })
          .map((province, idx) => (
            <TableRow
              country={country}
              searchParams={searchParams}
              key={idx + 1}
              number={idx + 1}
              regionName={province.PROVINCE}
              econ={Math.round(province.ECON_SCORE)}
              envr={Math.round(province.ENVR_SCORE)}
            />
          ))}
      </section>
    </div>
  );
}
