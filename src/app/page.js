import landingImage from "../../public/landing.png";

import SelectCountryButton from "@/components/SelectCountryButton";
import Image from "next/image";

export default function Home({ searchParams }) {
  // console.log("[HOME] : searchParams : ", searchParams);
  return (
    <div className="w-full h-full bg-pink-200 flex gap-1 overflow-auto">
      <section className="h-full w-full bg-white">LEFT</section>
      <section className="h-full w-full bg-white flex">
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
