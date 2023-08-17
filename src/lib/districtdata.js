// NEXT JS INFO :: https://nextjs.org/docs/app/building-your-application/data-fetching/caching#react-cache

import { cache } from "react";
import clientPromise from "./mongodb";

export const getDistricts = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const allDistricts = await db
    .collection(`${country}-district-data`)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  return allDistricts;
});

// use province id to find all districts that belong
export const getAllDistrictsInSelectedProvinceById = cache(
  async (country, province_id) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME);
    const allDistricts = await db
      .collection(`${country}-district-data`)
      .find(
        {
          PROVINCE_ID: province_id,
        },
        { projection: { _id: 0 } }
      )
      .toArray();
    return JSON.parse(JSON.stringify(allDistricts));
  }
);
// JSON.parse(JSON.stringify(allDistricts));
export const getProvinces = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const allDistricts = await db
    .collection(`${country}-province-data`)
    .find({})
    .toArray();
  return allDistricts;
});

// Used at province page to get district information

export const getAllDistrictsInSelectedProvinceByYear = cache(
  async (country, province_name, year) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME);
    const allDistricts = await db
      .collection(`${country}-district-data`)
      .find({ YEAR: year, PROVINCE: province_name }, { projection: { _id: 0 } })
      .toArray();
    return allDistricts;
  }
);

// Used at district page : grab all data about that selected district
export const getSelectedDistrictData = cache(async (country, district_name) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);

  // Find province_id by province_name
  const districts = await db
    .collection(`${country}-district-data`)
    .find({ DISTRICT: district_name }, { projection: { _id: 0 } })
    .toArray();

  if (!districts) {
    throw new Error("Distict not found");
  }

  return districts;
});
