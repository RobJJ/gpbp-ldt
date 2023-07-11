// posts.js

import clientPromise from "./mongodb";

// **being used**
// returns everything from that country @ ${country}-district-data
async function getDistricts(country) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const allDistricts = await db
    .collection(`${country}-district-data`)
    .find({})
    .toArray();
  return allDistricts;
}

async function getDataByYear(year) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const allDistricts = await db
    .collection("districts")
    .find({ YEAR: `${year}` })
    .toArray();
  return allDistricts;
}

// this fetch will take any params and fetch...
// this would be a good time to use typescript, to avoid strange input vars
async function getDataBy(obj) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const allDistricts = await db
    .collection("districts")
    .find({ ...obj })
    .toArray();
  return allDistricts;
}

// **being used**
// returns an array of objects containing province name and province_id
// eg. [{ PROVINCE: 'Navoiy', PROVINCE_ID: 'UZB.9_1' }, ... etc]
async function getUniqueProvinces(country) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const uniqueProvinces = await db
    .collection(`${country}-district-data`)
    .aggregate([
      {
        $group: {
          _id: "$PROVINCE_ID",
          PROVINCE: { $first: "$PROVINCE" },
        },
      },
      {
        $project: {
          _id: 0,
          PROVINCE_ID: "$_id",
          PROVINCE: 1,
        },
      },
    ])
    .toArray();
  return uniqueProvinces;
}

// returns an array of unique years from data
async function getUniqueYears() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const uniqueYears = await db.collection("districts").distinct("YEAR", {});
  return uniqueYears;
}

module.exports = {
  getDistricts,
  getDataByYear,
  getDataBy,
  getUniqueProvinces,
  getUniqueYears,
};
