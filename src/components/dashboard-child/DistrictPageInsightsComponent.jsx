import { getDistrictInsights } from "@/lib/district-insights";
import DistrictPageInsightsParent from "./DistrictPageInsightsParent";

export default async function DistrictPageInsightsComponent({
  country,
  district,
}) {
  const insights = await getDistrictInsights(
    country,
    decodeURIComponent(district)
  );

  return (
    <div className="w-full h-full bg-white flex ">
      <DistrictPageInsightsParent
        insightsData={insights[0]}
        district={decodeURIComponent(district)}
      />
    </div>
  );
}
