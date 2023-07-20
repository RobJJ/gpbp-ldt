"use client";

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
  console.log("[ClientCompVisual] : rendered : params:", params);
  // console.log("[ClientCompVisual] : rendered : searchParams:", searchParams);

  // function handleClick() {
  //   router.push(`/dashboard/${chosenCountry}?layer=district`);
  // }
  return (
    <div className="w-full h-full bg-purple-200 flex flex-col gap-2">
      <span>
        This visual component is fixed at [country] level. Im getting data based
        on the params.....
      </span>
      <div>
        {params.country && <span>{params.country}</span>}
        {params.province && <span>{params.province}</span>}
        {params.district && <span>{params.district}</span>}
        {/*<button onClick={handleClick} className="bg-slate-200 p-1">
        Change the router
  </button>*/}
      </div>
      <div className="flex flex-col">
        <span>year:{searchParams.get("year")}</span>
        <span>score_one: {searchParams.get("score_one")}</span>
        <span>score_two: {searchParams.get("score_two")}</span>
      </div>
      {/* these two components can change and mutate the params and searchParams: NB! */}
      {searchParams.get("score_one") === "air" && (
        <div className="flex flex-col">
          <span>MAP VISUAL RENDERED</span>
          <span>
            we will render the map here if searchParam is correct: just testing
            with score_one..
          </span>
        </div>
      )}
      {searchParams.get("score_one") === "forest" && (
        <div className="flex flex-col">
          <span>Scatter VISUAL RENDERED</span>
          <span>
            we will render the Scatter here if searchParam is correct: just
            testing with score_one
          </span>
        </div>
      )}
    </div>
  );
}
