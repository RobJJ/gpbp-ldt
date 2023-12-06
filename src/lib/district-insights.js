import { cache } from "react";
import clientPromise from "./mongodb";

// USED
//
export const getDistrictInsights = cache(async (country, district) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const allInsights = await db
    .collection(`${country}-district-insight`)
    .find({ DISTRICT_NAME: district }, { projection: { _id: 0 } })
    .toArray();

  if (!allInsights) {
    throw new Error("No insights found for the district selected");
  }
  return allInsights;
});
