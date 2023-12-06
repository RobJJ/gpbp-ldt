import { cache } from "react";
import clientPromise from "./mongodb";

// USED
export const getProvinceGeojson = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const data = await db
    .collection(`${country}-province-geojson`)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  return data;
});

// USED
export const getDistrictGeojson = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const data = await db
    .collection(`${country}-district-geojson`)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  return data;
});

