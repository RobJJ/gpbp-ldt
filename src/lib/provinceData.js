import { cache } from "react";
import clientPromise from "./mongodb";

// what we need to remember here is if the properties in DB are strings or numbers and how they are being passed around.

export const getAllProvincesInSelectedCountryByYear = cache(
  async (country, year) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME);
    const allDistricts = await db
      .collection(`${country}-province-data`)
      .find({ YEAR: Number(year) })
      .toArray();
    return allDistricts;
  }
);

export const getAllProvincesInSelectedCountry = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const allDistricts = await db
    .collection(`${country}-province-data`)
    .find({})
    .toArray();
  return JSON.parse(JSON.stringify(allDistricts));
});
