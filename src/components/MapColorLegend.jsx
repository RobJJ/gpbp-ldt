"use client";

import Image from "next/image";

import econ_legend from "../../public/econ_legend.png";
import envr_legend from "../../public/envr_legend.png";
import air_legend from "../../public/air_quality_legend.png";
import forest_legend from "../../public/forest_legend.png";
import temp_legend from "../../public/temp_legend.png";
import { useSearchParams } from "next/navigation";

const icons = {
  econ: econ_legend,
  envr: envr_legend,
  air: air_legend,
  forest: forest_legend,
  temp: temp_legend,
};

export default function MapColorLegend() {
  const searchParams = useSearchParams();
  let score_one = searchParams.get("score_one");

  return (
    <div className="absolute bottom-2 right-2">
      <Image src={icons[score_one]} alt="econ-scale" width={180} />
    </div>
  );
}
