"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const availableScores = [
  { id: 1, type: "econ" },
  { id: 2, type: "envr" },
  { id: 3, type: "air" },
  { id: 4, type: "temp" },
  { id: 5, type: "forest" },
];

export default function FilterButtonScoreTwo({
  paramScoreTwo,
  createQueryString,
  filterState,
}) {
  // const router = useRouter();
  // const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  //   const [scoreTwo, setScoreTwo] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCountrySelect = (e) => {
    const choice = e.target.dataset.tag;
    filterState.set("score_two", choice);

    // setScoreTwo(choice);
    // router.push(pathname + "?" + createQueryString("score_two", choice));
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
            {filterState.get("score_two")}
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
              {availableScores.map((type, idx) => {
                return (
                  <span
                    onClick={handleCountrySelect}
                    data-tag={type.type}
                    className="font-bold text-center block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer"
                    role="menuitem"
                    key={type.id}
                  >
                    {type.type}
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
