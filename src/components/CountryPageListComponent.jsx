"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function CountryPageListComponent({ country }) {
  const router = useRouter();
  const pathname = usePathname();
  const handleProvinceClick = () => {
    router.push(`/dashboard/${country}/fartProvince`);
  };
  return (
    <section className="w-full h-1/2 bg-purple-100 flex flex-col gap-5">
      <span>
        Bottom: A list of provinces for country level shit. We need the province
        data here. the data we fetch is just based on the country and then we
        pass in [country]-province-data. We also need to handle routing here.. a
        user can click on a province name and this will change the route to
        /dashboard/[country]/[province]
      </span>
      <button onClick={handleProvinceClick} className="bg-slate-300">
        Go to this province!!
      </button>
    </section>
  );
}
