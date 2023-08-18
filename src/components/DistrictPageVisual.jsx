import { getSelectedDistrictData } from "@/lib/districtdata";
import DistrictPageVisualParent from "./DistrictPageVisualParent";

// Fetch district data at this level
export default async function DistrictPageVisual({ country, district }) {
  const districtData = await getSelectedDistrictData(
    country,
    decodeURIComponent(district)
  );
  console.log("[DistrictVisual] : data :", districtData);
  return (
    <div className="w-full h-full bg-white flex overflow-auto">
      {/* this is the client parent that will handle the state */}
      <DistrictPageVisualParent districtData={districtData} />
    </div>
  );
}
