// import { useQuery } from "react-query";
// import { getProvinceId } from "../utils";
// import { cache } from "react";

// if this hook is fired with a provinceSelected based on params.. it will fetch the ged districts that are connected to that province!

// THIS HOOK HAS BEEN REMOVED
// Will keep this for learning purposes for future builds with react query
// If you want to use this, make sure to install react-query. It has been removed from the APP

// export const useGedData = (
//   countrySelected,
//   provinceSelected,
//   gedDataProvince
// ) => {
//   const { data, isLoading } = useQuery({
//     queryKey: ["ged-data", countrySelected, provinceSelected],
//     queryFn: cache(async ({ queryKey }) => {
//       const [_key, countrySelected, provinceSelected] = queryKey;
//       const provinceId = getProvinceId(gedDataProvince, provinceSelected);

//       let res;
//       // maybe true conditional here instead of on server
//       if (provinceSelected) {
//         res = await fetch(
//           `/api/provinces?country=${countrySelected}&province=${provinceSelected}&province_id=${provinceId}`
//         );
//       } else {
//         res = await fetch(`/api/country?country=${countrySelected}`);
//       }

//       return await res.json();
//     }),
//   });
//   return {
//     data,
//     isLoading,
//   };
// };
