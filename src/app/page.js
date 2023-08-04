import VideoComponent from "@/components/VideoComponent";
import landingImage from "../../public/landing.png";
import pimpamIcon from "../../public/pimxpam.png";

import SelectCountryButton from "@/components/SelectCountryButton";
import Image from "next/image";

export default function Home({ searchParams }) {
  // console.log("[HOME] : searchParams : ", searchParams);
  return (
    <div className="w-full h-full bg-pink-200 flex gap-1 overflow-auto">
      {/* LEFT PANEL */}
      <section className="h-full w-7/12 bg-white flex flex-col gap-1">
        <h1 className="w-full font-bold text-3xl bg-slate-300">
          Green Economy Diagnostic Tool
        </h1>
        <div className="w-full flex flex-col bg-slate-300">
          <h3>
            <b>Get started</b> by selecting your country below
          </h3>
          <SelectCountryButton />
        </div>
        <p className="w-full bg-slate-300">
          The Green Economy Diagnostic (GED) is a tool that maps the economic
          and environmental performance of sub-national regions within a
          country. It is designed to provide a comprehensive picture of the
          performance of districts in terms of both economic and environmental
          factors. To measure the economic performance of districts, the GED
          considers two key indicators: (i) luminosity per capita growth rates
          and (ii) luminosity per capita levels. These indicators provide a
          snapshot of the economic well-being of districts and help to paint a
          picture of their level of development.
        </p>
        <div className="w-full flex justify-center ">
          <VideoComponent />
        </div>
        {/*cards*/}
        <div className="w-full bg-slate-300">
          <h3 className="font-bold text-xl">Part of the PIMxPAM Suite:</h3>
          <div className="w-full flex gap-2">
            <span className="w-1/3 bg-slate-100 border border-black flex gap-2">
              <div className="flex justify-center items-center">
                <Image
                  src={pimpamIcon}
                  alt="pimxpam icon"
                  width={70}
                  height={70}
                />
              </div>
              <div>
                <h5>PIM x PAM</h5>
                <p>Public investment and asset management</p>
                <button>More info</button>
              </div>
            </span>
            <span className="w-1/3 bg-slate-100 border border-black flex">
              <div>image</div>
              <h5>Card Name</h5>
            </span>
            <span className="w-1/3 bg-slate-100 border border-black flex">
              <div>image</div>
              <h5>Card Name</h5>
            </span>
          </div>
        </div>
      </section>
      {/* RIGHT PANEL */}
      <section className="h-full w-5/12 bg-white flex">
        <Image
          src={landingImage}
          alt="Image showing GED"

          // style={{ overflow: "auto" }}
        />
      </section>
    </div>
  );
}

// ** old basic layout
// <div className="w-full h-full bg-pink-200 flex justify-center items-center">
//   <section className="w-1/2 h-1/2 flex flex-col items-center bg-white rounded-lg p-2">
//     <h2>Select your country</h2>
//     <SelectCountryButton />
//   </section>
// </div>;
