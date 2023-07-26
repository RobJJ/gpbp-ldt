import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// lets try get all districts at the api/route
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");

  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);

  console.log("[ENDPOINT HIT] : Grabbing info about provinces");
  // get all data from province level for the country selected
  const data = await db
    .collection(`${country}-province-data`)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  //   // allDistricts in an array of objects
  return NextResponse.json(data);
}
