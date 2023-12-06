"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import icon from "../../../public/map-pin-range-line.svg";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function BreadCrumbs() {
  const params = useParams();
  const searchParams = useSearchParams();

  return (
    <div className="w-full  flex gap-2 py-1 border-b border-b-[#E7E7E7] font-inter items-center">
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
            params.province ? "text-[#4345AA]" : "text-black "
          }  font-medium text-sm`}
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
            params.district ? "text-[#4345AA]" : "text-black "
          } font-medium text-sm`}
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
          className={`text-black font-medium text-sm`}
        >
          {decodeURIComponent(params.district)}
        </Link>
      )}
    </div>
  );
}
