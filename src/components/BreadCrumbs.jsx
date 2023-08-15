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
    <div className="w-full bg-slate-300 flex gap-2 p-1">
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
          className="bg-white"
        >
          {capitalizeFirstLetter(params.country)}
        </Link>
      )}
      {params.province && "/"}
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
          className="bg-white"
        >
          {decodeURIComponent(params.province)}
        </Link>
      )}
      {params.district && "/"}
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
          className="bg-white"
        >
          {decodeURIComponent(params.district)}
        </Link>
      )}
    </div>
  );
}
