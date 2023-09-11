"use client";

import { MapContainer, Rectangle, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useSWR from "swr";
import { scatterViewType } from "@/lib/atoms";
import { useAtom } from "jotai";
import MapGeoJsonComponentProvince from "./MapGeoJsonComponentProvince";
import MapGeoJsonComponentDistrict from "./MapGeoJsonComponentDistrict";
import MapColorLegend from "./MapColorLegend";
import Image from "next/image";
import Spinner from "../../public/Spinner-normal-size.svg";

// SWR
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// Settings for Map and Rectangle
const countryMapSettings = {
  kosovo: {
    zoom: 8.6,
    minZoom: 7,
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
    zoom: 5.4,
    minZoom: 4.5,
    maxZoom: 7,
    defaultPos: [41.377491, 64.585262],
    innerBounds: [
      [27.5, 39.5],
      [52.5, 92.5],
    ],
  },
};

// const redColor = { fill: false, color: "red", dashArray: "3" };
// top right [43.429566, 23.857964],,, bottom left [41.890765, 19.426956]

export default function MapComponentParentAlpha({
  country,
  // provinceGeoData,
  // districtGeoData,
  gedDataProvince,
  gedDataDistrict,
  mapbox_url,
}) {
  // lets try call the cached data here first :: this should always be cached from initial call
  const { data, error, isLoading } = useSWR(
    `/api/geo?country=${country}`,
    fetcher
  );

  const [scatterType] = useAtom(scatterViewType);

  // this should never happen -- we need to make sure that if user clicks HOME that we reset the scatterViewType... but for now, guard against it
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
        // create a custom zoom value for each country.
        zoom={countryMapSettings[country].zoom}
        // zoomed out max
        minZoom={countryMapSettings[country].minZoom}
        // zoomed in max
        maxZoom={countryMapSettings[country].maxZoom}
        maxBounds={countryMapSettings[country].innerBounds}
        zoomControl={false}
        doubleClickZoom={false}
        wheelPxPerZoomLevel={30}
        zoomSnap={0.5}
        // zoomDelta={0.5}
        // min and max zooms to control API

        scrollWheelZoom={true}
        className="h-full w-full"
        // ref={nodeRef}
        // adding hashkey here rerenders another entire map. ie resets pos etc
        // key={hashkey}
      >
        <ZoomControl position={"bottomleft"} />
        <TileLayer url={mapbox_url} />
        <Rectangle
          bounds={countryMapSettings[country].innerBounds}
          pathOptions={{ fill: false, color: "red", dashArray: "3" }}
        />
        {/* Handle change of scatterType here */}
        {scatterType === "provinces" && (
          <MapGeoJsonComponentProvince
            provinceGeoData={data.provinceGeoData}
            districtGeoData={data.districtGeoData}
            // provinceGeoData={provinceGeoData}
            // districtGeoData={districtGeoData}
            gedDataProvince={gedDataProvince}
            gedDataDistrict={gedDataDistrict}
          />
        )}
        {scatterType === "districts" && (
          <MapGeoJsonComponentDistrict
            provinceGeoData={data.provinceGeoData}
            districtGeoData={data.districtGeoData}
            // provinceGeoData={provinceGeoData}
            // districtGeoData={districtGeoData}
            gedDataProvince={gedDataProvince}
            gedDataDistrict={gedDataDistrict}
          />
        )}
        <MapColorLegend />
      </MapContainer>
    </section>
  );
}

// this component needs geo data and also GED data... the GED data starts off as province data, but when we click a province, we will fetch the geo districts inside that province and show it,, but we also need those districts information
