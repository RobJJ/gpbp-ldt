// "use client";
import {
  getAllProvincesInSelectedCountry,
  getAllProvincesInSelectedCountryByYear,
} from "@/lib/provinceData";
import Link from "next/link";
import TableRow from "./TableRow";
import { capitalizeFirstLetter } from "@/lib/utils";

// getting params and searchParams from the the countryPage which is child of layout... it will rendered when these properties change and thus this should be up to date
export default async function CountryPageListComponent({
  country,
  searchParams,
}) {
  // console.log("[CountryPageListComponent] rendered: server");
  // ***** working ****
  // data based on [country] and year
  const provinceDataTest = await getAllProvincesInSelectedCountryByYear(
    country,
    searchParams.year
  );

  // const provinceData = await getAllProvincesInSelectedCountry(country);
  // console.log("[CountryPageListComponent] : data :", provinceDataTest);

  return (
    <div className="w-full h-full flex flex-col">
      {/* header */}
      <section className="w-full flex justify-between bg-white  py-1 items-center font-inter">
        <span className="text-lg bg-white">
          Provinces in <b>{capitalizeFirstLetter(country)}</b> in{" "}
          <b>{searchParams.year}</b>
        </span>
        <span
          className="relative group flex items-center
              "
        >
          <span className="underline cursor-pointer text-sm text-[#5467C0]">
            Compare Data
          </span>
          <div className=" tooltip-content hidden group-hover:block absolute bottom-0 left-1/2 z-10 transform -translate-x-3/4 translate-y-full bg-slate-800 text-sm rounded py-2 px-2 ">
            <div className="font-semibold text-blue-300">Upcoming feature</div>
          </div>
        </span>
      </section>
      {/* body */}
      <section className="w-full bg-white font-bold flex text-center font-inter">
        {/*<span className="bg-red-100 w-1/12 border-2 border-black">No</span>*/}
        <span className="bg-white border border-black w-6/12">Province</span>
        <span className="bg-white w-3/12 border-r border-y border-black flex justify-center items-center gap-2 ">
          <span>Environment</span>
          <span
            className="relative group
              "
          >
            <div className="w-52 tooltip-content hidden group-hover:block absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-slate-800 text-white text-xs rounded py-4 px-4 ">
              {
                <div className=" font-normal">
                  Learn more about how to calculate environmental scores
                </div>
              }
              {/* Link to methodology page in new tab, try include hash key to take user to a section on the page */}
              <Link
                href="/methodology#section5"
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
        <span className="bg-white w-3/12 border-r border-y border-black flex justify-center items-center gap-2 ">
          <span>Economic</span>
          <span
            className="relative group
              "
          >
            <div className="w-52 tooltip-content hidden group-hover:block absolute bottom-0 left-1/2 z-10 transform -translate-x-full translate-y-full bg-slate-800 text-white text-xs rounded py-4 px-4 ">
              {
                <div className=" font-normal">
                  Learn more about how to calculate economic scores
                </div>
              }
              {/* Link to methodology page in new tab, try include hash key to take user to a section on the page */}
              <Link
                href="/methodology#section5"
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
      <section
        className={`w-full h-full flex flex-col  overflow-auto scrollbar-none `}
      >
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
