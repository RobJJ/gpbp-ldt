"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import refreshIcon from "../../public/refresh-line.svg";

export default function ResetFiltersButton() {
  const router = useRouter();
  const params = useParams();

  const handleReset = () => {
    router.push(
      `/dashboard/${params.country}?year=2022&score_one=econ&score_two=envr`
    );
  };

  return (
    <button
      onClick={handleReset}
      className="flex gap-2 text-[#4345AA] font-inter"
    >
      <Image src={refreshIcon} alt="refresh-icon" width={20} height={20} />
      <span className="font-semibold text-sm">Reset Filters</span>
    </button>
  );
}
