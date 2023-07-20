// would like to know what type of server component this is because its still has to know what the param is right?
// so it cant be just rendered and stored on server.. lets build and see
import {
  getDistricts,
  getUniqueProvinces,
  getAllDataBy,
} from "../../../lib/districtdata";
import ServerCompFacts from "./servercompfacts";
import ServerCompList from "./servercomplist";
import ClientCompMap from "../../../components/clientcompvisual";

const pretendData = {
  country: "bro youre reading the country data!",
  province: "bro youre reading the province data!",
  district: "brooo youre reading the district data!",
};

// marked as async server component
export default async function OldCountryPage({ params, searchParams }) {
  console.log(
    "[CountryPage] : testing if reloads on searchParams change",
    searchParams
  );
  // console.log("type of unknown searchParam:", typeof searchParams.layer);
  // **note** fetch data based off this param,, can be accessed at any server component that is dynamic or a child
  // const data = await getDistricts(params.country);  :: this works
  // const data = await getUniqueProvinces(params.country);
  // const data = await getAllDataBy(params.country, searchParams.layer);
  // console.log(data);
  // const getMyData = pretendData[searchParams.];

  return (
    <div className="w-full h-full bg-pink-200 flex justify-center items-center">
      <section className="w-5/6 h-5/6 flex flex-col items-center bg-white rounded-lg p-2">
        <h2 className="font-bold text-2xl">{params.country}</h2>
        {/* experiment - main display component */}
        <div className="w-full h-full bg-pink-100 rounded p-2 flex gap-1">
          <section className="w-1/2 h-full bg-white p-2">
            <ClientCompMap chosenCountry={params.country} />
          </section>
          <section className="w-1/2 h-full bg-white">
            <ServerCompFacts searchParams={searchParams} />
            <ServerCompList searchParams={searchParams} />
          </section>
        </div>
      </section>
    </div>
  );
}

// this page knows what country has been selected.. most top level, can

{
  /*{data.map((uniqueProvince) => {
          return (
            <div key={uniqueProvince.PROVINCE_ID} className="flex">
              {uniqueProvince.PROVINCE}
              {uniqueProvince.PROVINCE_ID}
            </div>
          );
        })}*/
}
