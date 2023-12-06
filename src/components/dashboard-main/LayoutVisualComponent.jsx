import { getAllProvincesInSelectedCountry } from "@/lib/provinceData";
import { getDistricts } from "@/lib/districtdata";
import VisualComponentClientParentV2 from "./VisualComponentClientParent-v2";

export default async function LayoutVisualComponent({ country }) {
  const gedDataProvince = await getAllProvincesInSelectedCountry(country);
  const gedDataDistrict = await getDistricts(country);
  //
  const mapbox_url = process.env.MAPBOX_URL;

  return (
    <div className="w-full h-full flex">
      <VisualComponentClientParentV2
        country={country}
        gedDataDistrict={gedDataDistrict}
        gedDataProvince={gedDataProvince}
        mapbox_url={mapbox_url}
      />
    </div>
  );
}
