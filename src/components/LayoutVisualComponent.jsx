import { getDistrictGeojson, getProvinceGeojson } from "@/lib/geojsonData";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
import VisualComponentClientParent from "./VisualComponentClientParent";
import { getDistricts } from "@/lib/districtdata";
import VisualComponentClientParentV2 from "./VisualComponentClientParent-v2";

// fetch GEO data and the ged data here... figure out how to make it faster by promise.all to allow concurrent calls

export default async function LayoutVisualComponent({ country }) {
  // think what needs to be awaited and what doesnt here... you dont need to await everything
  const geojsonDataProvince = getProvinceGeojson(country);
  const geojsonDataDistrict = getDistrictGeojson(country);
  // this approach allows you to handle concurrent calls to the server?
  const geoData = await Promise.all([geojsonDataProvince, geojsonDataDistrict]);
  console.log("geoData is rdy::", geoData);
  // const geoData = await Promise.all([geojsonDataProvince, geojsonDataDistrict]);
  const gedDataProvince = await getAllProvincesInSelectedCountry(country);

  const gedDataDistrict = await getDistricts(country);

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
        geojsonDataDistrict={geojsonDataDistrict}
        country={country}
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
