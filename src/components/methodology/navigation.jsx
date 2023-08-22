import Link from "next/link";

export default function MethodologyNavigation() {
  return (
    <>
      <h2 className="text-3xl bg-pink-200 font-bold font-poppins ">
        Methodology
      </h2>
      {/* 1. */}
      <div className="bg-pink-200 flex flex-col gap-1 font-inter">
        <h3 className="text-lg font-bold flex gap-2">
          <span>1.</span> <a href={"#econ"}>Economic Score Overview</a>
        </h3>
        <div className="flex flex-col gap-1 bg-pink-300 pl-6 ">
          <span>1.1 Luminosity Per Capita Calculation</span>
          <span>1.2 Luminosity Growth Rate Calculation</span>
          <span>1.3 Calculating overall Economic Score</span>
        </div>
      </div>
      {/* 2. */}
      <div className="bg-pink-200 flex flex-col gap-1 font-inter">
        <h3 className="text-lg font-bold flex gap-2">
          <span>2.</span> Environmental Score Overview
        </h3>
        <div className="flex flex-col gap-1 bg-pink-300 pl-6">
          <span>2.1 Air Quality Index</span>
          <span>2.2 Extreme Weather Score</span>
          <span>2.3 Forest Score</span>
          <span>2.4 Calculating overall Environmental Score</span>
        </div>
      </div>
      {/* 3. */}
      <div className="bg-pink-200 flex flex-col gap-1 font-inter">
        <h3 className="text-lg font-bold flex gap-2">
          <span>3.</span> Schema
        </h3>
        <div className="flex flex-col gap-1 bg-pink-300 pl-6">
          <span>3.1 Luminosity Per Capita Calculation</span>
          <span>3.2 Luminosity Growth Rate Calculation</span>
          <span>3.3 Calculating overall Economic Score</span>
        </div>
      </div>
    </>
  );
}
