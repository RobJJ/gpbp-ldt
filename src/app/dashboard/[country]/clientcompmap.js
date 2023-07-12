"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

// this comp

export default function ClientCompMap({ chosenCountry }) {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick() {
    router.push(`/dashboard/${chosenCountry}?layer=skinky`);
  }
  return (
    <div>
      <button onClick={handleClick} className="bg-slate-200 p-1">
        Change the router
      </button>
    </div>
  );
}
