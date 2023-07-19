// ** note ** this is a dynamic server comp. Can fetch params and data here

import Link from "next/link";

// ok we have access to the params and searchParams because this is page.js and dynamic
export default function ProvincePage({ params, searchParams }) {
  // fetch data here for the chosen Province!!
  // console.log("[ProvincePage] : rendered : params : ", params);
  // console.log("[ProvincePage] : rendered : searchParams : ", searchParams);
  return (
    <div className="w-full h-full bg-orange-200 flex flex-col p-2 gap-2">
      <span className="bg-orange-100 rounded">
        This will be the top card component for the province.... it will show
        the highcharts here This component needs to fetch data based on the
        country-province combination... the searchParams dont matter
      </span>
      <span className="bg-orange-100 rounded">
        This will be the bottom List component still,, but it will list the
        districts in the province... this component needs the country-province
        data...it does needs the YEAR info from searchParams,,,
      </span>
      <Link
        href={{
          pathname: `/dashboard/${params.country}/${params.province}/testDistrictBitch`,
          // can spread the searchParams!!!! *******
          query: { ...searchParams },
        }}
        className="bg-blue-200"
      >
        You can navigate to a district from here
      </Link>
    </div>
  );
}
