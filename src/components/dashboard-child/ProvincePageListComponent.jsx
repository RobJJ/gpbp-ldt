import Link from "next/link";
import Image from "next/image";

import TableRow from "./TableRow";
import { getAllDistrictsInSelectedProvinceByYear } from "@/lib/districtdata";
import questionMarkIconFill from "../../../public/question-fill.png";

export default async function ProvincePageListComponent({
  country,
  province,
  searchParams,
}) {
  const districtData = await getAllDistrictsInSelectedProvinceByYear(
    country,
    decodeURIComponent(province),
    Number(searchParams.year)
  );

  return (
    <div className="w-full h-full flex flex-col">
      {/* header */}
      <section className="w-full flex justify-between pr-2 py-1 items-center font-inter ">
        <span className="text-lg bg-white">
          {country === "serbia" || country === "albania"
            ? "Municipalities"
            : "Districts"}{" "}
          in <b>{decodeURIComponent(province)}</b> in <b>{searchParams.year}</b>
        </span>
      </section>
      {/* body - header */}
      <section className="w-full bg-white font-bold flex font-inter">
        <span className="bg-white border border-black w-1/3 px-2 py-1">
          {country === "serbia" || country === "albania"
            ? "Municipality"
            : "District"}
        </span>
        <span className="bg-white w-1/3 border-r border-y border-black flex px-2 py-1 items-center gap-2 ">
          <span>Livability</span>
          <span
            className="relative group
              "
          >
            <div className="w-52 tooltip-content hidden group-hover:block absolute z-10 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-slate-800 text-white text-xs rounded py-4 px-4 text-center">
              <div className="font-normal">
                Learn more about how to calculate Livability scores
              </div>

              <Link
                href="/methodology#envr"
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
        <span className="bg-white w-1/3 border-r border-y border-black flex px-2 py-1 items-center gap-2 ">
          <span>Prosperity</span>
          <span
            className="relative group
              "
          >
            <div className="w-52 tooltip-content hidden group-hover:block absolute bottom-0 left-1/2 z-10 transform -translate-x-3/4 translate-y-full bg-slate-800 text-white text-xs rounded py-4 px-4 text-center">
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
            <Image
              src={questionMarkIconFill}
              alt="question-mark-popup"
              width={18}
            />
          </span>
        </span>
      </section>
      {/* body - rows */}
      <section className={`w-full flex flex-col `}>
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
