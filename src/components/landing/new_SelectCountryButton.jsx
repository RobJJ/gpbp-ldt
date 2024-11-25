"use client";

import { Inter, Open_Sans } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

import Link from "next/link";
import { useState } from "react";
import arrowDown from "../../../public/landing_page/arrow-down.png";

import { capitalizeFirstLetter } from "@/lib/utils";
import Image from "next/image";

// add available countries here :: TODO -> move this to the server options
const currentAvailableCountries = [
  { name: "bhutan", id: 8 },
  { name: "uzbekistan", id: 1 },
  { name: "kosovo", id: 2 },
  { name: "serbia", id: 3 },
  { name: "albania", id: 4 },
  { name: "montenegro", id: 5 },
  { name: "austria", id: 6 },
  { name: "vietnam", id: 7 },
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
    <div className={`relative flex gap-4 ${inter.className} `}>
      <div>
        <span className="shadow-sm ">
          <button
            onClick={toggleDropdown}
            type="button"
            className="flex items-center rounded-md justify-between w-[310px] px-4 py-2 bg-[#2B3441] text-base text-[#DCDFE5]   focus:outline-none focus:border-blue-300 focus:shadow-outline-blue  transition duration-150 ease-in-out "
          >
            {country
              ? capitalizeFirstLetter(country)
              : "Start by selecting a country"}
            <Image
              src={arrowDown}
              alt="Logo"
              // rememember for this affect to include the empty space
              className={
                " " +
                `${country ? "-rotate-90 duration-300" : ""}` +
                ` ${isOpen ? "rotate-0 duration-300" : ""}`
              }
            />
          </button>
        </span>
      </div>
      {isOpen && (
        <div className=" absolute mt-12 w-[310px] h-36 shadow-lg z-50 overflow-auto scrollbar-landing">
          <div className=" bg-[#2B3441] shadow-xs ">
            <div
              className=""
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {currentAvailableCountries.map((country, idx) => {
                return (
                  <span
                    onClick={handleCountrySelect}
                    data-tag={country.name}
                    className="font-bold text-center block px-4 py-2 text-sm leading-5 text-white bg-[#2B3441] hover:bg-gray-700 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
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
      {/* handle any additional logic at this step */}
      <>
        {country && (
          <Link
            // adding for prefetching performance on country selection
            prefetch={true}
            className="text-white px-4 flex justify-center items-center font-bold  bg-[#4C58F6] rounded-md"
            href={{
              pathname: `/dashboard/${country}`,
              query: { year: "2022", score_one: "econ", score_two: "envr" },
            }}
          >
            Show Data
          </Link>
        )}
        {!country && (
          <span className="text-white px-4 flex justify-center items-center font-bold rounded-md bg-[#4C58F6] cursor-not-allowed">
            Show Data
          </span>
        )}
      </>
    </div>
  );
}
