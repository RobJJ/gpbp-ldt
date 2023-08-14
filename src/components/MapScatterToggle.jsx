"use client";
import React, { useState } from "react";
import { animated, useSpring, config } from "react-spring";
import { visualTypeSelected } from "@/lib/atoms";
import { useAtom } from "jotai";

function SwitchComponent() {
  // visual atom: defaults to "map",, can be "map" or "scatter"
  const [visualType, setVisualType] = useAtom(visualTypeSelected);
  // console.log("[SwitchComponent] : visualType :", visualType);
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

  return (
    <div className="relative w-32 h-8 bg-white rounded-full">
      <animated.div className="absolute h-full rounded-full" style={props}>
        <div className="h-full w-16 flex items-center justify-center"></div>
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
  );
}

export default SwitchComponent;
