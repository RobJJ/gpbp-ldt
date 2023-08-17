import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// lets try get all districts at the api/route

// lets try grab all geo first
// then lets try grab only geodata that has a province_id of whats being passed in
export async function GET(request, { params }) {
  console.log("[GEO-ENDPOINT] : hit ");
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const data = await db
    .collection(`kosovo-district-geojson`)
    .find({}, { _id: 0 })
    .toArray();
  // allDistricts in an array of objects
  return NextResponse.json(data);
}
