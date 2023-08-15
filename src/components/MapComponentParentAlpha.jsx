"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { scatterViewType } from "@/lib/atoms";
import { useAtom } from "jotai";
import MapGeoJsonComponentProvince from "./MapGeoJsonComponentProvince";
import MapGeoJsonComponentDistrict from "./MapGeoJsonComponentDistrict";

// ** this is the actual map component
// ** setdefault state to province,, and then hold state here...
// ** if params changes, this component will be rerendered by its parent and it will receive new params to search by
// GEO
// ** if (provinceSelected) becomes true is true, then it needs to grab geodata districts that match province_id
// GED
// ** this data changes based on year, and score_one..
// this property must be pulled in based on the {country} selected
// names must match the country name passed in from landing page or url
const defaultPositions = {
  kosovo: [42.5, 20.6456],
  serbia: [44.3, 20.5],
  uzbekistan: [41.377491, 64.585262],
};

const countryZoomSetting = {
  kosovo: 8,
  uzbekistan: 5,
  serbia: 7,
};

export default function MapComponentParentAlpha({
  country,
  provinceGeoData,
  districtGeoData,
  gedDataProvince,
  gedDataDistrict,
  mapbox_url,
}) {
  const [scatterType] = useAtom(scatterViewType);

  return (
    <section className="w-full h-full bg-yellow-300 flex flex-col text-lg gap-2 ">
      <MapContainer
        attributionControl={false}
        center={defaultPositions[country]}
        // create a custom zoom value for each country.
        zoom={countryZoomSetting[country]}
        scrollWheelZoom={true}
        className="h-full w-full"
        // ref={nodeRef}
        // adding hashkey here rerenders another entire map. ie resets pos etc
        // key={hashkey}
      >
        <TileLayer url={mapbox_url} />
        {/* Handle change of scatterType here */}
        {scatterType === "provinces" && (
          <MapGeoJsonComponentProvince
            provinceGeoData={provinceGeoData}
            districtGeoData={districtGeoData}
            gedDataProvince={gedDataProvince}
            gedDataDistrict={gedDataDistrict}
          />
        )}
        {scatterType === "districts" && (
          <MapGeoJsonComponentDistrict
            provinceGeoData={provinceGeoData}
            districtGeoData={districtGeoData}
            gedDataProvince={gedDataProvince}
            gedDataDistrict={gedDataDistrict}
          />
        )}
      </MapContainer>
    </section>
  );
}

// this component needs geo data and also GED data... the GED data starts off as province data, but when we click a province, we will fetch the geo districts inside that province and show it,, but we also need those districts information
