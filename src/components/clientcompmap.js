"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

// this comp

export default function ClientCompMap({ params }) {
  const router = useRouter();
  const pathname = usePathname();

  // function handleClick() {
  //   router.push(`/dashboard/${chosenCountry}?layer=district`);
  // }
  return (
    <div className="w-full h-full bg-purple-200 flex flex-col gap-2">
      <span>
        This visual component is fixed at [country] level. Im getting data based
        on the params.....
      </span>
      {params.country && <span>{params.country}</span>}
      {params.province && <span>{params.province}</span>}
      {params.district && <span>{params.district}</span>}
      {/*<button onClick={handleClick} className="bg-slate-200 p-1">
        Change the router
  </button>*/}
    </div>
  );
}
