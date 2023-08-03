import { getDistrictGeojson, getProvinceGeojson } from "@/lib/geojsonData";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
import VisualComponentClientParent from "./VisualComponentClientParent";
import { getDistricts } from "@/lib/districtdata";
import VisualComponentClientParentV2 from "./VisualComponentClientParent-v2";

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

  // These two calls dont take that long!
  // if we fetch all GED data here, it can run on server,, then you have all GED info, and can rather just filter the data based on what you need.. no need to additional calls to server with react query?
  const gedDataProvince = await getAllProvincesInSelectedCountry(country);
  const gedDataDistrict = await getDistricts(country);
  // console.log("gedData province length:", gedDataProvince.length);
  // console.log("gedData district length:", gedDataDistrict.length);

  return (
    <div className="w-full h-full flex">
      {/* 1st attempt - this is working but we will try optimise */}
      {/*<VisualComponentClientParent
        geojsonDataProvince={geojsonDataProvince}
        // geojsonDataDistrict={geojsonDataDistrict}
        gedDataDistrict={gedDataDistrict}
        gedDataProvince={gedDataProvince}
  />}
  {/* exp approach to data and comp handling */}
      <VisualComponentClientParentV2
        geojsonDataProvince={geojsonDataProvince}
        // geojsonDataDistrict={geojsonDataDistrict}
        gedDataDistrict={gedDataDistrict}
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
