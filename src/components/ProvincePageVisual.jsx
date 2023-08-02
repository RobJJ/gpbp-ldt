// make this a server component that fetches its data for the selected province

import { getAllDistrictsInSelectedProvinceById } from "@/lib/districtdata";
import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
import { getProvinceId } from "@/lib/utils";
import ProvincePageVisualParent from "./ProvincePageVisualParent";

// ** SERVER COMPONENT TO HANDLE FETCH ON SERVER
// fetch here so we can wrap it in suspense
export default async function ProvincePageVisual({
  country,
  province,
  searchParams,
}) {
  const gedDataProvince = await getAllProvincesInSelectedCountry(country);
  const province_id = await getProvinceId(gedDataProvince, province);
  // console.log("province_id", province_id);
  const provinceData = await getAllDistrictsInSelectedProvinceById(
    country,
    province_id
  );
  // console.log("[ProvincePageVisualParent] loaded in: data :", provinceData);

  return (
    <div className="w-full h-full bg-white">
      {/* this is the client parent that will handle the state */}
      <ProvincePageVisualParent provinceData={provinceData} />
    </div>
  );
}
