"use client";

import { scatterViewType } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function ScatterTypeToggle() {
  const [scatterType, setScatterType] = useAtom(scatterViewType);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  let year = searchParams.get("year");
  let score_one = searchParams.get("score_one");
  let score_two = searchParams.get("score_two");

  const handleScatterTypeToggle = (event) => {
    const choice = event.target.getAttribute("data-tab");

    setScatterType(choice);
    router.push(
      `/dashboard/${params.country}?year=${year}&score_one=${score_one}&score_two=${score_two}`
    );
    return;
  };

  return (
    <div className="flex gap-3 ">
      <button
        data-tab="districts"
        className={`bg-white px-1 rounded cursor-pointer ${
          scatterType === "districts" ? "font-bold" : ""
        }`}
        onClick={handleScatterTypeToggle}
      >
        Districts
      </button>
      <button
        data-tab="provinces"
        className={`bg-white px-1 rounded cursor-pointer ${
          scatterType === "provinces" ? "font-bold" : ""
        }`}
        onClick={handleScatterTypeToggle}
      >
        Provinces
      </button>
    </div>
  );
}
