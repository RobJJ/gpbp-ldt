import { getDistrictInsights } from "@/lib/district-insights";

// Fetch Insights data for that country
export default function DistrictPageInsightsComponent({ country, district }) {
  const insights = getDistrictInsights(country);
  console.log("Insights ::", insights);
  return <div>DistrictPageInsightsComponent</div>;
}
