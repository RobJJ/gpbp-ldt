import { Inter, Open_Sans } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

import Image from "next/image";
import WB_logo from "../../public/landing_page/wb_logo.png";
import Swiss_logo from "../../public/landing_page/swiss_logo.png";
import EU_logo from "../../public/landing_page/eu_logo.png";
import AUS_logo from "../../public/landing_page/aus_logo.png";

import landing_image from "../../public/landing_page/landing_image.png";
import SelectCountryButton from "@/components/landing/new_SelectCountryButton";

export default function Home({ searchParams }) {
  return (
    <div
      className={` ${open_sans.className} w-full h-full flex items-center justify-center p-32  overflow-hidden gap-20 bg-primary-bg `}
    >
      <div className="flex flex-col w-[1400px] gap-20 ">
        {/* top */}
        <section className=" w-full flex justify-between">
          <div className="w-[480px] flex flex-col gap-20">
            <div className="flex flex-col gap-2">
              <h2 className="text-[#8398F9] text-base font-semibold">
                Local Development Tool
              </h2>
              <h1 className="text-[36px] font-bold text-white">
                Measuring Prosperity and Livability at the local level with open
                Geospatial Data
              </h1>
              <p className={inter.className + " text-[#C7C7C7] text-base"}>
                Leverage local development insights to drive smarter policy
                decisions.
              </p>
            </div>
            <div className="flex gap-4">
              <SelectCountryButton />
            </div>
          </div>
          <div className="w-1/2 flex justify-end ">
            <Image
              src={landing_image}
              width={610}
              height={500}
              alt="A landing image showing an overview of the application"
            />
          </div>
        </section>
        {/* bottom */}
        <section className=" w-full flex flex-col gap-2">
          <h3 className={` ${inter.className} text-[#D7DBE9] text-sm`}>
            Implemented by
          </h3>
          <div className="flex justify-between items-center">
            <Image
              src={WB_logo}
              width={210}
              height={38}
              alt="The World Bank Logo"
            />
            <Image src={EU_logo} width={130} height={35} alt="EU Logo" />
            <Image src={AUS_logo} width={250} height={50} alt="AUS Logo" />
            <Image src={Swiss_logo} width={220} height={58} alt="Swiss Logo" />
          </div>
        </section>
      </div>
    </div>
  );
}
