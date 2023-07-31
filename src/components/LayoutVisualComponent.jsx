import { getDistrictGeojson, getProvinceGeojson } from "@/lib/geojsonData";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
import VisualComponentClientParent from "./VisualComponentClientParent";

// stream in data here to let layout.js load in async
// this components purpose is to set up the initial data for components

export default async function LayoutVisualComponent({
  country,
  // province,
  // district,
}) {
  // console.log("[LayoutVisualComponent] : rendered");
  // load in initial data from SERVER
  // try cache these on server! - or try stream them in??
  const geojsonDataProvince = await getProvinceGeojson(country);
  // const geojsonDataDistrict = await getDistrictGeojson(country);
  const gedDataProvince = await getAllProvincesInSelectedCountry(country);

  return (
    <div className="w-full h-full flex">
      <VisualComponentClientParent
        geojsonDataProvince={geojsonDataProvince}
        // geojsonDataDistrict={geojsonDataDistrict}
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
