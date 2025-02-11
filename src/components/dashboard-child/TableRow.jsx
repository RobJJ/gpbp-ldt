import Link from "next/link";

const barColors = [
  { range: 95, color: "#2B8539" },
  { range: 90, color: "#419534" },
  { range: 85, color: "#5AA72D" },
  { range: 80, color: "#73B927" },
  { range: 75, color: "#8DC921" },
  { range: 70, color: "#A1D51D" },
  { range: 65, color: "#B5DE19" },
  { range: 60, color: "#C6E018" },
  { range: 55, color: "#D4D918" },
  { range: 50, color: "#E2D018" },
  { range: 45, color: "#EEC418" },
  { range: 40, color: "#F8B71C" },
  { range: 35, color: "#FDA71F" },
  { range: 30, color: "#FF961F" },
  { range: 25, color: "#FA801D" },
  { range: 20, color: "#F16819" },
  { range: 15, color: "#E54B15" },
  { range: 10, color: "#D72F11" },
  { range: 5, color: "#CA170D" },
  { range: 0, color: "#BF000A" },
];

function getFeatureFillColor(scoreValue) {
  for (let item of barColors) {
    if (scoreValue >= item.range) {
      return item.color;
    }
  }

  return "#000";
}

export default function TableRow({
  regionName,
  econ,
  envr,
  country,
  province,
  searchParams,
}) {
  return (
    <div className="w-full h-8 flex text-center ">
      <Link
        href={{
          pathname: !province
            ? `/dashboard/${country}/${regionName}`
            : `/dashboard/${country}/${province}/${regionName}`,
          query: { ...searchParams },
        }}
        className=" flex items-center w-1/3 h-full border-x border-slate-300 border-b text-sm pl-2 font-normal text-[#4345AA] hover:text-[#5F61B7] "
      >
        <span className="w-full  text-left truncate">{regionName}</span>
      </Link>

      {/* Blocks for unique row :: potential to optimise beyond cache :: ** ECON represents Prosperity */}
      <span className=" w-1/3 h-full border-r p-2 border-b border-slate-300 flex items-center bg-white">
        <div className="relative w-full h-3/4 flex items-center bg-slate-300">
          <div
            className="h-full w-full"
            style={{
              backgroundColor: getFeatureFillColor(econ),
              width: `${econ}%`,
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
      {/* ENVR represents Livability */}
      <span className=" w-1/3 h-full p-2 border-r border-b border-slate-300 flex items-center bg-white">
        <div className="relative w-full h-3/4 flex items-center bg-slate-300">
          <div
            className="h-full w-full"
            style={{
              backgroundColor: getFeatureFillColor(envr),
              width: `${envr}%`,
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
