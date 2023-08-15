"use client";

import Link from "next/link";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { capitalizeFirstLetter } from "@/lib/utils";

// add available countries here :: potentially move this to the server options
const currentAvailableCountries = [
  { name: "uzbekistan", id: 1 },
  { name: "kosovo", id: 2 },
  { name: "serbia", id: 3 },
];

export default function SelectCountryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCountrySelect = (e) => {
    const choice = e.target.dataset.tag;

    setCountry(choice);
    setIsOpen(!isOpen);
  };

  return (
    <div className=" flex gap-2 ">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            onClick={toggleDropdown}
            type="button"
            className="flex items-center justify-between w-72 h-10 rounded-md border border-gray-400 px-4 py-1 bg-white text-md  font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
          >
            {country ? country : "Please select country"}
            <FaAngleDown className="text-base ml-1" />
          </button>
        </span>
      </div>
      {isOpen && (
        <div className=" absolute mt-12 w-72 h-9 rounded-md shadow-lg">
          <div className="rounded-md bg-white shadow-xs">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {currentAvailableCountries.map((country, idx) => {
                return (
                  <span
                    onClick={handleCountrySelect}
                    data-tag={country.name}
                    className="font-bold text-center block rounded-b-md px-4 py-2 text-sm leading-5 text-gray-700 bg-slate-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                    role="menuitem"
                    key={country.id}
                  >
                    {capitalizeFirstLetter(country.name)}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* potentially handle any additional logic at this step */}
      <div
        className={` py-2 px-4 text-white font-semibold rounded 
          bg-[#5467C0]
        `}
      >
        {country && (
          <Link
            href={{
              pathname: `/dashboard/${country}`,
              query: { year: "2022", score_one: "econ", score_two: "envr" },
            }}
          >
            Show Data
          </Link>
        )}
        {!country && <span className=" cursor-pointer">Show Data</span>}
      </div>
    </div>
  );
}
