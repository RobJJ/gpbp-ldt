"use client";
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

  // the default values are coming from the searchParams so they are always in sync for user!
  const [year, setYear] = useState(yearParam);
  const [topic, setTopic] = useState(scoreOneParam);

  // handle changing router here...
  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(
      `${pathname}?year=${year}&score_one=${topic}&score_two=${scoreTwoParam}`
    );
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
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
        value={topic}
        onChange={handleTopicChange}
        className=" border rounded-md"
      >
        <option value="econ">eco</option>
        <option value="envr">envr</option>
        <option value="air">air</option>
        <option value="forest">forest</option>
        <option value="temp">temp</option>
      </select>
      <input
        type="submit"
        value="Submit"
        className=" bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
      />
    </form>
  );
}
