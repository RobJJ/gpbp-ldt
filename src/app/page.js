import dynamic from "next/dynamic";
// import VideoComponent from "@/components/VideoComponent";
import landingImage from "../../public/landing.png";
import pimpamIcon from "../../public/pimxpam.png";
import gpbpIcon from "../../public/gpbp.png";
import bdoIcon from "../../public/bdo.png";

import SelectCountryButton from "@/components/SelectCountryButton";
import Image from "next/image";
import LandingPageCardComponent from "@/components/LandingPageCardComponent";

const VideoComponent = dynamic(() => import("@/components/VideoComponent"), {
  ssr: false,
});

export default function Home({ searchParams }) {
  // console.log("[HOME] : searchParams : ", searchParams);
  return (
    <div className="w-full h-full bg-pink-200 flex gap-1 overflow-auto">
      {/* LEFT PANEL */}
      <section className="h-full w-7/12 bg-white flex flex-col justify-center pl-10">
        <h1 className="w-full font-bold text-3xl bg-slate-300 mb-5">
          Green Economy Diagnostic Tool
        </h1>
        <div className="w-full flex flex-col gap-1 bg-slate-300">
          <h3>
            <b>Get started</b> by selecting your country below
          </h3>
          <SelectCountryButton />
        </div>
        <div className="w-full bg-slate-300 overflow-auto">
          The Green Economy Diagnostic (GED) is a tool that maps the economic
          and environmental performance of sub-national regions within a
          country. It is designed to provide a comprehensive picture of the
          performance of districts in terms of both economic and environmental
          factors. To measure the economic performance of districts, the GED
          considers two key indicators: (i) luminosity per capita growth rates
          and (ii) luminosity per capita levels. These indicators provide a
          snapshot of the economic well-being of districts and help to paint a
          picture of their level of development.
        </div>
        <div className="w-full flex">
          <VideoComponent />
        </div>
        {/*cards*/}
        <div className="w-full bg-slate-300">
          <h3 className="font-bold text-xl">Part of the PIMxPAM Suite:</h3>
          <div className="w-full flex gap-5">
            <LandingPageCardComponent
              header={"PIM x PAM"}
              text={"Public investment & asset management"}
              link={"https://pim-pam.net/"}
              icon={pimpamIcon}
            />
            <LandingPageCardComponent
              header={"GPBP"}
              text={"Geospation Planning & Budgeting Platform"}
              link={"https://gpbprtd.eu.pythonanywhere.com/"}
              icon={gpbpIcon}
            />
            <LandingPageCardComponent
              header={"BDO"}
              text={"Big Data Observatory"}
              link={"https://bdo-vietnam.com/"}
              icon={bdoIcon}
            />
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
