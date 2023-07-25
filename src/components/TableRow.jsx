import React from "react";

const interpolateColor = (score) => {
  // change value of red and all occureneces to a higher color for brighter and lower for darker
  let red = 220,
    green = 0,
    blue = 0;

  if (score <= 50) {
    red = 220;
    green = Math.floor(220 * (score / 50));
  } else {
    red = Math.floor(220 * ((100 - score) / 50));
    green = 220;
  }

  return `rgb(${red}, ${green}, ${blue})`;
};

export default function TableRow({ number, regionName, econ, envr }) {
  const envrColor = interpolateColor(envr);
  return (
    <div className="w-full flex text-center">
      <span className="bg-purple-100 w-1/12 border-x-2 border-black p-2">
        {number}
      </span>
      <span className="bg-purple-200 w-5/12 border-r-2 border-black p-2 font-bold">
        {regionName}
      </span>
      <span className="w-3/12 bg-white  p-2 flex items-center">
        <div className="w-full h-3/4 flex bg-slate-300">
          <div
            className={`h-full`}
            style={{
              backgroundColor: envrColor,
              width: `${envr}%`,
            }}
          />
        </div>
      </span>
      <span className="bg-purple-300 w-3/12 border-x-2  border-black p-2">
        {econ}
      </span>
    </div>
  );
}
