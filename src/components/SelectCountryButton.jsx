"use client";

import Link from "next/link";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const currentAvailableCountries = [
  { name: "uzbekistan", id: 1 },
  { name: "kosovo", id: 2 },
  { name: "vietnam", id: 3 },
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
            className="inline-flex justify-center items-center w-72 h-10 rounded-md border border-gray-400 px-4 py-1 bg-white text-md leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
          >
            {country ? country : "Select Country"}
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
                    className="font-bold text-center block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                    role="menuitem"
                    key={country.id}
                  >
                    {country.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* potentially handle any additional logic at this step */}
      <div
        className={` p-2 rounded ${country ? "bg-green-300" : "bg-slate-300"}`}
      >
        <Link href={`/dashboard/${country}`}>Explore</Link>
      </div>
    </div>
  );
}
