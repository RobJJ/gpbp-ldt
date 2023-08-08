import { cache } from "react";
import clientPromise from "./mongodb";

// what we need to remember here is if the properties in DB are strings or numbers and how they are being passed around.

export const getProvinceGeojson = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const data = await db
    .collection(`${country}-province-geojson`)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  // return JSON.parse(JSON.stringify(data));
  return data;
});

// lets first get all the districtGeoData and cache it... this will simplify things and speed things up for future clicks
export const getDistrictGeojson = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const data = await db
    .collection(`${country}-district-geojson`)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  // return JSON.parse(JSON.stringify(data));
  return data;
});

// ** this call with handle both GEOJSON fetches and run async then return an array of them
export const getAllGeojsonData = cache(async (country) => {
  const fetchProvinceGeojson = getProvinceGeojson(country);
  const fetchDistrictGeojson = getDistrictGeojson(country);

  const [provinceGeoData, districtGeoData] = await Promise.all([
    fetchProvinceGeojson,
    fetchDistrictGeojson,
  ]);

  return {
    provinceGeoData,
    districtGeoData,
  };
});

// lets rather fetch all districts geo data at the start of application load... we should try cache it on server though
export const getDistrictsGeoDataBasedOnSelectedProvinceId = cache(
  async (country, province_id) => {
    const allDistrictsGeoData = await getDistrictGeojson(country);
    return allDistrictsGeoData.features.filter((feature) => {
      return feature.properties.GID_1 === province_id;
    });

    // const client = await clientPromise;
    // const db = client.db(process.env.MONGO_DB_NAME);
    // const data = await db
    //   .collection(`${country}-district-geojson`)
    //   .find()
    //   .toArray();
    // return JSON.parse(JSON.stringify(data));
  }
);

// let collectionOfDistrictsInClickedProvince =
//   geoDistrictData.data.features.filter((feature) => {
//     return feature.properties.NAME_1 === e.target.feature.properties.NAME_1;
//   });
