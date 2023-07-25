// "use client";
import { getAllProvincesInSelectedCountryByYear } from "@/lib/provinceData";
import Link from "next/link";
import TableRow from "./TableRow";

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
    <div className="w-full h-full flex flex-col">
      {/* header */}
      <section className="w-full flex justify-between bg-orange-200 px-2 py-1 items-center ">
        <span className="text-lg bg-white">
          Districts in <b>Thanh Hoa</b>
        </span>
        <span className="text-sm text-blue-600 bg-white">Comapre Data</span>
      </section>
      {/* body */}
      <section className="w-full bg-white font-bold flex text-center">
        <span className="bg-red-100 w-1/12 border-2 border-black">No</span>
        <span className="bg-red-200 border-r-2 border-y-2 border-black w-5/12">
          District
        </span>
        <span className="bg-red-300 w-3/12 border-y-2 border-black flex justify-center items-center gap-2 ">
          <span>Environment</span>
          <span
            className="relative group
              "
          >
            <div className=" w-48 tooltip-content hidden group-hover:block absolute z-10 top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-slate-800 text-white text-xs rounded py-1 px-4">
              <div className="">
                Learn more about how to calculate environmental scores
              </div>
              {/* This section that links the user to the page, could also include the hash key and take them to the exact area on the page */}
              <div className="text-blue-400">Learn more</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="tooltip w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </span>
        <span className="bg-red-300 w-3/12 border-2 border-black">
          Economic
        </span>
      </section>
      {/* rows */}
      <section className="w-full h-full flex flex-col overflow-auto scrollbar-none">
        {provinceData.map((district, idx) => (
          <TableRow
            key={idx + 1}
            number={idx + 1}
            regionName={district.PROVINCE}
            econ={Math.round(district.ECON_SCORE)}
            envr={Math.round(district.ENVR_SCORE)}
          />
        ))}
      </section>
    </div>
  );
}
