import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  //
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country");
  const province = searchParams.get("province");
  console.log("endpoint hit :: country, provionce", country, province);
  //
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);

  const provinceData = await db
    .collection(`${country}-province-data`)
    .find({}, { _id: 0 })
    .toArray();
  //
  // PROVINCE GEO DATA
  //   const provinceGeoData = await db
  //     .collection(`${country}-province-geojson`)
  //     .find({}, { _id: 0 })
  //     .toArray();
  //   const districtGeoData = await db
  //     .collection(`${country}-district-geojson`)
  //     .find({}, { _id: 0 })
  //     .toArray();

  return provinceData;
}
