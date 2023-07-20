"use client";
import React, { useState } from "react";
import { animated, useSpring } from "react-spring";

function SwitchComponent() {
  const [visual, setVisual] = useState(false);

  const props = useSpring({
    left: visual ? "0%" : "50%",
    backgroundColor: "lightblue",
  });

  return (
    <div className="relative w-32 h-8 bg-gray-200 rounded-full">
      <animated.div className="absolute h-full rounded-full" style={props}>
        <div className="h-full w-16 flex items-center justify-center"></div>
      </animated.div>
      <div className="absolute inset-0 flex items-center justify-between">
        <button
          className="w-32 h-full flex items-center justify-center rounded-full bg-transparent  focus:outline-none"
          onClick={() => setVisual(true)}
        >
          {"Scatter"}
        </button>
        <button
          className="w-32 h-full flex items-center justify-center rounded-full bg-transparent  focus:outline-none"
          onClick={() => setVisual(false)}
        >
          {"Map"}
        </button>
      </div>
    </div>
  );
}

export default SwitchComponent;
