// make this a server component that fetches its data for the selected province

import { getAllDistrictsInSelectedProvinceById } from "@/lib/districtdata";
import {
  getAllProvincesInSelectedCountry,
  getSelectedProvinceData,
} from "@/lib/provinceData";
import { getProvinceId } from "@/lib/utils";
import ProvincePageVisualParent from "./ProvincePageVisualParent";

// ** SERVER COMPONENT TO HANDLE FETCH ON SERVER
// fetch here so we can wrap it in suspense
export default async function ProvincePageVisual({
  country,
  province,
  searchParams,
}) {
  // 1. Fetch data for selected province -> cached on server : for all years
  const provinceData = await getSelectedProvinceData(
    country,
    decodeURIComponent(province)
  );
  // console.log("[ProvincePageVisualParent] loaded in: data :", provinceData);

  return (
    <div className="w-full h-full bg-white flex overflow-auto">
      {/* this is the client parent that will handle the state */}
      <ProvincePageVisualParent provinceData={provinceData} />
    </div>
  );
}
