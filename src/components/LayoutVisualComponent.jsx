import {
  getDistrictGeojson,
  getProvinceGeojson,
  getAllGeojsonData,
} from "@/lib/geojsonData";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
import VisualComponentClientParent from "./VisualComponentClientParent";
import { getDistricts } from "@/lib/districtdata";
import VisualComponentClientParentV2 from "./VisualComponentClientParent-v2";

// fetch GEO data and the ged data here... figure out how to make it faster by promise.all to allow concurrent calls

export default async function LayoutVisualComponent({ country }) {
  // think what needs to be awaited and what doesnt here... you dont need to await everything
  // const geojsonDataProvince = await getProvinceGeojson(country);
  // const geojsonDataDistrict = await getDistrictGeojson(country);
  // this approach allows you to handle concurrent calls to the server?
  const { provinceGeoData, districtGeoData } = await getAllGeojsonData(country);
  //
  // consider combining these two functions in a promise.all() function to handle concurrently
  const gedDataProvince = await getAllProvincesInSelectedCountry(country);
  const gedDataDistrict = await getDistricts(country);

  // grab country positions here for now
  // const countryCenterPosition = process.env[`${country}`]
  const mapbox_url = process.env.MAPBOX_URL;

  return (
    <div className="w-full h-full flex">
      <VisualComponentClientParentV2
        provinceGeoData={provinceGeoData}
        districtGeoData={districtGeoData}
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
