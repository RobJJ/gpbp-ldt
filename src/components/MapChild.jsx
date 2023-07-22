// import { getProvinceGeojson } from "@/lib/geojsonData";

export default async function MapChild({ country, year }) {
  //   const data = await getProvinceGeojson(country);

  return (
    <div>
      I am the map child and I am the server component,, I will fetch data??
      {country}
      {year}
      <br />
      {data[0]}
    </div>
  );
}
