import { cache } from "react";
import clientPromise from "./mongodb";

// USED
// used at country page to grab info about the country for its cards
export const getCountryInfo = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const info = await db
    .collection(`${country}-country-info`)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  // return JSON.parse(JSON.stringify(allDistricts));
  return info;
});
