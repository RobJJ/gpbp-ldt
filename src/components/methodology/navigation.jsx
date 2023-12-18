import Link from "next/link";

export default function MethodologyNavigation() {
  return (
    <>
      <Link
        href={"#methodology"}
        className="text-3xl  font-bold font-poppins mb-3"
      >
        <h2 className="hover:text-[#4345AA]">Methodology</h2>
      </Link>
      {/* 1. DISCLAIMER */}
      <div className=" flex flex-col gap-2 font-inter">
        <h3 className="text-lg font-bold flex gap-2 hover:text-[#4345AA]">
          <span>1.</span> <Link href={"#disclaimer"}>Disclaimer</Link>
        </h3>
        {/* old setup */}
        {/* <div className="flex flex-col gap-2  pl-6 ">
          <Link href={"#econ.1"} className="hover:text-[#4345AA]">
            1.1 Luminosity Per Capita Calculation
          </Link>
          <Link href={"#econ.2"} className="hover:text-[#4345AA]">
            1.2 Luminosity Growth Rate Calculation
          </Link>
          <Link href={"#econ.3"} className="hover:text-[#4345AA]">
            1.3 Calculating overall Economic Score
          </Link>
        </div> */}
      </div>
      {/* 2. METHODS */}
      <div className=" flex flex-col gap-3 font-inter">
        <h3 className="text-lg font-bold flex gap-2 hover:text-[#4345AA]">
          <span>2.</span>
          <Link href={"#envr"}>Methods</Link>
        </h3>
        <div className="flex flex-col gap-3   pl-6">
          <Link href={"#envr.1"} className="hover:text-[#4345AA] font-semibold">
            2.1 Indicator Selection
          </Link>
          <Link href={"#envr.2"} className="hover:text-[#4345AA] font-semibold">
            2.2 Principal Component Analysis
          </Link>
          {/* nested */}
          <div className="flex flex-col gap-2">
            <Link
              href={"#envr.3"}
              className="hover:text-[#4345AA] font-semibold"
            >
              2.3 Economic Score Overview
            </Link>
            <span className="pl-6">2.3.1 Utility Score calculations</span>
            <span className="pl-6">2.3.2 Built Area calculations</span>
            <span className="pl-6">2.3.3 Economic Score calculations</span>
          </div>
          {/* nested */}
          <div className="flex flex-col gap-2">
            <Link
              href={"#envr.4"}
              className="hover:text-[#4345AA] font-semibold"
            >
              2.4 Environmental Score Overview
            </Link>
            <span className="pl-6">2.4.1 Air Quality Score</span>
            <span className="pl-6">2.4.2 Extreme Weather Score</span>
            <span className="pl-6">2.4.3 Green Space Score</span>
            <span className="pl-6">2.4.4 Environment Score calculations</span>
          </div>
        </div>
      </div>
      {/* 3. */}
      <div className=" flex flex-col gap-1 font-inter">
        <h3 className="text-lg font-bold flex gap-2 hover:text-[#4345AA]">
          <span>3.</span> <Link href={"#schema"}>Schema</Link>
        </h3>
      </div>
    </>
  );
}
