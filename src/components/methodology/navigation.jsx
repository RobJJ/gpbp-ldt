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
      </div>
      {/* 2. METHODS */}
      <div className=" flex flex-col gap-3 font-inter">
        <h3 className="text-lg font-bold flex gap-2 hover:text-[#4345AA]">
          <span>2.</span>
          <Link href={"#methods"}>Methods</Link>
        </h3>
        <div className="flex flex-col gap-3   pl-6">
          <Link
            href={"#indicator-selection"}
            className="hover:text-[#4345AA] font-semibold"
          >
            2.1 Indicator Selection
          </Link>
          <Link href={"#pca"} className="hover:text-[#4345AA] font-semibold">
            2.2 Principal Component Analysis
          </Link>
          {/* nested */}
          <div className="flex flex-col gap-2">
            <Link
              href={"#econ-score-review"}
              className="hover:text-[#4345AA] font-semibold"
            >
              2.3 Prosperity Score Overview
            </Link>
            <Link href={"#2.3.1"} className="pl-6 hover:text-[#4345AA]">
              2.3.1 Utility Score calculations
            </Link>
            <Link href={"#2.3.2"} className="pl-6 hover:text-[#4345AA]">
              2.3.2 Built Area calculations
            </Link>
            <Link href={"#2.3.3"} className="pl-6 hover:text-[#4345AA]">
              2.3.3 Prosperity Score calculations
            </Link>
          </div>
          {/* nested */}
          <div className="flex flex-col gap-2">
            <Link
              href={"#env-score-overview"}
              className="hover:text-[#4345AA] font-semibold"
            >
              2.4 Livability Score Overview
            </Link>
            <Link href={"#2.4.1"} className="pl-6 hover:text-[#4345AA]">
              2.4.1 Air Quality Score
            </Link>
            <Link href={"#2.4.2"} className="pl-6 hover:text-[#4345AA]">
              2.4.2 Extreme Weather Score
            </Link>
            <Link href={"#2.4.3"} className="pl-6 hover:text-[#4345AA]">
              2.4.3 Green Space Score
            </Link>
            <Link href={"#2.4.4"} className="pl-6 hover:text-[#4345AA]">
              2.4.4 Livability Score calculations
            </Link>
          </div>
        </div>
      </div>
      {/* 3. SCHEMA */}
      <div className=" flex flex-col gap-1 font-inter">
        <h3 className="text-lg font-bold flex gap-2 hover:text-[#4345AA]">
          <span>3.</span> <Link href={"#schema"}>Schema</Link>
        </h3>
      </div>
      {/* 4. Generative AI & Policy */}
      <div className=" flex flex-col gap-1 font-inter">
        <h3 className="text-lg font-bold flex gap-2 hover:text-[#4345AA]">
          <span>4.</span>{" "}
          <Link href={"#ai_policy"}>Generative AI & Policy</Link>
        </h3>
      </div>
      {/* 5. Generative AI within the GED */}
      <div className=" flex flex-col gap-1 font-inter">
        <h3 className="text-lg font-bold flex gap-2 hover:text-[#4345AA]">
          <span>5.</span>{" "}
          <Link href={"#ai_ged"}>Generative AI within the LDT</Link>
        </h3>
      </div>
    </>
  );
}
