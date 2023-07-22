import { getProvinceGeojson } from "@/lib/geojsonData";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
import VisualComponentClientParent from "./VisualComponentClientParent";

// stream in data here to let layout.js load in async

export default async function LayoutVisualComponent({ country, province }) {
  console.log("[ClientCompVisual] : rendered");
  // by default,, when country is selected,, you need the [country]-province-geojson and [country]-province-data... so just fetch that straight away and pass down to parent... the map needs both, the scatter only needs the geddata
  const geojsonDataProvince = await getProvinceGeojson(country);
  const gedDataProvince = await getAllProvincesInSelectedCountry(country);

  return (
    <div className="w-full h-full flex">
      <VisualComponentClientParent
        geojsonDataProvince={geojsonDataProvince}
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
