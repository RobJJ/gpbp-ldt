// import dynamic from "next/dynamic";

import landingImage from "../../public/landing.png";
import pimpamIcon from "../../public/pimxpam.png";
import gpbpIcon from "../../public/gpbp.png";
import bdoIcon from "../../public/bdo.png";
import videoIcon from "../../public/play-video-icon.svg";

import SelectCountryButton from "@/components/SelectCountryButton";
import Image from "next/image";
import LandingPageCardComponent from "@/components/LandingPageCardComponent";
import Link from "next/link";

// const VideoComponent = dynamic(() => import("@/components/VideoComponent"), {
//   ssr: false,
// });

export default function Home({ searchParams }) {
  // console.log("[HOME] : searchParams : ", searchParams);
  return (
    <div className="w-full h-full  flex  overflow-auto">
      {/* LEFT PANEL */}
      <section className="h-full w-7/12 bg-white flex flex-col justify-center pl-10">
        <h2 className="text-[#6D778A] text-xl font-inter">
          Geospatial Planning and Budgeting Platform
        </h2>
        <h1 className="w-full font-bold text-4xl mb-5 mt-2 font-poppins">
          Green Economy Diagnostic Tool
        </h1>

        <div className="w-full max-w-[900px]  pr-5 overflow-auto mb-5 font-inter">
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
        {/* Video :: add link to youtube when completed */}
        <div className="flex gap-3  mb-5">
          <Image src={videoIcon} alt="play-video-icon" />
          <Link
            className=" font-bold text-[#4345AA] hover:underline font-poppins"
            href={
              "https://www.loom.com/share/87319021b63f4e9a90d206b0eb57a487?sid=25c7f405-2dc8-41a0-8d82-c0512edfc091"
            }
            target="_blank"
          >
            View Introduction Video
          </Link>
        </div>
        <div className="w-full flex flex-col gap-2  my-5 font-poppins">
          <h3>
            <b>Get started</b> by selecting your country below
          </h3>
          <SelectCountryButton />
        </div>
        {/* removed video component :: reinstall react-player if needed */}
        {/* <div className="w-[460px] flex mb-5 h-[240px] bg-slate-200 rounded-lg">
          <VideoComponent />
  </div> */}
        {/*cards*/}
        <div className="w-full flex flex-col gap-2  mt-5 font-poppins">
          <h3 className="text-xl font-semibold">Part of the PIMxPAM Suite:</h3>
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
      <section className="h-full w-5/12  flex ">
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
