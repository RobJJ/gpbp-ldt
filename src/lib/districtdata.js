import { cache } from "react";
import clientPromise from "./mongodb";

// USED
export const getDistricts = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const allDistricts = await db
    .collection(`${country}-district-data`)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  return allDistricts;
});

// USED
// Used at province page to get district information for province List component
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

// USED
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
    throw new Error("Distict not found or an issue with the district name");
  }

  return districts;
});
