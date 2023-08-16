"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { urlToLableMatching } from "@/lib/name-matching";
import { scatterViewType } from "@/lib/atoms";
import { useAtom } from "jotai";

import { capitalizeFirstLetter } from "@/lib/utils";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LayerToggle() {
  const [scatterType, setScatterType] = useAtom(scatterViewType);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let yearParam = searchParams.get("year");
  let scoreOne = searchParams.get("score_one");
  let scoreTwo = searchParams.get("score_two");

  const handleToggle = (e) => {
    const choice = e.target.dataset.tag;
    setScatterType(choice);
    // console.log("choice :: ", choice);
    router.push(
      `${pathname}?year=${yearParam}&score_one=${scoreOne}&score_two=${scoreTwo}`
    );
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {capitalizeFirstLetter(scatterType)}
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
        <Menu.Items className="absolute right-0 z-10 mt-1 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  data-tag="provinces"
                  onClick={handleToggle}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full"
                  )}
                >
                  Show Provinces
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  data-tag="districts"
                  onClick={handleToggle}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm w-full"
                  )}
                >
                  Show Districts
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
