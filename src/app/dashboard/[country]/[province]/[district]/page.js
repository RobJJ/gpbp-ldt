// ** dynamic

export default function DistrictPage({ params, searchParams }) {
  // fetch data here for the chosen district!!
  return (
    <div className="bg-blue-200 w-full h-full flex flex-col gap-2 p-2">
      <span className="bg-blue-100 w-full h-1/2 text-2xl font-bold">
        [DISTRICT LEVEL] : SHOW highcharts HERE <br />
        ** fetch data in this{" "}
        <span className="text-red-500">async server component</span> based on
        district selected - feed data to the highcharts component **
      </span>
      <span className="bg-blue-100 w-full h-1/2 text-2xl font-bold">
        [DISTRICT LEVEL] : SHOW insights HERE <br />
        ** fetch data in this{" "}
        <span className="text-red-500">async server component</span> based on
        district selected - feed data to the highcharts component **
      </span>
    </div>
  );
}
