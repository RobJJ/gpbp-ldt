import { cache } from "react";
import clientPromise from "./mongodb";

// USED
// USED AT DISTRICT PAGE to grab the insights about the district selected
// This function would work better if we had and used the ID. Changing insights data to include name which we will use to match from
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
