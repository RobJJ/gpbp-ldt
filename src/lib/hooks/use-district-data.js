// import { useQuery } from "react-query";
// import clientPromise from "../mongodb";

// THIS HOOK HAS BEEN REMOVED
// Will keep this for learning purposes for future builds with react query
// If you want to use this, make sure to install react-query. It has been removed from the APP

// export const useDistricts = (country) => {
//   const { data, isLoading } = useQuery({
//     queryFn: async () => {
//       // fetch data based on country and province
//       const client = await clientPromise;
//       const db = client.db(process.env.MONGO_DB_NAME);
//       const allDistricts = await db
//         .collection(`${country}-district-data`)
//         .find({})
//         .toArray();
//       return allDistricts;
//     },
//   });
//   return { data, isLoading };
// };
