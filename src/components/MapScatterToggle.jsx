"use client";

import { animated, useSpring, config } from "react-spring";
import { visualTypeSelected } from "@/lib/atoms";
import { useAtom } from "jotai";
import MapToggleButton from "./Map-Toggle-Button";
// import useSWR from "swr";

function SwitchComponent({ country }) {
  // visual atom: defaults to "map",, can be "map" or "scatter"
  const [visualType, setVisualType] = useAtom(visualTypeSelected);
  // console.log("[SwitchComponent] : param :", country);

  const props = useSpring({
    left: visualType === "scatter" ? "0%" : "50%",
    backgroundColor: "#4345AA",
    config: { tension: 280, friction: 25 }, // increased tension and reduced friction
  });

  const scatterButtonStyle =
    visualType === "scatter" ? "text-white" : "text-[#4345AA]";
  const mapButtonStyle =
    visualType === "scatter" ? "text-[#4345AA]" : "text-white";

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
    <div className="p-1 bg-white rounded-md font-inter">
      <div className="relative w-40 h-7 bg-white ">
        <animated.div className="absolute w-20 h-7 rounded-md" style={props}>
          <div className="h-full w-full flex items-center justify-center"></div>
        </animated.div>
        <div className="absolute inset-0 flex items-center justify-between">
          <button
            data-tag="scatter"
            className={`w-32 h-full flex items-center justify-center rounded-full bg-transparent focus:outline-none  ${scatterButtonStyle}`}
            onClick={handleToggle}
          >
            {"Scatter"}
          </button>
          {/*<button
            data-tag="map"
            className={`w-32 h-full flex items-center justify-center rounded-full bg-transparent  focus:outline-none ${mapButtonStyle}`}
            onClick={handleToggle}
          >
            {"Map"}
  </button>*/}
          <MapToggleButton
            country={country}
            mapButtonStyle={mapButtonStyle}
            handleToggle={handleToggle}
          />
        </div>
      </div>
    </div>
  );
}

export default SwitchComponent;
