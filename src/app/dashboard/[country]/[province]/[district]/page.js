// ** dynamic

export default function DistrictPage({ params, searchParams }) {
  // fetch data here for the chosen district!!
  return (
    <div className="bg-yellow-200 w-full h-full flex flex-col gap-2">
      <span className="bg-yellow-100">
        This is the top card component and will show the district level
        highcharts data... you dont need year here but need all the data for the
        district!
      </span>
      <span className="bg-yellow-100">
        This is the bottom component that will diplay the data for insights...
        you will need to have fetched data from the insights collection for that
        district!
      </span>
    </div>
  );
}
