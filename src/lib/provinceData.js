import { cache } from "react";
import clientPromise from "./mongodb";

// USED
export const getAllProvincesInSelectedCountryByYear = cache(
  async (country, year) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME);
    const allProvinces = await db
      .collection(`${country}-province-data`)
      .find({ YEAR: Number(year) }, { projection: { _id: 0 } })
      .toArray();
    return allProvinces;
  }
);

// ??
export const getAllProvincesInSelectedCountry = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const allProvinces = await db
    .collection(`${country}-province-data`)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  // return JSON.parse(JSON.stringify(allDistricts));
  return allProvinces;
});

// USED
// USED FOR PROVINCE PAGE - PROVINCE DATA
export const getSelectedProvinceData = cache(async (country, province_name) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);

  const provinceData = await db
    .collection(`${country}-province-data`)
    .find({ PROVINCE: province_name }, { projection: { _id: 0 } })
    .toArray();

  if (!provinceData) {
    throw new Error("Province not found or theres an issue with province name");
  }

  return provinceData;
});
