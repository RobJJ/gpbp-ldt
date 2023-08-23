"use client";
import React, { useState } from "react";
import { animated, useSpring, config } from "react-spring";
import { visualTypeSelected } from "@/lib/atoms";
import { useAtom } from "jotai";
import useSWR from "swr";

// const fetcher = async (url, token) => {
//   const [tag, country] = url;
//   //   console.log("tag : country", tag, country);
//   const data = await fetch("/app/api/geo");
//   // console.log("the data should be a ping", data);
// };
// const fetchWithToken = async (url, token) => {
//   // console.log("hit : ", url, token);
//   const data = await fetch(url);
// };
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function SwitchComponent({ country }) {
  // visual atom: defaults to "map",, can be "map" or "scatter"
  const [visualType, setVisualType] = useAtom(visualTypeSelected);
  // console.log("[SwitchComponent] : param :", country);
  const { data, error, isLoading } = useSWR(
    `/api/geo?country=${country}`,
    fetcher
  );

  const props = useSpring({
    left: visualType === "scatter" ? "0%" : "50%",
    backgroundColor: "#4345AA",
    config: { tension: 280, friction: 25 }, // increased tension and reduced friction
  });

  const scatterButtonStyle =
    visualType === "scatter" ? "text-white" : "text-black";
  const mapButtonStyle = visualType === "scatter" ? "text-black" : "text-white";

  const handleToggle = (e) => {
    const choice = e.target.getAttribute("data-tag");
    if (visualType === "scatter" && choice === "map") {
      setVisualType(choice);
    }
    if (visualType === "map" && choice === "scatter") {
      setVisualType(choice);
    }
    return;
  };

  if (isLoading) return <div>Loading</div>;
  console.log("Your data sir ::", data);

  return (
    <div className="p-1 bg-white rounded-md">
      <div className="relative w-40 h-7 bg-white ">
        <animated.div className="absolute w-20 h-7 rounded-md" style={props}>
          <div className="h-full w-full flex items-center justify-center"></div>
        </animated.div>
        <div className="absolute inset-0 flex items-center justify-between">
          <button
            data-tag="scatter"
            className={`w-32 h-full flex items-center justify-center rounded-full bg-transparent focus:outline-none ${scatterButtonStyle}`}
            onClick={handleToggle}
          >
            {"Scatter"}
          </button>
          <button
            data-tag="map"
            className={`w-32 h-full flex items-center justify-center rounded-full bg-transparent  focus:outline-none ${mapButtonStyle}`}
            onClick={handleToggle}
          >
            {"Map"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwitchComponent;
