"use client";
import useSWR from "swr";
import Spinner from "../../public/Infinity-1.1s-28px.svg";
import Image from "next/image";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function MapToggleButton({
  country,
  mapButtonStyle,
  handleToggle,
}) {
  // Initialise the fetch in here
  // Fetch data here and cache this as this key :: `/api/geo?country=${country}`
  const { data, error, isLoading } = useSWR(
    `/api/geo?country=${country}`,
    fetcher
  );

  return (
    <>
      {isLoading && (
        <span
          className={`w-32 h-full flex items-center justify-center bg-transparent focus:outline-none`}
        >
          <Image src={Spinner} alt="spinner-icon" width={25} height={15} />
        </span>
      )}
      {data && (
        <button
          data-tag="map"
          className={`w-32 h-full flex items-center justify-center rounded-full bg-transparent focus:outline-none font-semibold ${mapButtonStyle}`}
          onClick={handleToggle}
        >
          {"Map"}
        </button>
      )}
    </>
  );
}
