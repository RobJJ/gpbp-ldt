import Link from "next/link";

export default function MethodologyNavigation() {
  return (
    <>
      <Link href={"#methodology"} className="text-3xl  font-bold font-poppins ">
        <h2 className="hover:text-[#4345AA]">Methodology</h2>
      </Link>
      {/* 1. */}
      <div className=" flex flex-col gap-1 font-inter">
        <h3 className="text-lg font-bold flex gap-2 hover:text-[#4345AA]">
          <span>1.</span> <Link href={"#econ"}>Economic Score Overview</Link>
        </h3>
        <div className="flex flex-col gap-1  pl-6 ">
          <Link href={"#econ.1"} className="hover:text-[#4345AA]">
            1.1 Luminosity Per Capita Calculation
          </Link>
          <Link href={"#econ.2"} className="hover:text-[#4345AA]">
            1.2 Luminosity Growth Rate Calculation
          </Link>
          <Link href={"#econ.3"} className="hover:text-[#4345AA]">
            1.3 Calculating overall Economic Score
          </Link>
        </div>
      </div>
      {/* 2. */}
      <div className=" flex flex-col gap-1 font-inter">
        <h3 className="text-lg font-bold flex gap-2 hover:text-[#4345AA]">
          <span>2.</span>
          <Link href={"#envr"}>Environmental Score Overview</Link>
        </h3>
        <div className="flex flex-col gap-1  pl-6">
          <Link href={"#envr.1"} className="hover:text-[#4345AA]">
            2.1 Air Quality Index
          </Link>
          <Link href={"#envr.2"} className="hover:text-[#4345AA]">
            2.2 Extreme Weather Score
          </Link>
          <Link href={"#envr.3"} className="hover:text-[#4345AA]">
            2.3 Forest Score
          </Link>
          <Link href={"#envr.4"} className="hover:text-[#4345AA]">
            2.4 Calculating overall Environmental Score
          </Link>
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
