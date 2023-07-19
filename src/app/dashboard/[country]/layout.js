// "use client";
// test client implementation
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";

import BreadCrumbs from "@/components/BreadCrumbs";
import ClientCompMap from "@/components/clientcompmap";
import FilterNavbar from "@/components/FilterNavbar";
import FilterNavbarExp from "@/components/FilterNavbarExp";

export default function CountryPageLayout({ children }) {
  // const pathname = usePathname();
  // const params = useParams();
  // const searchParams = useSearchParams();

  // console.log("[CountryPageLayout] : rendered : searchParams?",);
  // const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col">
      <FilterNavbarExp />
      <main className="w-full h-full bg-white flex gap-2 p-5">
        <section className="w-1/2 h-full">
          <ClientCompMap />
        </section>
        <section className="w-1/2 h-full flex flex-col gap-2">
          <BreadCrumbs />
          {children}
        </section>
      </main>
    </div>
  );
}

// maybe move the   <FilterButton /> to the dashboard layout.js page? (create one that is)
