import { getSelectedDistrictData } from "@/lib/districtdata";

// Fetch district data at this level
export default async function DistrictPageVisual({
  country,
  province,
  district,
}) {
  const districtData = await getSelectedDistrictData(country, district);
  console.log("[DistrictVisual] : data :", districtData);
  return <div className="w-full h-full bg-pink-200">DistrictPageVisual</div>;
}
