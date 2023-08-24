// import clientPromise from "@/lib/mongodb";

// import { NextResponse } from "next/server";

// // lets try get all districts at the api/route
// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const country = searchParams.get("country");
//   const province = searchParams.get("province");
//   const province_id = searchParams.get("province_id");

//   // console.log(
//   //   "[ENDPOINT HIT] : grabbing district info about a selected province"
//   // );

//   const client = await clientPromise;
//   const db = client.db(process.env.MONGO_DB_NAME);

//   const data = await db
//     .collection(`${country}-district-data`)
//     .find({ PROVINCE_ID: province_id }, { _id: 0 })
//     .toArray();
//   //   // allDistricts in an array of objects
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
