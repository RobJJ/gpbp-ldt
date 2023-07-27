"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const availableYears = [
  { id: 1, year: "2022" },
  { id: 2, year: "2021" },
  { id: 3, year: "2020" },
  { id: 4, year: "2019" },
];

export default function FilterButtonYear({
  paramYear,
  createQueryString,
  filterState,
}) {
  // const router = useRouter();
  // const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // const [year, setYear] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleYearSelect = (e) => {
    const choice = e.target.dataset.tag;
    filterState.set("year", choice);
    // setYear(choice);
    // router.push(pathname + "?" + createQueryString("year", choice));
    // createQueryString("year", choice);
    setIsOpen(!isOpen);
  };

  return (
    <div className=" flex gap-2 ">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            onClick={toggleDropdown}
            type="button"
            className="inline-flex justify-center items-center w-28 h-5 rounded-md border border-gray-400 px-4 py-1 bg-white text-md leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
          >
            {filterState.get("year")}
            <FaAngleDown className="text-base ml-1" />
          </button>
        </span>
      </div>
      {isOpen && (
        <div className=" absolute mt-12 w-32 h-10 rounded-md shadow-lg">
          <div className="rounded-md bg-white shadow-xs">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {availableYears.map((year, idx) => {
                return (
                  <span
                    onClick={handleYearSelect}
                    data-tag={year.year}
                    className="font-bold text-center block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                    role="menuitem"
                    key={year.id}
                  >
                    {year.year}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
