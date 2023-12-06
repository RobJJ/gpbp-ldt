import { getSelectedDistrictData } from "@/lib/districtdata";
import DistrictPageVisualParent from "./DistrictPageVisualParent";

export default async function DistrictPageVisual({ country, district }) {
  const districtData = await getSelectedDistrictData(
    country,
    decodeURIComponent(district)
  );

  return (
    <div className="w-full h-full bg-white flex overflow-auto">
      <DistrictPageVisualParent districtData={districtData} />
    </div>
  );
}
