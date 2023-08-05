import { cache } from "react";
import clientPromise from "./mongodb";

// what we need to remember here is if the properties in DB are strings or numbers and how they are being passed around.

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

// USED
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

//
// export const getSelectedProvinceData = cache(async (country, province_id) => {
//   const client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB_NAME);
//   const provinceData = await db
//     .collection(`${country}-province-data`)
//     .find({ PROVINCE_ID: province_id }, { projection: { _id: 0 } })
//     .toArray();
//   // return JSON.parse(JSON.stringify(allDistricts));
//   return provinceData;
// });
//
export const getSelectedProvinceData = cache(async (country, province_name) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);

  // Find province_id by province_name
  const province = await db
    .collection(`${country}-province-data`)
    .findOne(
      { PROVINCE: province_name },
      { projection: { _id: 0, PROVINCE_ID: 1 } }
    );

  if (!province) {
    throw new Error("Province not found");
  }

  const province_id = province.PROVINCE_ID;

  // Now you can fetch province data by province_id
  const provinceData = await db
    .collection(`${country}-province-data`)
    .find({ PROVINCE_ID: province_id }, { projection: { _id: 0 } })
    .toArray();

  return provinceData;
});
