import Link from "next/link";

const interpolateColor = (score) => {
  // change value of red and all occureneces to a higher color for brighter and lower for darker
  let red = 220,
    green = 0,
    blue = 0;

  if (score <= 50) {
    red = 220;
    green = Math.floor(220 * (score / 50));
  } else {
    red = Math.floor(220 * ((100 - score) / 50));
    green = 220;
  }

  return `rgb(${red}, ${green}, ${blue})`;
};

export default function TableRow({
  number,
  regionName,
  econ,
  envr,
  country,
  province,
  searchParams,
}) {
  return (
    <div className="w-full flex text-center h-8">
      <span className="bg-purple-100 w-1/12 h-full border-x-2 border-black p-2">
        {number}
      </span>
      <Link
        href={{
          pathname: !province
            ? `/dashboard/${country}/${regionName}`
            : `/dashboard/${country}/${province}/${regionName}`,
          // can spread the searchParams!!!! *******
          query: { ...searchParams },
        }}
        className="bg-purple-200 w-5/12 h-full border-r-2 border-black p-2 font-bold hover:text-blue-300"
      >
        {regionName}
      </Link>
      <span className=" w-3/12 h-full p-2 border-r-2 border-black flex items-center bg-white">
        <div className="relative w-full h-3/4 flex items-center bg-slate-300">
          <div
            className="h-full w-full"
            style={{
              backgroundColor: interpolateColor(envr),
              width: `${envr}%`,
              // might be better to remove this easing effect as the color change is not leka
              transition: "width 0.5s ease-in-out",
            }}
          />
          <div className="absolute w-full h-full flex">
            {[...Array(10)].map((_prop, idx) => {
              return (
                <div
                  key={idx}
                  className={`w-[10%] h-full border-r border-white`}
                />
              );
            })}
          </div>
        </div>
      </span>
      {/* new way.. you have to create 10 blocks per province or district.. conciderably more divs but does it effect server side performance? */}
      <span className=" w-3/12 h-full border-r-2 p-2 border-black flex items-center bg-white">
        <div className="relative w-full h-3/4 flex items-center bg-slate-300">
          <div
            className="h-full w-full"
            style={{
              backgroundColor: interpolateColor(econ),
              width: `${econ}%`,
              // might be better to remove this easing effect as the color change is not leka
              transition: "width 0.5s ease-in-out",
            }}
          />
          <div className="absolute w-full h-full flex">
            {[...Array(10)].map((_prop, idx) => {
              return (
                <div
                  key={idx}
                  className={`w-[10%] h-full border-r border-white`}
                />
              );
            })}
          </div>
        </div>
      </span>
    </div>
  );
}
