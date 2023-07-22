"use client";
// ** note :: make this component a server component that receives the needed props and fetches data that is then passed down to the client component to use

import { useParams } from "next/navigation";

// get params and searchparams as props
// 1.
// geodata : default fetch needs [country]-province-geojson ,, then [country]-district-geojson streamed in?
// if the user clicks on a province render the appropriate districts... maybe Promise.all() and see time taken?
// 2.
// gedData : needs province data first and then district data based on what province is clicked.. this is very similar to how the polygons work.. maybe we can join these two functions?

export default function MapComponentParent({
  geoDataProvince,
  gedDataProvince,
}) {
  console.log("[MapComponentParent] : rendered ");
  const params = useParams();
  // this component gets immediate access to the province geodata and geddata through parent props on server
  // this component needs to now listen to the params and take that data and mutate it...
  // if a province is clicked the params will change and trigger reload.. we must then fetch the province-districts data for the geodata and the geddata

  return (
    <section className="w-full h-full bg-yellow-300">
      I have geoData : yes
    </section>
  );
}
