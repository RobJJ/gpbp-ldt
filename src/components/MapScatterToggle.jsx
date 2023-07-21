"use client";
import React, { useState } from "react";
import { animated, useSpring, config } from "react-spring";
import { visualTypeSelected } from "@/lib/atoms";
import { useAtom } from "jotai";

function SwitchComponent() {
  // default is false which sits on "Map" or right hand side
  const [visual, setVisual] = useState(false);
  // visual atom: defaults to "map",, can be "map" or "scatter"
  const [visualType, setVisualType] = useAtom(visualTypeSelected);
  console.log("[SwitchComponent] : visualType :", visualType);
  const props = useSpring({
    left: visual ? "0%" : "50%",
    backgroundColor: "#4345AA",
    config: { tension: 280, friction: 25 }, // increased tension and reduced friction
  });

  const scatterButtonStyle = visual ? "text-white" : "text-black";
  const mapButtonStyle = visual ? "text-black" : "text-white";

  const handleToggle = () => {
    setVisual(!visual);
    if (visual) setVisualType("map");
    if (!visual) setVisualType("scatter");
  };

  return (
    <div className="relative w-32 h-8 bg-white rounded-full">
      <animated.div className="absolute h-full rounded-full" style={props}>
        <div className="h-full w-16 flex items-center justify-center"></div>
      </animated.div>
      <div className="absolute inset-0 flex items-center justify-between">
        <button
          className={`w-32 h-full flex items-center justify-center rounded-full bg-transparent focus:outline-none ${scatterButtonStyle}`}
          onClick={handleToggle}
        >
          {"Scatter"}
        </button>
        <button
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
