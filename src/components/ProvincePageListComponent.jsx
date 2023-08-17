// "use client";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";

import TableRow from "./TableRow";
import { getProvinceId } from "@/lib/utils";
import { getAllDistrictsInSelectedProvinceByYear } from "@/lib/districtdata";
import Link from "next/link";
import questionMarkIconFill from "../../public/question-fill.png";
import Image from "next/image";

// getting params and searchParams from the the countryPage which is child of layout... it will rendered when these properties change and thus this should be up to date
export default async function ProvincePageListComponent({
  country,
  province,
  searchParams,
}) {
  // console.log("[CountryPageListComponent] rendered: server");

  // REPLACE THIS FUNCTION WITH SOMETHING THAT DOESNT NEED TO CALL THE EXTRA PROVINCE_ID FUNCTION
  // USE SOMETHING SIMILAR TO WHAT WE DID FOR THE VISUAL COMPONENT
  // call this cached function,,
  const gedDataProvince = await getAllProvincesInSelectedCountry(country);
  const province_id = await getProvinceId(gedDataProvince, province);
  // console.log("[ProvincePageListComponent] :: province_id", province_id);
  const districtData = await getAllDistrictsInSelectedProvinceByYear(
    country,
    province_id,
    searchParams.year
  );
  // console.log("your province data :: ", districtData);

  return (
    <div className="w-full h-full flex flex-col">
      {/* header */}
      <section className="w-full flex justify-between bg-orange-200 px-2 py-1 items-center ">
        <span className="text-lg bg-white">
          Districts in <b>{decodeURIComponent(province)}</b> in{" "}
          <b>{searchParams.year}</b>
        </span>
        <span className="text-sm text-blue-600 bg-white">Compare Data</span>
      </section>
      {/* body */}
      <section className="w-full bg-white font-bold flex text-center ">
        {/*<span className="bg-red-100 w-1/12 border-2 border-black">No</span>*/}
        <span className="bg-red-100 border-2 border-black w-6/12">
          District
        </span>
        <span className="bg-red-100 w-3/12 border-r-2 border-y-2 border-black flex justify-center items-center gap-2 ">
          <span>Environment</span>
          <span
            className="relative group
              "
          >
            <div className="w-52 tooltip-content hidden group-hover:block absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-slate-800 text-white text-xs rounded py-4 px-4">
              <div className="font-normal">
                Learn more about how to calculate environmental scores
              </div>
              {/* Link to methodology page in new tab, try include hash key to take user to a section on the page */}
              <div className="text-blue-400">Learn more</div>
            </div>
            <Image
              src={questionMarkIconFill}
              alt="question-mark-popup"
              width={18}
            />
          </span>
        </span>
        <span className="bg-red-100 w-3/12 border-r-2 border-y-2 border-black flex justify-center items-center gap-2 ">
          <span>Economic</span>
          <span
            className="relative group
              "
          >
            <div className="w-52 tooltip-content hidden group-hover:block absolute bottom-0 left-1/2 z-10 transform -translate-x-3/4 translate-y-full bg-slate-800 text-white text-xs rounded py-4 px-4 ">
              {
                <div className=" font-normal">
                  Learn more about how to calculate economic scores
                </div>
              }
              {/* Link to methodology page in new tab, try include hash key to take user to a section on the page */}
              <Link
                href="/methodology"
                target="_blank"
                className="text-blue-400"
              >
                Learn more
              </Link>
            </div>
            <Image
              src={questionMarkIconFill}
              alt="question-mark-popup"
              width={18}
            />
          </span>
        </span>
      </section>
      {/* rows */}
      <section
        className={`w-full h-full flex flex-col  overflow-auto scrollbar-none `}
      >
        {districtData
          .sort((a, b) => {
            if (a.DISTRICT < b.DISTRICT) return -1;
            if (a.DISTRICT > b.DISTRICT) return 1;
            return 0;
          })
          .map((district, idx) => (
            <TableRow
              country={country}
              province={province}
              searchParams={searchParams}
              key={idx + 1}
              number={idx + 1}
              regionName={district.DISTRICT}
              econ={Math.round(district.ECON_SCORE)}
              envr={Math.round(district.ENVR_SCORE)}
            />
          ))}
      </section>
    </div>
  );
}
