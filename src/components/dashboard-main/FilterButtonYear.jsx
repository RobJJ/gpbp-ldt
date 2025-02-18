"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FilterButtonYear({ country }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let yearParam = searchParams.get("year");
  let scoreOne = searchParams.get("score_one");
  let scoreTwo = searchParams.get("score_two");

  const handleYearChange = (e) => {
    const choice = e.target.dataset.tag;
    // console.log("choice :: ", choice);
    router.push(
      `${pathname}?year=${choice}&score_one=${scoreOne}&score_two=${scoreTwo}`
    );
  };

  return (
    <Menu as="div" className="relative inline-block text-left font-inter">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {yearParam}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-black"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute w-full left-0 z-10 mt-1 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {country === "bhutan" && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    data-tag="2024"
                    onClick={handleYearChange}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block text-left px-3 py-2 text-sm w-full"
                    )}
                  >
                    2024
                  </button>
                )}
              </Menu.Item>
            )}
            {country === "bhutan" && (
              <Menu.Item>
                {({ active }) => (
                  <button
                    data-tag="2023"
                    onClick={handleYearChange}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block text-left px-3 py-2 text-sm w-full"
                    )}
                  >
                    2023
                  </button>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <button
                  data-tag="2022"
                  onClick={handleYearChange}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block text-left px-3 py-2 text-sm w-full"
                  )}
                >
                  2022
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  data-tag="2021"
                  onClick={handleYearChange}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block text-left px-3 py-2 text-sm w-full"
                  )}
                >
                  2021
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  data-tag="2020"
                  onClick={handleYearChange}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block text-left px-3 py-2 text-sm w-full"
                  )}
                >
                  2020
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  data-tag="2019"
                  onClick={handleYearChange}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block text-left px-3 py-2 text-sm w-full"
                  )}
                >
                  2019
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
