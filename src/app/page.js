// this is landing page -> handle country level routing here

import SelectCountryButton from "@/components/SelectCountryButton";

export default function Home({ searchParams }) {
  // console.log("[HOME] : searchParams : ", searchParams);
  return (
    <div className="w-full h-full bg-pink-200 flex justify-center items-center">
      <section className="w-1/2 h-1/2 flex flex-col items-center bg-white rounded-lg p-2">
        <h2>Select your country</h2>
        <SelectCountryButton />
      </section>
    </div>
  );
}
