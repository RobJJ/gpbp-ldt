import { cache } from "react";
import clientPromise from "./mongodb";

// what we need to remember here is if the properties in DB are strings or numbers and how they are being passed around.

export const getProvinceGeojson = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const data = await db
    .collection(`${country}-province-geojson`)
    .find()
    .toArray();
  return JSON.parse(JSON.stringify(data));
});
