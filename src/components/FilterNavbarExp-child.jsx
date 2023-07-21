"use client";
import { visualTypeSelected } from "@/lib/atoms";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function FilterNavbarExpChild({
  yearParam,
  scoreOneParam,
  scoreTwoParam,
}) {
  //   console.log("adqwdqw", scoreOneParam, yearParam);
  const router = useRouter();
  const pathname = usePathname();

  // "map" or "scatter" :: we want to show two score selectors when "scatter"
  const [visualType, setVisualType] = useAtom(visualTypeSelected);

  // the default values are coming from the searchParams so they are always in sync for user!
  const [year, setYear] = useState(yearParam);
  const [scoreOne, setScoreOne] = useState(scoreOneParam);
  const [scoreTwo, setScoreTwo] = useState(scoreTwoParam);

  // handle changing router here...
  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(
      `${pathname}?year=${year}&score_one=${scoreOne}&score_two=${scoreTwo}`
    );
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleScoreOneChange = (event) => {
    setScoreOne(event.target.value);
  };

  const handleScoreTwoChange = (event) => {
    setScoreTwo(event.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white flex items-center justify-center px-2 gap-5"
    >
      <select
        value={year}
        onChange={handleYearChange}
        className=" border rounded-md"
      >
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
      </select>
      <select
        value={scoreOne}
        onChange={handleScoreOneChange}
        className=" border rounded-md"
      >
        <option value="econ">eco</option>
        <option value="envr">envr</option>
        <option value="air">air</option>
        <option value="forest">forest</option>
        <option value="temp">temp</option>
      </select>
      {visualType === "scatter" && (
        <select
          value={scoreTwo}
          onChange={handleScoreTwoChange}
          className=" border rounded-md"
        >
          <option value="econ">eco</option>
          <option value="envr">envr</option>
          <option value="air">air</option>
          <option value="forest">forest</option>
          <option value="temp">temp</option>
        </select>
      )}
      <input
        type="submit"
        value="Submit"
        className=" bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
      />
    </form>
  );
}
