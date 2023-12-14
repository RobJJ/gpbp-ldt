"use client";

import { MapContainer, Rectangle, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useSWR from "swr";
import { scatterViewType } from "@/lib/atoms";
import { useAtom } from "jotai";
import MapGeoJsonComponentProvince from "./MapGeoJsonComponentProvince";
import MapGeoJsonComponentDistrict from "./MapGeoJsonComponentDistrict";
import Image from "next/image";
import Spinner from "../../../public/Spinner-normal-size.svg";

// SWR
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// Settings for Map and Rectangle :: TODO -> Move to Lib .. keeping here for now for readability
const countryMapSettings = {
  austria: {
    zoom: 6.6,
    minZoom: 6.3,
    maxZoom: 8.4,
    defaultPos: [47.49, 13.8],
    innerBounds: [
      [54.650751, 24.974716],
      [40.585355, 1.638438],
    ],
  },
  montenegro: {
    zoom: 6.2,
    minZoom: 7,
    maxZoom: 9,
    defaultPos: [42.8, 19.2],
    innerBounds: [
      [46.352086, 14.334987],
      [38.669159, 25.015009],
    ],
  },
  albania: {
    zoom: 6.2,
    minZoom: 7,
    maxZoom: 9,
    defaultPos: [41.3, 20.02],
    innerBounds: [
      [44.4, 14.9],
      [37.2, 25.4],
    ],
  },
  kosovo: {
    zoom: 8.6,
    minZoom: 7.8,
    maxZoom: 9,
    defaultPos: [42.5, 20.6456],
    innerBounds: [
      [37.5, 13.5],
      [47.5, 31.5],
    ],
  },
  serbia: {
    zoom: 7,
    minZoom: 6.2,
    maxZoom: 8.4,
    defaultPos: [44.3, 20.5],
    innerBounds: [
      [36.5, 5.5],
      [50.5, 37.5],
    ],
  },
  uzbekistan: {
    zoom: 5.5,
    minZoom: 5,
    maxZoom: 7,
    defaultPos: [41.377491, 64.585262],
    innerBounds: [
      [27.5, 39.5],
      [52.5, 92.5],
    ],
  },
};

export default function MapComponentParentAlpha({
  country,
  gedDataProvince,
  gedDataDistrict,
  mapbox_url,
}) {
  // Call from cached data
  const { data, error, isLoading } = useSWR(
    `/api/geo?country=${country}`,
    fetcher
  );

  const [scatterType] = useAtom(scatterViewType);

  // Gaurd clauses
  if (isLoading)
    return (
      <div className="bg-slate-100 flex justify-center items-center w-full h-full">
        <Image priority src={Spinner} alt="loading spinner" />
      </div>
    );
  if (error)
    return (
      <div className="bg-slate-100 flex justify-center items-center w-full h-full">
        There was a problem loading GeoData
      </div>
    );

  return (
    <section className="w-full h-full flex flex-col text-lg">
      <MapContainer
        attributionControl={false}
        center={countryMapSettings[country].defaultPos}
        zoom={countryMapSettings[country].zoom}
        minZoom={countryMapSettings[country].minZoom}
        maxZoom={countryMapSettings[country].maxZoom}
        maxBounds={countryMapSettings[country].innerBounds}
        zoomControl={false}
        doubleClickZoom={false}
        wheelPxPerZoomLevel={30}
        zoomSnap={0.5}
        // zoomDelta={0.5}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <ZoomControl position={"bottomleft"} />
        <TileLayer url={mapbox_url} />
        <Rectangle
          bounds={countryMapSettings[country].innerBounds}
          pathOptions={{ fill: false, color: "red", dashArray: "3" }}
        />
        {/* Map - Province */}
        {scatterType === "provinces" && (
          <MapGeoJsonComponentProvince
            provinceGeoData={data.provinceGeoData}
            districtGeoData={data.districtGeoData}
            gedDataProvince={gedDataProvince}
            gedDataDistrict={gedDataDistrict}
          />
        )}
        {/* Map - District */}
        {scatterType === "districts" && (
          <MapGeoJsonComponentDistrict
            provinceGeoData={data.provinceGeoData}
            districtGeoData={data.districtGeoData}
            gedDataProvince={gedDataProvince}
            gedDataDistrict={gedDataDistrict}
          />
        )}
      </MapContainer>
    </section>
  );
}
