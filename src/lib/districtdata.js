// NEXT JS INFO :: https://nextjs.org/docs/app/building-your-application/data-fetching/caching#react-cache

import { cache } from "react";
import clientPromise from "./mongodb";

export const getDistricts = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const allDistricts = await db
    .collection(`${country}-district-data`)
    .find({})
    .toArray();
  return allDistricts;
});

// use province id to find all districts that belong
export const getAllDistrictsInSelectedProvinceById = cache(
  async (country, province) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME);
    const allDistricts = await db
      .collection(`${country}-province-data`)
      .find({
        PROVINCE: province,
      })
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

export const getAllDistrictsInSelectedProvinceByYear = cache(
  async (country, province_id, year) => {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME);
    const allDistricts = await db
      .collection(`${country}-district-data`)
      .find(
        { YEAR: year, PROVINCE_ID: province_id },
        { projection: { _id: 0 } }
      )
      .toArray();
    return allDistricts;
  }
);

/////////////////////////////////////// OLD BELOW
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **being used** old approach without react caching
// returns everything from that country @ ${country}-district-data
//
// async function getDistricts(country) {
//   const client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB_NAME);
//   const allDistricts = await db
//     .collection(`${country}-district-data`)
//     .find({})
//     .toArray();
//   return allDistricts;
// }
//
// //
// async function getProvinces(country) {
//   const client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB_NAME);
//   const allDistricts = await db
//     .collection(`${country}-province-data`)
//     .find({})
//     .toArray();
//   return allDistricts;
// }

// ** note **
// [country] from params,, [layer] from searchParams
// options: province, district ()
// async function getAllDataBy(country, layer) {
//   const client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB_NAME);
//   const data = await db
//     .collection(`${country}-${layer}-data`)
//     .find({})
//     .toArray();
//   return data;
// }

// async function getDataByYear(year) {
//   const client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB_NAME);
//   const allDistricts = await db
//     .collection("districts")
//     .find({ YEAR: `${year}` })
//     .toArray();
//   return allDistricts;
// }

// this fetch will take any params and fetch...
// this would be a good time to use typescript, to avoid strange input vars
// async function getDataBy(obj) {
//   const client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB_NAME);
//   const allDistricts = await db
//     .collection("districts")
//     .find({ ...obj })
//     .toArray();
//   return allDistricts;
// }

// **being used**
// returns an array of objects containing province name and province_id
// eg. [{ PROVINCE: 'Navoiy', PROVINCE_ID: 'UZB.9_1' }, ... etc]
// async function getUniqueProvinces(country) {
//   const client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB_NAME);
//   const uniqueProvinces = await db
//     .collection(`${country}-district-data`)
//     .aggregate([
//       {
//         $group: {
//           _id: "$PROVINCE_ID",
//           PROVINCE: { $first: "$PROVINCE" },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           PROVINCE_ID: "$_id",
//           PROVINCE: 1,
//         },
//       },
//     ])
//     .toArray();
//   return uniqueProvinces;
// }

// returns an array of unique years from data
// async function getUniqueYears() {
//   const client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB_NAME);
//   const uniqueYears = await db.collection("districts").distinct("YEAR", {});
//   return uniqueYears;
// }

// module.exports = {
//   getAllDistrictsInSelectedProvinceById,
// };
