"use client";
// test client implementation
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";

import BreadCrumbs from "@/components/BreadCrumbs";
import FilterButton from "@/components/FilterButton";
import ClientCompMap from "@/components/clientcompmap";

export default function CountryPageLayout({ children }) {
  // const pathname = usePathname();
  const params = useParams();
  console.log("[CountryPageLayout] : rendered : params", params);
  // const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col">
      <FilterButton />
      <main className="w-full h-full bg-white flex gap-2 p-5">
        <section className="w-1/2 h-full">
          <ClientCompMap params={params} />
        </section>
        <section className="w-1/2 h-full flex flex-col gap-2">
          <BreadCrumbs params={params} />
          {children}
        </section>
      </main>
    </div>
  );
}

// maybe move the   <FilterButton /> to the dashboard layout.js page? (create one that is)
