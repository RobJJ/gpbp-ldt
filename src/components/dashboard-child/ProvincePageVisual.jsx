import { getSelectedProvinceData } from "@/lib/provinceData";

import ProvincePageVisualParent from "./ProvincePageVisualParent";

export default async function ProvincePageVisual({ country, province }) {
  const provinceData = await getSelectedProvinceData(
    country,
    decodeURIComponent(province)
  );

  return (
    <div className="w-full h-full bg-white flex overflow-auto">
      <ProvincePageVisualParent provinceData={provinceData} />
    </div>
  );
}
