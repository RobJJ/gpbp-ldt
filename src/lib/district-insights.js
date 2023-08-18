export const getDistrictInsights = cache(async (country) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB_NAME);
  const allInsights = await db
    .collection(`${country}-district-insight`)
    .find({}, { projection: { _id: 0 } })
    .toArray();
  return allInsights;
});
