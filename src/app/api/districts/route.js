// import clientPromise from "@/lib/mongodb";
// import { NextResponse } from "next/server";

// // lets try get all districts at the api/route
// export async function GET(request) {
//   // console.log("[ENDPOINT HIT] : ", request.url);
//   //
//   const client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB_NAME);
//   const data = await db
//     .collection(`kosovo-province-data`)
//     .find({}, { projection: { _id: 0 } })
//     .toArray();
//   // allDistricts in an array of objects
//   return NextResponse.json(data);
// }

// export const getDistricts = cache(async (country) => {
//   const client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB_NAME);
//   const allDistricts = await db
//     .collection(`${country}-district-data`)
//     .find({})
//     .toArray();
//   return allDistricts;
// });
