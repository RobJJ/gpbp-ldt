// "use client";

// import { visualTypeSelected } from "@/lib/atoms";
// import { useAtom } from "jotai";
// import {
//   usePathname,
//   useSearchParams,
//   useRouter,
//   useParams,
// } from "next/navigation";
import MapComponentParent from "./MapComponentParent";
import ScatterComponentParent from "./ScatterParent";
import MapChild from "./MapChild";
import { getProvinceGeojson } from "@/lib/geojsonData";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
// import { getProvinceGeojson } from "@/lib/geojsonData";

// this is the top level component for the MAP / SCATTER components. Each of these will be client components that will be rendered based on this parent level changing based on filterbase searchParams
//map : needs geodata x2 levels streamed in.. suspense wrapper
// scatter : needs data based on [country]-[province]-data (GED Database matching) as default then if the searchParams change this will be rendered!! -- filter the data by year
// this means when route changes to [country]-[district]-data, you pass through that new data -- filter the data by year
// const fetcher = (url) => fetch(url).then((r) => r.json());

export default async function ClientCompVisual({ country, province }) {
  console.log("[ClientCompVisual] : rendered");
  // by default,, when country is selected,, you need the [country]-province-geojson and [country]-province-data... so just fetch that straight away and pass down to parent... the map needs both, the scatter only needs the geddata
  const geoDataProvince = await getProvinceGeojson(country);
  const gedDataProvince = await getAllProvincesInSelectedCountry(country);
  // let districtDataForSelectedProvince;
  //
  // if (province) {
  //   districtDataForSelectedProvince =
  //     await getAllDistrictsInSelectedProvinceById(province);
  // }
  // console.log(
  //   "[ClientCompVisual] : rendered : districtData?",
  //   districtDataForSelectedProvince
  // );

  return (
    <div className="w-full h-full flex">
      <MapComponentParent
        geoDataProvince={geoDataProvince}
        gedDataProvince={gedDataProvince}
      />
    </div>
  );
}

// **
// if this is a client component that functions very similar to how we have it setup now,, but the client Map and Scatter components can receive children ... we then pass that component here with the correct Map or Scatter component,, those components then are allowed to be server components and can render on the server with the data received as props??

// <MapComponentParent>
//   <MapChild country={params.country} year={searchParams.get("year")} />
// </MapComponentParent>;

//  {
//    visualType === "map" && (
//      <MapComponentParent
//      // country={params.country}
//      // year={searchParams.get("year")}
//      />
//    );
//  }
//  {
//    visualType === "scatter" && (
//      <ScatterComponentParent
//      // country={params.country}
//      // year={searchParams.get("year")}
//      />
//    );
//  }
