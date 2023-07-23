import { useQuery } from "react-query";
import clientPromise from "../mongodb";

export const useDistricts = (country) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      // fetch data based on country and province
      const client = await clientPromise;
      const db = client.db(process.env.MONGO_DB_NAME);
      const allDistricts = await db
        .collection(`${country}-district-data`)
        .find({})
        .toArray();
      return allDistricts;
    },
  });
  return { data, isLoading };
};

// export const getDistricts = cache(async (country) => {

// });
