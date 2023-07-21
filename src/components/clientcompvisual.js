"use client";

import { visualTypeSelected } from "@/lib/atoms";
import { useAtom } from "jotai";
import {
  usePathname,
  useSearchParams,
  useRouter,
  useParams,
} from "next/navigation";

// this is the top level component for the MAP / SCATTER components. Each of these will be client components that will be rendered based on this parent level changing based on filterbase searchParams
//map : needs geodata x2 levels streamed in.. suspense wrapper
// scatter : needs data based on [country]-[province]-data (GED Database matching) as default then if the searchParams change this will be rendered!! -- filter the data by year
// this means when route changes to [country]-[district]-data, you pass through that new data -- filter the data by year

export default function ClientCompVisual() {
  // load data here on client.. this component will rerender everytime the searchParams or params change

  //
  const params = useParams();
  const searchParams = useSearchParams();
  const [visualType, setVisualType] = useAtom(visualTypeSelected);
  console.log("[ClientCompVisual] : rendered");
  // console.log("[ClientCompVisual] : rendered : searchParams:", searchParams);

  // function handleClick() {
  //   router.push(`/dashboard/${chosenCountry}?layer=district`);
  // }
  return (
    <div className="w-full h-full flex flex-col gap-2">
      {visualType === "scatter" && (
        <section className="w-full h-full bg-yellow-200">
          I AM SCATTER COMPONENT
        </section>
      )}
      {visualType === "map" && (
        <section className="w-full h-full bg-yellow-300">
          {" "}
          I AM MAP COMPONENT
        </section>
      )}
    </div>
  );
}
