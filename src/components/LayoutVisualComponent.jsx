import {
  getDistrictGeojson,
  getProvinceGeojson,
  getAllGeojsonData,
} from "@/lib/geojsonData";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
import { getDistricts } from "@/lib/districtdata";
import VisualComponentClientParentV2 from "./VisualComponentClientParent-v2";

// fetch GED data here : Geo fetched in map component - rdy to be consumed when toggled

export default async function LayoutVisualComponent({ country }) {
  // consider combining these two functions in a promise.all() function to handle concurrently on server ?
  const gedDataProvince = await getAllProvincesInSelectedCountry(country);
  const gedDataDistrict = await getDistricts(country);
  //
  const mapbox_url = process.env.MAPBOX_URL;

  return (
    <div className="w-full h-full flex">
      <VisualComponentClientParentV2
        country={country}
        gedDataDistrict={gedDataDistrict}
        gedDataProvince={gedDataProvince}
        mapbox_url={mapbox_url}
      />
    </div>
  );
}

// **
// if this is a client component that functions very similar to how we have it setup now,, but the client Map and Scatter components can receive children ... we then pass that component here with the correct Map or Scatter component,, those components then are allowed to be server components and can render on the server with the data received as props??

// <MapComponentParent>
//   <MapChild country={params.country} year={searchParams.get("year")} />
// </MapComponentParent>;

// {/* 1st attempt - this is working but we will try optimise */}
//       {/*<VisualComponentClientParent
//         geojsonDataProvince={geojsonDataProvince}
//         // geojsonDataDistrict={geojsonDataDistrict}
//         gedDataDistrict={gedDataDistrict}
//         gedDataProvince={gedDataProvince}
//   />}
