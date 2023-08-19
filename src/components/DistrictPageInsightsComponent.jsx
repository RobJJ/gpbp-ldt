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
  // console.log("insights?", insights);

  return (
    <div className="w-full h-full bg-white flex ">
      {/* this is the client parent that will handle the state */}
      <DistrictPageInsightsParent
        insightsData={insights[0]}
        district={district}
      />
    </div>
  );
}
