"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ** this is the actual map component
// ** setdefault state to province,, and then hold state here...
// ** if params changes, this component will be rerendered by its parent and it will receive new params to search by
// GEO
// ** if (provinceSelected) becomes true is true, then it needs to grab geodata districts that match province_id
// GED
// ** this data changes based on year, and score_one..
const defaultPosition = [44.3, 20.5];

export default function MapComponentParent({
  provinceGeoData,
  districtGeoData,
  gedDataProvince,
  mapbox_url,
}) {
  // const [currentGeoLayers, setCurrentGeoLayers] = useState(geojsonDataProvince);
  // const router = useRouter();

  return (
    <section className="w-full h-full bg-yellow-300 flex flex-col text-lg gap-2">
      <MapContainer
        center={defaultPosition}
        zoom={7}
        scrollWheelZoom={true}
        className="h-full w-full"
        // ref={nodeRef}
        // key={hashKey}
      >
        <TileLayer url={mapbox_url} />
      </MapContainer>
    </section>
  );
}

// this component needs geo data and also GED data... the GED data starts off as province data, but when we click a province, we will fetch the geo districts inside that province and show it,, but we also need those districts information
