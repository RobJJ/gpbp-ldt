"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import icon from "../../public/map-pin-range-line.png";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function BreadCrumbs() {
  const params = useParams();
  const searchParams = useSearchParams();

  // console.log("[BreadCrumbs] : rendered ");
  return (
    <div className="w-full  flex gap-2 p-1 border-b border-b-[#E7E7E7]">
      <Image src={icon} alt="Logo" className="text-blue-500" />
      {params.country && (
        <Link
          href={{
            pathname: `/dashboard/${params.country}`,
            query: {
              year: searchParams.get("year"),
              score_one: searchParams.get("score_one"),
              score_two: searchParams.get("score_two"),
            },
          }}
          className={`${
            params.province ? "text-black" : "text-red-600 font-semibold"
          }`}
        >
          {capitalizeFirstLetter(params.country)}
        </Link>
      )}
      {params.province && <span className="text-slate-400">/</span>}
      {params.province && (
        <Link
          href={{
            pathname: `/dashboard/${params.country}/${params.province}`,
            query: {
              year: searchParams.get("year"),
              score_one: searchParams.get("score_one"),
              score_two: searchParams.get("score_two"),
            },
          }}
          className={`${
            params.district ? "text-black" : "text-red-600 font-semibold"
          }`}
        >
          {decodeURIComponent(params.province)}
        </Link>
      )}
      {params.district && <span className="text-slate-400">/</span>}
      {params.district && (
        <Link
          href={{
            pathname: `/dashboard/${params.country}/${params.province}/${params.district}`,
            query: {
              year: searchParams.get("year"),
              score_one: searchParams.get("score_one"),
              score_two: searchParams.get("score_two"),
            },
          }}
          className={`text-red-600 font-semibold`}
        >
          {decodeURIComponent(params.district)}
        </Link>
      )}
    </div>
  );
}
